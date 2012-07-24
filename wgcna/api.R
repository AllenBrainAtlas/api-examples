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

# A function returning the path of the API.
getApiPath <- function() {
	return("http://api.brain-map.org")
}

# Download all of the rows available from a supplied API query.  
apiQuery <- function(query) {
	totalRows <- -1
	rowsPerPage <- 2000
	startRow <- 0
	queryFormat <- "%s/api/v2/data/%s&startRow=%d&numRows=%d"

	# Download meta information about the human microarray samples one page at a time. 
	while (totalRows < 0 || startRow < totalRows) {
		queryString <- sprintf(queryFormat, getApiPath(), query, startRow, rowsPerPage)
		print(queryString)
		
		resultString <- readLines(queryString)
		resultJSON <- fromJSON(resultString)
	
		if (totalRows < 0) {
			totalRows <- as.integer(resultJSON$total_rows)
			output <- resultJSON$msg
		} else {
			output <- c(output,resultJSON$msg)
		}

		startRow <- startRow + rowsPerPage
	}

	return(output)
}

# Download metadata about a specified structure.
downloadStructure <- function(structureID) {
	queryString <- sprintf("%s/api/v2/data/Structure/%s.json", getApiPath(), structureID)
	print(queryString)
	resultString <- readLines(queryString)
	resultJSON <- fromJSON(resultString)
	
	return(resultJSON$msg[[1]])
}

# Sort a data frame full of sample meta information.
downloadSampleProperties <- function(sampleInfo) {
	structureIDs = sampleInfo$structure_id
	numSamples <- length(structureIDs)

	# Fill the sample data frame with color and order information.
	structureColors <- array("#000000FF",numSamples)
	structureOrders <- array(0,numSamples)

	for (i in 1:numSamples) {
		s = downloadStructure(structureIDs[i])
		structureOrders[i] <- s$graph_order
		structureColors[i] <- paste("#",s$color_hex_triplet,sep="")
	}

	sampleInfo[,"order"] <- structureOrders
	sampleInfo[,"color"] <- structureColors
	return(sampleInfo)
}