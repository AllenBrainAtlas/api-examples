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

# This demonstrates how to load two raw expression energy volumes and their
# corresponding reference volume and compute the fold change between the 
# volumes on a per-structure basis.  

import array
import argparse
import copy
import csv
import json
import struct
import sys
import urllib
import zipfile

# These are hard-coded paths to URLs for downloading expression volumes.
API_SERVER = "http://api.brain-map.org/"
API_DATA_PATH = API_SERVER + "api/v2/data/"

STRUCTURE_GRAPH_ID = 1
REFERENCE_SPACE_ID = 10

STRUCTURES_URL = ("%s/Structure/query.json?" +\
                      "criteria=[graph_id$eq%d]") \
                      % (API_DATA_PATH, STRUCTURE_GRAPH_ID)

REFERENCE_SPACE_URL = ("%s/ReferenceSpace/query.json?criteria=[id$eq%d]" + \
                          "&include=well_known_files[path$li'*gridAnnotation.zip']" ) \
                          % (API_DATA_PATH, REFERENCE_SPACE_ID)

GRID_FMT = API_SERVER + "grid_data/download/%d"

DEFAULTS = {
    "sourceId": 69855739,
    "targetId": 70813257,
    "csv": "foldchange.csv"
}

# Download a grid file from the URL above by substituting in the data set id 
# argument.  Grid files are .zip files that will be downloaded to a 
# temporary location, where it can be unzipped into memory using the zipfile
# module.  The raw volume is converted into a flat array of floats.
def DownloadGridFile(dataSetId):
    url = GRID_FMT % (dataSetId)
    fh = urllib.urlretrieve(url)

    zf = zipfile.ZipFile(fh[0])

    header = zf.read('energy.mhd')
    raw = zf.read('energy.raw')
    arr = array.array('f',raw)

    return (header,arr)

# Make a query to the API via a URL.
def QueryAPI(url):
    start_row = 0
    num_rows = 2000
    total_rows = -1
    rows = []
    done = False

    # the ontology has to be downloaded in pages, since the API will not return
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

# Download reference space meta information from the API.  Specifically, this 
# is looking for the download link to the zip file containing an annotation
# volume at the same resolution as the grid files.  Then, download the
# link, unzip the archive, and return the raw grid annotation volume as an array 
# of unsigned shorts (type `H`).
def DownloadAnnotationVolume():
    refspace = QueryAPI(REFERENCE_SPACE_URL)[0]
    reffile = refspace['well_known_files'][0]

    fh = urllib.urlretrieve(API_SERVER + reffile["download_link"])
    zf = zipfile.ZipFile(fh[0])

    raw = zf.read('gridAnnotation/gridAnnotation.raw')
    arr = array.array('H',raw)

    return arr

# Download the ontology from the API.  This is a flat list of structures.
# We also download a list of parent-child relationships from the 
# StructureGraph model and use those to build a navigable tree hash.
def DownloadOntology():
    structures = QueryAPI(STRUCTURES_URL)

    # Build a hash from structure id to structure.
    structureHash = {}
    
    for i in xrange(len(structures)):
        s = structures[i]
        s['structure_id_path'] = map(int, s['structure_id_path'].strip('/').split('/'))
        s['parent'] = None
        s['sum1'] = 0.0
        s['volume1'] = 0
        s['sum2'] = 0.0
        s['volume2'] = 0

        structureHash[s['id']] = s

    # Make it a bit clearer who the parent of this structure is.
    for sid,s in structureHash.iteritems():
        if len(s['structure_id_path']) > 1:
            s['parent'] = structureHash[s['structure_id_path'][-2]]

    return structureHash

# Iterate through the voxels and sum up the expression values for each 
# structure. This is performed recursively up the ontology in what we usually
# call unionization.
def UnionizeStructures(arr1,arr2,annot,structures):
    nvoxels = len(arr1)
    
    for i in xrange(nvoxels):
        structureId = annot[i]

        try:
            node = structures[structureId]
            while node:
                if arr1[i] != -1.0:
                    node['sum1'] += arr1[i]
                    node['volume1'] += 1
                    
                if arr2[i] != -1.0:
                    node['sum2'] += arr2[i]
                    node['volume2'] += 1
                        
                node = node['parent']
        except KeyError:
            pass

# Compute fold change, which is defined as the ratio of the mean expression 
# of two genes within a structure.
def ComputeFoldChange(structures):
    for k,v in structures.iteritems():
        mean1 = (v['sum1'] / v['volume1']) if (v['volume1'] > 0) else 0.0
        mean2 = (v['sum2'] / v['volume2']) if (v['volume2'] > 0) else 0.0
        
        v['fold_change'] = (mean1/mean2) if (mean2 > 0) else float("inf")

def main():
    # Parse command line arguments.  If no arguments are supplied, some defaults
    # are used just for demonstration. The `formatter_class` is just there so 
    # that default values are printed in the usage statement.
    parser = argparse.ArgumentParser(description="Compute fold change",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--sourceId','-s', type=int, default=DEFAULTS['sourceId'], help='source data set id')
    parser.add_argument('--targetId','-t', type=int, default=DEFAULTS['targetId'], help='target data set id')
    parser.add_argument('--csv','-c', type=str, default=DEFAULTS['csv'], help='output CSV file name')
    args = parser.parse_args()

    # Download the ontology, grid files for the two expression volumes, and 
    # the annotation volume.
    structures = DownloadOntology()
    
    h1, arr1 = DownloadGridFile(args.sourceId)
    h2, arr2 = DownloadGridFile(args.targetId)
    
    annot = DownloadAnnotationVolume()

    # Unionize the structures based on the ontology and compute the fold change
    # between voxels in the source volume and voxels in the target volume.
    UnionizeStructures(arr1,arr2,annot,structures)
    ComputeFoldChange(structures)

    # Write the fold changes out to the CSV file.
    with open(args.csv, 'wb') as f:
        writer = csv.writer(f)
        writer.writerow(["id","name","mean_fold_change"])
        for k,v in structures.iteritems():
            writer.writerow([v['id'],v['name'].encode('utf8'),v['fold_change']])

if __name__ == "__main__":
    main()
