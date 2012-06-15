// Copyright 2012 Allen Institute for Brain Science
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

// This script contains functions that load ontology and expression data for
// a given probe and donor.  

// These contants are the structure id for the root element of the adult 
// mouse ontology to be used for visualization, the path to the data API,
// the ID of the adult mouse ontology, and a data set id to visualize. The
// chosen root of the ontology was chosen so that fiber tracts would not
// be displayed, as they were not annotated.

var rootId = 8;
var apiPath = "/api/v2/";
var ontologyId = 1; 
var structureGraphId = 1; 

function importData(id, callback) {
	var structures = null;
	var expression = null;
	
	// Download the structures. The `structure_graph_download` method downloads
	// a hierarchical hash containing all of the structures from a single 
	// ontology structure graph. StructureGraphs are essentially the same as 
	// Ontologies, however for some projects it may be useful to have multiple 
	// ontology organizations, hence the need for separate StructureGraphs. 
	// When they have finished downloading, call `processStructures`.  

	var url = apiPath + "structure_graph_download/" + structureGraphId + ".json";
	$.ajax(url, {
		crossDomain: true,
		success: processStructures,
		error: function(response) { apiError(response.statusText, url); }
	});
		   
	// Download the expression values.  The StructureUnionize class contains,
	// amongst other things, the expression energy of each structure in the
	// adult mouse atlas ontology.  When this is finished downloading, 
	// call `processExpression`.
	
	apiQuery("data/StructureUnionize/query.json" + 
			 "?criteria=[structures.ontology_id$eq" + ontologyId + "]" + 
			 "[section_data_set_id$eq" + id + "]" +
			 "&include=structure",
			 processExpression);

	// These two methods simply exist to set the `structures` and `expression`
	// variables in `importData`'s scope.  They both call `processData` 
	// afterwards, which will only run one both variables have been set.

	function processStructures(data) {

		// On Chrome, the response is already a javascript object. 
		// On IE/Firefox, it comes back as a string.  
		if (typeof(data) == "string") 
			data = JSON.parse(data);						

		structures = findChild(data.msg[0], rootId);
		processData();
	}

	// This transforms the returned StructureUnionize rows into a hash from
	// structure id to expression energy value.

	function processExpression(data) {
		expression = {};
		for (var i = 0; i < data.length; i++) {
			var e = data[i];
			expression[e.structure_id] = e.expression_energy;
		}
		processData();
	}
	
	// Check that all of the data is finished downloading and returns it if so.

	function processData() {
		if (!structures || !expression)
			return;

		callback(structures,expression);
	}

	// Find a structure's child structure, by structure id.
	
	function findChild(structure, childId) {
		if (structure.id == childId)
			return structure;
		else {
			for (var i=0; i<structure.children.length; i++) {
				var r = findChild(structure.children[i], childId);
				if (r) return r;
			}
			return null;
		}
	}

	// If something goes wrong, alert the user.

	function apiError(response, url) {

		var errorHtml = 
			"<p>There was an error with the following query:</p>" + 
			"<p>" + url + "</p>" + 
			"<p>Error message:</p>" + 
			"<p>" + response + "</p>";
		
		var dialog = $( "#errorDialog" );
		
		var existingErrors = dialog.html();
		
		$( "#errorDialog" )
			.html(existingErrors + errorHtml)
			.dialog({
				width: 500,
				height: 200,
				modal: true
			});
	}

	// Make an API query.  You can't actually request all result rows of a query
	// at one time.  This function takes care of appending all of the pages of
	// results together.

	function apiQuery(path, onsuccess) {
		var rows = [];
		var num_rows = 2000;
		var total_rows = -1;

		apiPageQuery();

		// Make the actual query.  Keep downloading more rows until they have 
		// all been retrieved.  All API queries return the total number of rows
		// in the request, so we have to make a request before we can find out
		// how many rows will be in it.

		function apiPageQuery() {
			var url = apiPath + path + 
				"&start_row=" + rows.length +
				"&num_rows=" + num_rows;

			$.ajax(url, {
				crossDomain: true,
				success: function(response) {
					// On Chrome, the response is already a javascript object. 
					// On IE/Firefox, it comes back as a string.  
					if (typeof(response) == "string") 
						response = JSON.parse(response);						

					if (response.success) {
						rows.push.apply(rows, response.msg);
						total_rows = parseInt(response.total_rows);
						
						if (total_rows < 0 || isNaN(total_rows)) 
							apiError("total_rows incorrect", url);
						else if (rows.length >= total_rows) 
							onsuccess(rows);
						else
							apiPageQuery();
					} else {
						apiError(response.msg, url);
					}
				},
				error: function(response) {
					apiError(response.statusText, url);
				}
			});
		}
	}
}