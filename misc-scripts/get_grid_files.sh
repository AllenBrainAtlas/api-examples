#!/bin/bash

######
#
# Copyright 2012 Allen Institute for Brain Science
#
#   Licensed under the Apache License, Version 2.0 (the "License");
#   you may not use this file except in compliance with the License.
#   You may obtain a copy of the License at
#
#       http://www.apache.org/licenses/LICENSE-2.0
#
#   Unless required by applicable law or agreed to in writing, software
#   distributed under the License is distributed on an "AS IS" BASIS,
#   WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
#   See the License for the specific language governing permissions and
#   limitations under the License.
#

#
# This shell script will download 3-D Expression Grid Data using the Allen Institute API.
#
# Required parameters are product_abbreviation and gene_acronym.
#
#     http://api.brain-map.org/doc/index.html#Searching_Annotated_SectionDataSets
#     http://api.brain-map.org/doc/index.html#Downloading_3-D_Expression_Grid_Data
#
######


HOST=api.brain-map.org
PORT=80

DOWNLOAD_DIR=grid_data

USAGE="\nusage: ${0} <product_abbreviation> <gene_acronym>\n\n\twhere \"product_abbreviation\" is an Allen Institute for Brain Science product abbreviation and \"gene_acronym\" is a gene acronym.\n\n\te.g. ${0} Mouse Adora2\n\n\tfor a list of product_abbreviations see: \"http://${HOST}:${PORT}/api/v2/data/query.xml?criteria=model::Product&only=abbreviation,name\"\n"

if [ $# -lt 2 ]; then
  echo -e $USAGE
  exit 1
fi

PRODUCT=${1}
GENE_ACRONYM="${2}"
if [ ! $(expr length $GENE_ACRONYM) -ge 1 ]; then
  echo -e $USAGE
  exit 1
fi

DOWNLOAD_DIR=$DOWNLOAD_DIR/$PRODUCT_$GENE_ACRONYM
if [ ! -d $DOWNLOAD_DIR ]; then
  mkdir -p $DOWNLOAD_DIR
else
  rm -rf $DOWNLOAD_DIR/*
fi

RMA_URL="http://${HOST}:${PORT}/api/v2/data/query.xml?criteria=model::SectionDataSet[failed\$eq'f'][storage_directory\$ne'nil'],rma::include,genes[acronym\$eq${GENE_ACRONYM}],products[abbreviation\$eq${PRODUCT}]&only=data_sets.id,data_sets.storage_directory,specimen_id,genes.acronym"
GRID_DATA_SERVICE_URL="http://${HOST}:${PORT}/grid_data/download"

# use the RMA to return all section data sets for the specified product abbreviation and gene acronym
rows_processed=0
num_rows=50
done="false"

# get the total_rows
wget -q -O $DOWNLOAD_DIR/section_data_sets.xml "${RMA_URL}&num_rows=1"
total_rows=$(egrep -o -e "total_rows='[0-9]+'" $DOWNLOAD_DIR/section_data_sets.xml |tr -cd '0-9\012')
if [ $total_rows -eq 0 ]; then
  echo -e "No 3-D Expression Grid Data files available for gene acronym \"${GENE_ACRONYM}\".\n"
  rm -rf $DOWNLOAD_DIR
  exit 0
fi
echo -e "Downloading ${total_rows} 3-D Expression Grid Data files for gene acronym \"${GENE_ACRONYM}\"...\n"

# this loop will retrieve num_rows from the service API until all of the data is acquired.
while [ $done == "false" ]
do
  if [ $rows_processed -ge $total_rows ]; then
    done="true"
  fi

  wget -q -O $DOWNLOAD_DIR/section_data_sets.xml "${RMA_URL}&start_row=${rows_processed}&num_rows=${num_rows}"
  num_rows=$(egrep -o -e "num_rows='[0-9]+'" $DOWNLOAD_DIR/section_data_sets.xml |tr -cd '0-9\012')
  ((rows_processed = $rows_processed + $num_rows))

  # parse the XML file for one or more section_id
  ids=$(grep -e '<id>[0-9]*</id>' $DOWNLOAD_DIR/section_data_sets.xml)
  for id in $(echo $ids |tr " " "\n")
  do
    # call the grid data service url for the section_id
    section_id=$(echo $id |sed -e :a -e 's/<[^>]*>//g')
    grid_dir=$DOWNLOAD_DIR/$section_id
    mkdir $grid_dir -p
    wget -nv -O $grid_dir/gridfile.zip $GRID_DATA_SERVICE_URL/$section_id.zip
    unzip -o -d $grid_dir $grid_dir/gridfile.zip; rm -f $grid_dir/gridfile.zip
  done
done
rm -f $DOWNLOAD_DIR/section_data_sets.xml

echo -e "\nDownloaded ${total_rows} 3-D Expression Grid Data files for gene acronym \"${GENE_ACRONYM}*\".  Results are in \"$(pwd)/$DOWNLOAD_DIR/\"."
