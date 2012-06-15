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

var apiPath = "/api/v2/";

// This uses the Modernizr JS library to check to see if the page supports SVG.
// If it does not, throw an error.
if (!Modernizr.svg){
	$('#maContent').append(
		$('<div>').addClass('svgError')
			.html("This demo requires SVG support. " +
				  "Click <a href='http://caniuse.com/#cats=SVG'>here</a> " + 
				  "to see which browsers support SVG."));
	throw 'SVG not supported';
}

// A convenience map that associates a developmental stage with its age-matched 
// reference atlas data set ID.
var ageDataSetMap = {
	"E11.5": 100054043,
	"E13.5": 100054042,
	"E15.5": 100054041 
};

// Set the default data set ID, but override it if one exists in the URL.
var dataSetId = 100045975;

var urlVars = getUrlVars();
if ('dataSetId' in urlVars)
	dataSetId = urlVars['dataSetId'];

// D3 is a javascript library that takes care of a lot of details useful for 
// visualization.  In this case, it's being used for transforming data values
// and categories into colors.

var energyDomain = [0,1.5];
var energyScale = d3.scale.linear()
	.domain(energyDomain)
	.range(["white","red"]);

var intensityScale = d3.scale.ordinal()
	.domain(["Undetected","Low","Medium","High","Cannot Annotate"])
	.range(["white","#FDD","#F66","#F00","lightgreen"]);

var densityScale = d3.scale.ordinal()
	.domain(["Undetected","Low","Medium","High","Cannot Annotate"])
	.range(["white","#FDD","#F66","#F00","lightgreen"]);

var patternScale = d3.scale.ordinal()
	.domain(["Undetected","Regional","Gradient","Full","Cannot Annotate"])
	.range(["white","orange","magenta","red","lightgreen"]);

// Build the home button and slider that controls the expression energy colors.

$("#homeButton").button({ icons: { primary: "ui-icon-home" }});
$("#energyLowerLabel").html(energyDomain[0]);
$("#energyUpperLabel").html(energyDomain[1]);
$("#energySlider").slider({
	range: true,
	min: 0,
	max: 12,
	values: energyDomain,
	step: 0.1,
	slide: function(event, ui) {
		if (ui.values[1] > ui.values[0]) {
			$("#energyLowerLabel").html(ui.values[0]);
			$("#energyUpperLabel").html(ui.values[1]);
			energyScale.domain(ui.values);
			updateEnergy();
		}
	}
});

// The developing mouse ISH data and manual annotation data have different
// ontologies, so they have diagrams with different structure names.
var svgFile = "../manannot/Level_5_March_2010.svg";
var maSvgFile = "../manannot/Level_5_Manual_Annotation.svg";

var unionizes = [];

// Update the title of the page to reflect the gene and stage it depicts.
// Also provide a link to a side-by-side view of the reference space
// for this stage and the data set being visualized.
downloadDataSetInfo(dataSetId, function(dataSets) {
	var dataSet = dataSets[0];
	var age = dataSet.specimen.donor.age.name;
	var gene = dataSet.genes[0];
	var refId = ageDataSetMap[age];
	var href = "http://developingmouse.brain-map.org/data/compare/ivt.html?ispopup=true&include="+refId+","+dataSetId;	

	$('#title').append($('<h3>')
					   .html("Expression for <a href='"+href+"'>" + gene.acronym + " (" + age + ")</a>"));
});

// Load the SVG file for the developing mouse ISH data.
$.ajax(svgFile, { success: function(res, status, xhr) { 

	// Embed the SVG into the structure and energy visualizations. The strange
	// `or` statement below makes this work in IE9.
	$("#energySvg").append(res.xml || xhr.responseText);

	// The SVGs have colors, but they do not match the current reference atlas
	// colors.  We'll pull these out of the API shortly, but until then fill
	// with a default.
	$("#energySvg #Polygons path").css('fill','lightgreen');

	// Figure out which acronyms are represented in the structure SVG.
	var acronymList = extractAcronyms("energySvg");

	// Download the entries of the `StructureUnionize` table for structures in 
	// the acronym list.
	downloadUnionizes(acronymList, dataSetId, function(rows) {

		// Update the global list of unionize rows and redraw energy diagram.
		unionizes = rows;
		updateEnergy();
	});
}});

