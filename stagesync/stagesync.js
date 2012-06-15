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

// This script primarily builds URLs to imageservice images and demonstrates
// how to use the `image_to_image` and `image_to_atlas` methods for retrieving
// the nearest image in one image to another image or atlas.

// Contants that point to the imageservice and API, respectively. 

var svcPath = "/cgi-bin/imageservice";
var apiPath = "/api/v2/";

// Many scanned images have very large pixel resolutions.  WWe have resampled the 
// original images at multiple lower resolutions all the way down to a
// 256x256 thumbnail.  The number of tiers in this image pyramid depends
// on the original dimensions of the image.  
//
// When making requests to the imageservice, the `downsample` parameter determines
// what tier/resolution will be returned.  `downsample=0` returns the highest
// pixel resolution.  Each level of downsampling is a factor of 2 reduction in 
// pixel resolution in both dimensions.

var downsample = 4;
var w = 285;
var h = 285;

var ages = [ "E11.5", "E13.5", "E15.5", "E18.5", "P4", "P14", "P28", "P56" ];

// Specify default image ids to show, and change them as requested in the 
// url parameter string.

var section = 101121829;
var product = 3;

var urlVars = getUrlVars();
if ('sectionImageId' in urlVars)
	section = urlVars.sectionImageId;

// Build the jQuery reload button. When clicked, call `reloadImages`.  Also, 
// format the page a bit.
$('#reloadButton').button().click(reloadImages);
$("#homeButton").button({ icons: { primary: "ui-icon-home" }});

// Load the images first time the page is loaded.
reloadImages();

