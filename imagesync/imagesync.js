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

// All adult mouse images have the same maximum resolution (physical pixel size), but 
// but they do not have the same dimensions.  For presentation, we have resampled
//  the original images at multiple lower resolutions all the way down to a
// 256x256 thumbnail.  The number of tiers in this image pyramid depends
// on the original dimensions of the image.  
//
// When making requests to the imageservice, the `downsample` parameter determines
// what tier/resolution will be returned.  `downsample=0` returns the largest
// image, but because there may be a different number of tiers for each
// image, those thumbnails may have different resolutions (physical pixel size).

var downsample = 4;
var w = 285;
var h = 285;

// Specify default image ids to show, and change them as requested in the 
// url parameter string.

var id1 = 69855739; // adora2a
var id2 = 71920507; // rasd
var atlasId = 2;    // p56, sagittal

var urlVars = getUrlVars();
if ('id1' in urlVars)
	id1 = urlVars.id1;
if ('id2' in urlVars)
	id2 = urlVars.id2;
if ('atlasId' in urlVars)
	atlasId = urlVars.atlasId;

// Build the jQuery reload button. When clicked, call `reloadImages`.  Also, 
// format the page a bit.
$('#reloadButton').button().click(reloadImages);
$('#image1Anchor').html(id1).attr("href","http://mouse.brain-map.org/experiment/show/"+id1);
$('#image2Anchor').html(id2).attr("href","http://mouse.brain-map.org/experiment/show/"+id2);
$('#image1').width(w).height(h);
$('#image2').width(w).height(h);
$('#referenceNissl').width(w).height(h);
$('#referenceAnnot').width(w).height(h);
$("#homeButton").button({ icons: { primary: "ui-icon-home" }});

// Load the images first time the page is loaded.
reloadImages();

function reloadImages() {

	// First load the meta-data related to the first image id
	loadImageInfo(id1, function(dataSet) {

		// Results always come back as an array, even if there's only one result.
		dataSet = dataSet[0];
		$('#image1Anchor').html(dataSet.genes[0].acronym);

		// Section Data Sets are composed of many section images.  For this demo,
		// we'll just grab a random section image from id1's section image list.
		var r = Math.floor(Math.random() * dataSet.section_images.length);
		var sectionImage1 = dataSet.section_images[r];

		// Get the central coordinate of the image.
		var cx1 = Math.floor(sectionImage1.width*.5);
		var cy1 = Math.floor(sectionImage1.height*.5);

		var img1Url = makeCenteredImageUrl(downsample, 
										   sectionImage1.path, 
										   sectionImage1.y + cy1, 
										   sectionImage1.x + cx1,
										   w, h);

		// Add the img to the relevant div.
		$('#image1').css('background','no-repeat center url('+img1Url+')');
		
		// Take the center pixel index from our cropped image region and make 
		// an `image_to_image` API request to figure out where the corresponding
		// image coordinate is in a second Section Data Set.
		imageToImage(cx1, cy1, sectionImage1.id, id2, function(coords) {

			coords = coords[0].image_sync;

			var cx2 = coords.x;
			var cy2 = coords.y;
			var sectionNum = coords.section_number;
			
			// Load the meta data for the second image.
			loadImageInfo(id2, function(dataSet) {
				
				// Results always come back as an array, if if there's only one result.
				dataSet = dataSet[0];

				$('#image2Anchor').html(dataSet.genes[0].acronym);

				// The `image_to_image` request returned a section number --
				// find the section image with that section number.
				var sectionImage2 = null;
				for (var i=0; i<dataSet.section_images.length; i++) {
					var s = dataSet.section_images[i];
					if (s.section_number == sectionNum)
						sectionImage2 = s;
				}

				// Figure out the best downsample, comparing source/target resolutions.
				var targetDownsample = computeDownsample(sectionImage1.resolution, 
														 sectionImage2.resolution, 
														 downsample);

				// Build the imageservice url for the new image, add it to the div.
				var img2Url = makeCenteredImageUrl(targetDownsample, 
												   sectionImage2.path, 
												   sectionImage2.y + cy2, 
												   sectionImage2.x + cx2,
												   w, h);
	    		
				$('#image2').css('background','no-repeat center url('+img2Url+')');
			});
		});

		// Take that same center pixel coordinate from the first image and figure
		// out what pixel it corresponds to the in the ABA reference atlas using
		// the `image_to_atlas` method.
		imageToAtlas(cx1, cy1, sectionImage1.id, atlasId, function(coords) {

			coords = coords.image_sync;

			var cx2 = coords.x;
			var cy2 = coords.y;
			var referenceImageId = coords.section_image_id;

			// Load the atlas image meta data.
			loadAtlasImageInfo(coords.section_image_id, function(atlasImage) {

				// Results always come back as an array, even if there's only one result.
				atlasImage = atlasImage[0];

				// Build a URL to the atlas Nissl.
				var nisslUrl = makeCenteredImageUrl(downsample, 
													atlasImage.path, 
													atlasImage.y + cy2, 
													atlasImage.x + cx2, 
													w, h);

				$('#referenceNissl').css('background','no-repeat center url('+nisslUrl+')');

				// Annotated Nissl images are also available in the 
				// `alternate_images` variable. The alternate_images variable
				// could also contain an expression mask, so make sure we get
				// the path to the atlas image.
				var atlasPath = "";
				for (var i=0; i<atlasImage.alternate_images.length; i++) {
					var altImage = atlasImage.alternate_images[i];

					if (altImage.image_type.indexOf("Atlas") == 0)
						atlasPath = altImage.path;
				}
				
				if (atlasPath) {
					// Figure out the best downsample, comparing source/target resolutions.
					var targetDownsample = computeDownsample(sectionImage1.resolution, 
															 atlasImage.resolution, 
															 downsample);

					var annotUrl = makeCenteredImageUrl(targetDownsample,
														atlasPath,
														atlasImage.y + cy2, 
														atlasImage.x + cx2, 
														w, h);
					
					$('#referenceAnnot').css("background","no-repeat center url("+annotUrl+")");
				}
			});
		});
	});
}

// Load the meta data for a image based on its SectionDataSetId.
function loadImageInfo(id,onsuccess) {
    var url = apiPath + 'data/SectionDataSet/'+id+'.json?include=section_images,genes';
	
    apiQuery(url, onsuccess);
}

// Find the pixel and section index in one SectionDataSet corresponding to a 
// pixel location in a section image.
function imageToImage(x, y, fromSectionImageId, toSectionDataSetId, onsuccess) {
    var url = apiPath + 'image_to_image/' + fromSectionImageId + '.json' +
		'?x=' + x +
		'&y=' + y + 
		'&section_data_set_ids=' + toSectionDataSetId;
	apiQuery(url, onsuccess);
}

// This is very similar to `loadImageInfo`, except that it also includes the 
// `alternate_images` paths, which point to the annotated Nissl images.
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

// Sections have pixel resolution (in microns).  The source  section was 
// downsampled by the value of the `downsample` variable, but we may need to use
// a different value for the target if it has a different pixel resolution.

function computeDownsample(sourceResolution, targetResolution, sourceDownsample) {
	var r = sourceResolution / targetResolution;
	return Math.round( sourceDownsample + (Math.log(r)/Math.log(2)) );
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
		error: function(response) { apiError(response.statusText, url); }
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