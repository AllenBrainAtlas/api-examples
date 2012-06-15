#!/usr/bin/env python

# Copyright 2012 Allen Institute for Brain Science
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
# http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

# This script downloads adult mouse brain coronal gene expression data sets and
# estimates how similar brain structures are according to their expression 
# profile.

import numpy
import json
import sys
import os
import urllib
import string

# Global variables defining the path to the API and IDs of the ontology, 
# structure graph, product, and plane of sectioning of interest.  This script
# also provides the option of only estimating connections between a specific
# set of structures using the StructureSets table.  Only the `TOP_N` most 
# correlated connections will be kept, approximately.

#API_PATH = "http://api.brain-map.org/api/v2/data"
API_PATH = "http://ibs-davidf-ux1:3000/api/v2/data"
GRAPH_ID = 1
MOUSE_PRODUCT_ID = 1 # aba
PLANE_ID = 1 # coronal
TOP_N = 2000

DATA_SET_QUERY_URL = ("%s/SectionDataSet/query.json" +\
                          "?criteria=[failed$eq'false'][expression$eq'true']" +\
                          ",products[id$eq%d]" +\
                          ",plane_of_section[id$eq%d]") \
                          % (API_PATH, MOUSE_PRODUCT_ID, PLANE_ID)

UNIONIZE_FMT = "%s/StructureUnionize/query.json" +\
    "?criteria=[section_data_set_id$eq%d]" +\
    "&include=section_data_set(products[id$eq%d])" % (MOUSE_PRODUCT_ID)

STRUCTURES_URL = ("%s/Structure/query.json?" +\
                      "criteria=[graph_id$eq%d]") \
                      % (API_PATH, GRAPH_ID)

# Make a query to the API via a URL.
def QueryAPI(url):
    start_row = 0
    num_rows = 2000
    total_rows = -1
    rows = []
    done = False

    # The ontology has to be downloaded in pages, since the API will not return
    # more than 2000 rows at once.
    while not done:
        pagedUrl = url + '&start_row=%d&num_rows=%d' % (start_row,num_rows)

        print pagedUrl
        source = urllib.urlopen(pagedUrl).read()

        response = json.loads(source)
        rows += response['msg']
        
        if total_rows < 0:
            total_rows = int(response['total_rows'])

        start_row += len(response['msg'])

        if start_row >= total_rows:
            done = True

    return rows

# Download the first `n` data sets.  For negative `n` , download them all.
def DownloadDataSets(n):
    dataSets = QueryAPI(DATA_SET_QUERY_URL)
  
    if n <= 0:
        return dataSets
    else:
        n = min(len(dataSets), n)

    return dataSets[:n]

# Download the mouse brain structures in a structure graph.
def DownloadStructures():
    structs = QueryAPI(STRUCTURES_URL)

    # Build a dict from structure id to structure and identify each node's 
    # direct descendants.
    structHash = {}
    for s in structs:
        s['num_children'] = 0
        s['structure_id_path'] = [int(sid) for sid in s['structure_id_path'].split('/') if sid != '']
        structHash[s['id']] = s 

    for sid,s in structHash.iteritems():
        if len(s['structure_id_path']) > 1:
            parentId = s['structure_id_path'][-2]
            structHash[parentId]['num_children'] += 1

    # pull out the structure ids for structures in this structure graph that
    # have no children (i.e. just the leaves)
    corrStructIds = [sid for sid,s in structHash.iteritems() if s['num_children'] == 0]

    return sorted(corrStructIds), structHash

# Download expression data from the StructureUnionize table.  This table is 
# accessed one probe/data set at a time, retrieving all of the expression levels 
# for structures showing expression for that probe. 
def DownloadExpression(dataSets):
    return [QueryAPI(UNIONIZE_FMT % (API_PATH,d['id'])) for d in dataSets]

# Download all of the probes, structures, and expression data for the adult mouse
# brain and transform it into useful data structures. Then compute 
# structure-to-structure expression correlation for all structures.
def DownloadAndCorrelateData(n):
    dataSets = DownloadDataSets(n)
    structureIds, structHash = DownloadStructures()
    unionizes = DownloadExpression(dataSets)

    # Each structure will have an expression vector.  This vector will be as long
    # as the number of requested structures.
    nstructs = len(structureIds)
    ndata = len(dataSets)

    sidHash = dict([(id,i) for (i,id) in enumerate(structureIds)])
    didHash = dict([(d['id'],i) for (i,d) in enumerate(dataSets)])
    
    expression = numpy.empty([nstructs,ndata])
    expression.fill(numpy.nan)

    # For each data set's set of unionizes, then for each individual structure,
    # fill in the structure's expression vector.
    for i,us in enumerate(unionizes):
        # for each unionize 
        for j,u in enumerate(us):
            sid = u['structure_id']
            did = u['section_data_set_id']

            struct = structHash[sid]
            struct['volume'] = u['sum_pixels']

            if sidHash.has_key(sid) and didHash.has_key(did):
                expression[sidHash[sid]][didHash[did]] = u['expression_energy']

    # numpy has a masked_array data structure that performs computations while
    # filtering out values you don't care about.  In this case, we don't want 
    # the correlation computation to use NaN's, which indicate that no 
    # expression was measured for a structure.
    mdat = numpy.ma.masked_array(expression,numpy.isnan(expression))
    corr = numpy.ma.corrcoef(mdat)

    return corr.data, structureIds, structHash

# Given a structures-by-probes correlation matrix and an array of structures,
# figure out which structures are the most correlated to each other.  Return
# these as an array of {source,target,correlation} hashes.
def EstimateConnections(corr,structIds):

    # Identify a threshold that will pull out approximately `TOP_N` values. 
    # First, mask out NaNs and redundant lower diagonal elements, then sort
    # the values into a 1D array without masked elements.  The threshold will
    # be picked as the value of the (length - TOP_N)'th element.
    mcorr = numpy.ma.masked_array(corr,numpy.isnan(corr) | numpy.tril(numpy.ones(corr.shape,dtype=bool)))
    corrsort = numpy.ma.sort(mcorr,axis=None,endwith=False).compressed()

    ncorr = len(corrsort)
    idx = ncorr-TOP_N if ncorr > TOP_N else 0
    threshold = corrsort[idx]

    connections = []
    nstructs = len(structIds)
    for i in xrange(nstructs):
        for j in xrange(i+1,nstructs):
            c = corr[i][j]
            if c > threshold:
                connections.append({ 'source': structIds[i], 
                                     'target':  structIds[j], 
                                     'corr' : corr[i][j] })

    return connections

# Handle command line arguments. Usage is:
# `download_data.py <prefix>.json <nprobes>`

nargs = len(sys.argv)

fname = sys.argv[1] if nargs > 1 else "out.json"
n = int(sys.argv[2]) if nargs > 2 else 0

base,ext = os.path.splitext(fname)

structfile = base + ".structures" + ext
connfile = base + ".connections" + ext
corrfile = base + ".correlations" + ext

# Download the data, compute the structure-structure correlation matrix, then
# identify the most correlated pairs of structures.
corr,structIds,structHash = DownloadAndCorrelateData(n)
conns = EstimateConnections(corr,structIds)

# Write out the connections, structures, and correlation matrix as JSON.
if ext == ".json":
    f = open(connfile,"w")
    f.write(json.dumps(conns))
    f.close()
    
    f = open(structfile,"w")
    f.write(json.dumps(structHash.values()))
    f.close()

    f = open(corrfile,"w")
    f.write(json.dumps(list([list(r) for r in corr])))
    f.close()
else:
    print "output file: " + fname + " must be .json"