function reloadImages() {

	// Load the meta data for the section image in question.
	loadSectionInfo(section, function(sectionInfo) {

		// The results come back as an array, even if there's only one result.
		sectionInfo = sectionInfo[0];
		
		// Get the central coordinate of the image.
		var cx = Math.floor(sectionInfo.width*.5);
		var cy = Math.floor(sectionInfo.height*.5);
		
		// Figure out which gene (the first, if there are multiple) this section is displaying.
		var geneId = sectionInfo.data_set.genes[0].id;
		var geneName = sectionInfo.data_set.genes[0].acronym;

		// Download meta data for section data sets displaying this same gene in the developing
		// mouse product, from a given list of developing mouse reference spaces.
		loadDataSets(geneId, ages, product, function(dataSets) {

			// Put the source data set at the front of the queue.
			dataSets.sort(function(a,b) { 
				if (a.id == sectionInfo.data_set_id) return -1;
				else if (b.id == sectionInfo.data_set_id) return 1;
				else return 0;
			});

			loadAtlases(ages, function(atlases) {

				var numRows = Math.max(dataSets.length, atlases.length);

				// Pre-populate the div table with elements to hold to-be-downloaded images.
				// This prevents AJAX responses from populating the table in the wrong order.
				var imageTable = $("#imageTable");

				imageTable.append($("<tr>")
								  .append($("<th>").append($('<div>').attr('id','imageTitle0').html('Source ' + geneName + ' Section'))
										  .attr('colspan',2)));

				imageTable.append($("<tr>")
								  .append($("<td>").append($('<div>').attr('id','image0'))
										  .attr('colspan',2)
										  .addClass('sourceCell')));
								  
				imageTable.append($("<tr>")
								  .append($("<th>").html("Synchronized " + geneName + " ISH Sections"))
								  .append($("<th>").html("Synchronized Atlases")));


				for (var i=0; i<numRows; i++) {
					imageTable.append($("<tr>")
									  .append($("<td>").append($('<div>').attr('id','imageTitle'+(i+1))))
									  .append($("<td>").append($('<div>').attr('id','atlasTitle'+i))));
											
					imageTable.append($("<tr>")
									  .append($("<td>").append($('<div>').attr('id','image'+(i+1))))
									  .append($("<td>").append($('<div>').attr('id','atlas'+i))));

					if (i < dataSets.length)
						$('#image'+i).addClass('image loading');

					if (i < atlases.length)
						$('#atlas'+i).addClass('image loading');
				}

				// Give the image divs a loading spinner.
				$('#temporarySpacer').remove();
				
				// Pull out a list of dataSetIds from the response meta data.
				var dataSetIds = $.map(dataSets, function(d) { return d.id; });

				// Use the `image_to_image` service to find the nearest coordinate in the nearest
				// section in each the data sets we downloaded.
				imageToImage(cx, cy, sectionInfo.id, dataSetIds, function(coords) {

					// Put failed synchronizations at the end of the list.
					coords.sort(function(a,b) { 
						var aId = a.image_sync.section_image_id;
						var bId = b.image_sync.section_image_id;
						
						if (aId && !bId) return -1;
						if (!aId && bId) return 1;
						else return 0;
					});
					
					$.each(coords, function(i, targetCoord) {
						
						targetCoord = targetCoord.image_sync;
						
						// Make sure that synchronization succeeded before moving on.
						if (targetCoord.section_image_id) {

							// Load the meta data for this target section image.
							loadSectionInfo(targetCoord.section_image_id, function(targetSectionInfo) {
								
								// The results come back as an array, even if there's only one result.
								targetSectionInfo = targetSectionInfo[0];
								
								// Estimate a good downsample value based on target pixel resolution.
								var targetDownsample = computeDownsample(sectionInfo.resolution, 
																		 targetSectionInfo.resolution, 
																		 downsample);
								
								var imgUrl = makeCenteredImageUrl(targetDownsample,
																  targetSectionInfo.path, 
																  targetSectionInfo.y + targetCoord.y, 
																  targetSectionInfo.x + targetCoord.x,
																  w, h);
								
								var imgDiv = $('#image'+i)
									.css('background','no-repeat center url('+imgUrl+')')
									.removeClass('loading');
								
								if (targetSectionInfo.id == sectionInfo.id) {
									var title = "Source " + geneName + " Section " + 
										"(" + targetSectionInfo.data_set.reference_space.age.name + ")";
									
									$("#imageTitle"+i).html(title);
								} else {
									$("#imageTitle"+i).html(targetSectionInfo.data_set.reference_space.age.name);
								}
							});
						} else {
							$('#image'+i)
								.removeClass('loading')
								.removeClass('image');
						}
					});
				});

				// pull out a list of dataSetIds from the response meta data.
				var atlasIds = $.map(atlases, function(d) { return d.id; });

				$.each(atlasIds, function(i, atlasId) {

					// Use the `image_to_atlas` service to find the nearest point on an atlas.
					imageToAtlas(cx, cy, sectionInfo.id, atlasId, function(atlasCoord) {
						
						atlasCoord = atlasCoord.image_sync;

						// Load the meta data for the atlas and build an image of it.
						loadAtlasImageInfo(atlasCoord.section_image_id, function(atlasImage) {

							atlasImage = atlasImage[0];

							// Estimate a good downsample value based on target pixel resolution.
							var targetDownsample = computeDownsample(sectionInfo.resolution, 
																	 atlasImage.resolution, 
																	 downsample);

							// The adult mouse reference atlases refer to the unannotated
							// NISSL images.  The annotated sections are stored in 
							// `alternate_images`, so use that if it exists.  Other atlases
							// are stored only as annoated sections.
							var atlasImagePath = (atlasImage.alternate_images.length > 0) ?
								atlasImage.alternate_images[0].path :
								atlasImage.path;

							var atlasUrl = makeCenteredImageUrl(targetDownsample, 
																atlasImagePath,
																atlasImage.y + atlasCoord.y, 
																atlasImage.x + atlasCoord.x, 
																w, h);

							$('#atlas'+i)
								.css('background','no-repeat center url('+atlasUrl+')')
								.removeClass('loading');

							$("#atlasTitle"+i).html(atlases[i].name);
						});
					});
				});
			});
		});
	});
}

// Find the pixel and section index in one SectionDataSet corresponding to a 
// pixel location in a section image.
function imageToImage(x, y, fromSectionImageId, toSectionDataSetId, onsuccess) {
	if (toSectionDataSetId.length > 0)
		toSectionDataSetId = toSectionDataSetId.join(',');

    var url = apiPath + 'image_to_image/' + fromSectionImageId + '.json' +
		'?x=' + x +
		'&y=' + y + 
		'&section_data_set_ids=' + toSectionDataSetId;

	apiQuery(url, onsuccess);
}

