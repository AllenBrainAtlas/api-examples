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

# This is a simple script that downloads and extracts the atlasVolume 
# and grid file archives.
import argparse
import copy
import json
import os
import sys
import urllib
import zipfile

# These are hard-coded paths to URLs for downloading expression volumes.
API_SERVER = "http://api.brain-map.org/"
API_DATA_PATH = API_SERVER + "api/v2/data/"

REFERENCE_SPACE_ID = 10

REFERENCE_SPACE_URL = (API_DATA_PATH + "ReferenceSpace/query.json?criteria=[id$eq%d]" + \
                          "&include=well_known_files[path$li'*atlasVolume.zip']" ) % (REFERENCE_SPACE_ID)

GRID_FMT = API_SERVER + "grid_data/download/%d"

DEFAULT_DATA_SET_ID = 69855739

# Download a grid file from the URL above by substituting in the data set id 
# argument.  Grid files are .zip files that will be downloaded to a 
# temporary location, where it can be unzipped and then extracted.
def DownloadGridFile(dataSetId,outputDirectory):
    url = GRID_FMT % (dataSetId)
    fh = urllib.urlretrieve(url)

    zf = zipfile.ZipFile(fh[0])
    
    zf.extractall(outputDirectory,['energy.mhd','energy.raw'])

    zf.close()

# Make a query to the API via a URL.
def QueryAPI(url):
    startRow = 0
    numRows = 2000
    totalRows = -1
    rows = []
    done = False

    # the ontology has to be downloaded in pages, since the API will not return
    # more than 2000 rows at once.
    while not done:
        pagedUrl = url + '&startRow=%d&numRows=%d' % (startRow,numRows)

        print pagedUrl
        source = urllib.urlopen(pagedUrl).read()
        response = json.loads(source)
        rows += response['msg']
        
        if totalRows < 0:
            totalRows = int(response['totalRows'])

        startRow += len(response['msg'])

        if startRow >= totalRows:
            done = True

    return rows

# Download reference space meta information from the API.  Specifically, this 
# is looking for the download link to the zip file containing the atlas
# volume at the same resolution as the grid files.  Then, download the
# link and unzip the archive to a specified location.
def DownloadAtlasVolume(outputDirectory):
    refspace = QueryAPI(REFERENCE_SPACE_URL)[0]
    reffile = refspace['well_known_files'][0]

    fh = urllib.urlretrieve(API_SERVER + reffile["download_link"])
    zf = zipfile.ZipFile(fh[0])

    zf.extractall(outputDirectory,['atlasVolume/atlasVolume.mhd','atlasVolume/atlasVolume.raw'])
    zf.close()

def main():
    # Parse command line arguments.  If no arguments are supplied, some defaults
    # are used just for demonstration. The `formatter_class` is just there so 
    # that default values are printed in the usage statement.
    parser = argparse.ArgumentParser(description="Download the atlasVolume and a grid file for a data set",
                                     formatter_class=argparse.ArgumentDefaultsHelpFormatter)
    parser.add_argument('--dataSetId','-d', type=int, default=DEFAULT_DATA_SET_ID, help='data set id')
    parser.add_argument('--outputDirectory','-o', type=str, default='.', help='output directory')
    args = parser.parse_args()

    DownloadAtlasVolume(args.outputDirectory)
    DownloadGridFile(args.dataSetId, args.outputDirectory)

if __name__ == "__main__":
    main()
