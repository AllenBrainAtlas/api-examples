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

# Read the CSV data files for a human microarray donor (accessible here: [http://human.brain-map.org/static/download]).
# Then run through the list of probes and remove those that have no entrez ID and 
# use the `collapseRows` WGCNA function to pick a single probe per gene.  Also download
# some supplementary sample metadata useful for visualization.  Finally save the result
# to an R object file.  The following will preprocess the 9861 donor microarray data,
# assuming 9861.zip has been unarchived into a directory called `9861`.
#
#     library(WGCNA)
#     library(RJSONIO)
#     source("preprocessData.R")
#     source("api.R")
#     preprocessData("9861","9861.RData")
preprocessData <- function(donorDir,outputFileName) {

	# Load in the data for one of the donors.
	datExpr <- read.csv(sprintf("%s/MicroarrayExpression.csv",donorDir),header=FALSE,row.names=1)
	probeInfo <- read.csv(sprintf("%s/Probes.csv",donorDir),header=TRUE)
	sampleInfo <- read.csv(sprintf("%s/SampleAnnot.csv",donorDir),header=TRUE)

	# Filter the data.  Remove probes that have no entrez id.
	validProbes = which(probeInfo$entrez_id>=0,arr.ind=TRUE)
	datExpr <- datExpr[validProbes,]
	probeInfo <- probeInfo[validProbes,]

	# Some genes have more than one probe.  The `collapseRows` function chooses
	# a single probe to represent a gene.
	probeNames = probeInfo[which(probeInfo == rownames(datExpr)),"gene_symbol"]
	probeIDs = rownames(datExpr)
	datCollapsed = collapseRows(datExpr, probeNames, probeIDs)

	datExpr <- datCollapsed$datETcollapsed
	probeInfo <- probeInfo[which(datCollapsed$selectedRow == TRUE,arr.ind=TRUE),]
	
	# The API provides structure colors and sort order for visualization purposes.  Download
	# those value and append them to the sampleInfo data frame.  
	sampleInfo <- downloadSampleProperties(sampleInfo)

	save(datExpr,probeInfo,sampleInfo,file=outputFileName)
}