// Load the meta data for a atlas image based on its SectionDataSetId.
function loadAtlasImageInfo(sectionId, onsuccess) {
	var url = apiPath + 'data/AtlasImage/'+sectionId+'.json' + 
		'?include=alternate_images';
	
	apiQuery(url, onsuccess);
}

// Find the pixel and section index in an atlas corresponding to a pixel location
// in a section image.
function imageToAtlas(x, y, sectionImageId, atlasId, onsuccess) {

    var url = apiPath + 'image_to_atlas/' + sectionImageId + '.json' +
		'?x=' + x +
		'&y=' + y + 
		'&atlas_id=' + atlasId;

    apiQuery(url, onsuccess);
}

// Helper function to build imageservice urls.  For this type of query, you 
// supply the upper left pixel index in full resolution image coordinates and
// width and height in the coordinates at your desired downsampled tier.  

function makeImageUrl(downsample, path, top, left, width, height) {
    return svcPath + '?' + 
		'downsample=' + downsample +
		'&path=' + path + 
		'&top=' + top +
		'&left=' + left +
		"&width=" + width + 
		"&height=" + height;
}

// This method wraps `makeImageUrl` to simplify drawing an image at given size that
// is centered around a single pixel in full-resolution image coordinates.  The
// coordinate, width, and height of the image must be used to calculate the position
// of the upper-left pixel of the image in full resolution coordinates.

function makeCenteredImageUrl(downsample, path, cy, cx, width, height) {
	var scale = Math.pow(2,downsample); 
	var left = cx - width * 0.5 * scale;
	var top = cy - height * 0.5 * scale;

	return makeImageUrl(downsample, path, top, left, width, height);
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

function loadDataSets(gene, age_names, product, onsuccess) {
	var url = apiPath + 
		"data/SectionDataSet/query.json" +
		"?criteria=[failed$eqfalse]" +
		"&include=genes[id$eq" + gene + "]" +
		",products[id$eq" + product + "]" +
		",specimen(donor(age[name$in'" + age_names.join("','") + "']))" +
		",rma::options[order$eq'ages.embryonic$desc,ages.days']";

	apiQuery(url, onsuccess);
}

function loadAtlases(age_names, onsuccess) {
	var ageStr = "'" + age_names.join("','") + "'";
	var url = apiPath + 
		"data/Atlas/query.json?include=reference_space(age[name$in"+ageStr+"])" + 
		"&order=ages.embryonic$desc,ages.days";
	apiQuery(url, onsuccess);
}

function loadSectionInfo(id,onsuccess) {
    var url = apiPath + 'data/SectionImage/'+id+'.json?include=data_set(genes,reference_space(age))';
	apiQuery(url, onsuccess);
}

function loadReferenceSpaceInfo(ids, onsuccess) {
	var url = apiPath + "data/ReferenceSpace/query.json?" +
		"criteria=[id$in" + ids.join(',') + "]&" +
		"include=age&" +
		"order=ages.days";
	
	apiQuery(url, onsuccess);
}

function initializeImageDiv(div, downsample, sectionInfo, sectionCoord, w, h) {
	var imgUrl = makeCenteredImageUrl(downsample,
									  sectionInfo.path, 
									  sectionInfo.y + sectionCoord.y, 
									  sectionInfo.x + sectionCoord.x,
									  w, h);
	
	div.css('background','no-repeat center url('+imgUrl+')');
}

// Make a simple apiQuery, no handling of pages.
function apiQuery(url, onsuccess) {
	$.ajax(url, { 
		dataType: 'json', 
		success: function(response) { 

			if (response.success)
				onsuccess(response.msg); 
			else
				apiError(response.msg, url);
		},
		error: function(response) { 
			apiError(response.statusText, url); 
		}
	});
}

// A simple catch-all error reporting function.
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

// Sections have pixel resolution (in microns).  The source  section was 
// downsampled by the value of the `downsample` variable, but we may need to use
// a different value for the target if it has a different pixel resolution.
function computeDownsample(sourceResolution, targetResolution, sourceDownsample) {
	var r = sourceResolution / targetResolution;
	return Math.round( sourceDownsample + (Math.log(r)/Math.log(2)) );
}