// Download the SVG file for the manual annotation data.
$.ajax(maSvgFile, { success: function(res, status, xhr) { 

	// Embed the SVG into the intensity, density, and pattern visualizations. 
	// The strange `or` statement below makes this work in IE9.
	$("#structureSvg").append(res.xml || xhr.responseText);
	$("#intensitySvg").append(res.xml || xhr.responseText);
	$("#densitySvg").append(res.xml || xhr.responseText);
	$("#patternSvg").append(res.xml || xhr.responseText);

	// The SVGs have colors, but we're going to overwrite them with annotation
	// colors shortly.  Until then fill with a default.
	$("#structureSvg #Polygons path").css('fill','white');;
	$("#intensitySvg #Polygons path").css('fill','lightgreen');
	$("#densitySvg #Polygons path").css('fill','lightgreen');
	$("#patternSvg #Polygons path").css('fill','lightgreen');

	// Figure out which acronyms are represented in the intensity SVG.
	var acronymList = extractAcronyms("structureSvg");
	
	// Download the annotation data for structures in the acronym list.
	downloadAnnotations(acronymList, dataSetId, function(annotations) {

		$.each(annotations, function(i, annotation) {

			// Set the intensity color for this structure. 
			var path = selectPath('intensitySvg', annotation.structure.acronym);
			path.css('fill', intensityScale(annotation.intensity_call));

			// Set the density color for this structure.
			path = selectPath('densitySvg', annotation.structure.acronym);
			path.css('fill', densityScale(annotation.density_call));

			// Set the pattern color for this structure.
			path = selectPath('patternSvg', annotation.structure.acronym);
			path.css('fill', patternScale(annotation.pattern_call));
		});
	});

	// Download all of the developing mouse structure meta data for structures
	// in the acronym list.
	downloadStructures(acronymList, function(structures) {

		// For each structure, identify the corresponding SVG path(s) and set 
		// the background fill color.
		$.each(structures, function(i, structure) {
			var path = selectPath("structureSvg", structure.acronym);
			path.css('fill','#'+structure.color_hex_triplet);
		});
	});

	// The manual annotation diagrams all have legends with the same format.
	// Build a list of them then construct the legends.
	var legends = [ { container: $("#densityLegend"), scale: densityScale },
					{ container: $("#intensityLegend"), scale: intensityScale },
					{ container: $("#patternLegend"), scale: patternScale } ];

	$.each(legends, function(i, legend) {
		$.each(legend.scale.domain(), function(j, call) {

			// Add an empty colored box with an adjacent text description.
			legend.container
				.append($('<span>')
						.html('&nbsp;&nbsp;&nbsp;&nbsp;')
						.css('background', legend.scale(call))
						.addClass('legendColor'))
				.append($('<span>')
						.html(call)
						.addClass('legendLabel'));
		});
	});
}});

// For every row in the global unionize row list, update the corresponding
// structure in the energy SVG.
function updateEnergy() {
	$.each(unionizes, function(i,unionize) {
		var path = selectPath('energySvg', unionize.structure.acronym);
		path.css('fill', energyScale(unionize.expression_energy));
	});
}

// Find the SVG path element whose ID is a particular structure acronym.
// Occasionally a structure must be split into two polygons even though path 
// IDs must be unique, so a suffix is appended onto the end of the ID. The 
// suffix has the format "acronym_1_", so we have to a slightly complicated 
// select that ignores the suffix when doing the search.
function selectPath(svgId, acronym) {
	return $('#' + svgId + " path").filter(function() {
		return acronym == this.id.replace(/_.*/,"");
	});
}

// Build an array of structure acronyms found within the structure polygons
// in a single SVG.
function extractAcronyms(svgId) {
	acronymList = [];
	$("#"+svgId+" #Polygons path").each(function(i,path) { 
		acronymList.push(path.id); 
	});
	return acronymList;
}

// Download entries of the `Structure` table with a given set of acronyms.
function downloadStructures(acronyms, onsuccess) {
	var acronymList = "'" + acronyms.join("','") + "'";

	var queryPath = "data/Structure/query.json" +
		"?criteria=[acronym$in" + acronymList + "]";

	apiQuery(queryPath, onsuccess);
}

// Download entries in the `StructureUnionize` table with a given set of acronyms.
function downloadUnionizes(acronyms, dataSetId, onsuccess) {
	var acronymList = "'" + acronyms.join("','") + "'";

	var queryPath = "data/StructureUnionize/query.json" +
		"?include=structure[acronym$in" + acronymList + "]" +
		"&criteria=[section_data_set_id$eq" + dataSetId + "]";

	apiQuery(queryPath, onsuccess);
}

// Download meta information for a data set.
function downloadDataSetInfo(dataSetId, onsuccess) {
	var queryPath = "data/SectionDataSet/" + dataSetId + ".json" +
		"?include=specimen(donor(age)),genes";

	apiQuery(queryPath, onsuccess);
}

// Download entries in the `ManualAnnotation` table with a given set of acronyms.
function downloadAnnotations(acronyms, dataSetId, onsuccess) {
	var acronymList = "'" + acronyms.join("','") + "'";

	var queryPath = "data/ManualAnnotation/query.json?" +
		"criteria=[intensity_call$ne'']," +
		"[section_data_set_id$eq" + dataSetId + "]&" +
		"include=structure[acronym$in" + acronymList + "]";

	apiQuery(queryPath, onsuccess);
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
					
					if (total_rows < 0 || isNaN(total_rows)) {
						apiError("total_rows incorrect", url);
					} else if (rows.length >= total_rows) {
						onsuccess(rows);
					} else {
						apiPageQuery();
					}
				} else {
					apiError(response.msg, url);
				}
			},
			error: function(response) {
				apiError(response.statusText, url);
			}
		});
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
}

// This function splits the URL parameter string into a javascript hash.

function getUrlVars()
{
	var vars = [], hash;
	var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
	for(var i = 0; i < hashes.length; i++)
	{
		hash = hashes[i].split('=');
		vars.push(hash[0]);
		vars[hash[0]] = hash[1];
	}
	return vars;
}