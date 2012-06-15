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

// This page generates a scatter plot of expression values for two gene probes
// from human microarray samples.  Those samples can come from one or more of
// the donors.

// This uses the Modernizr JS library to check to see if the page supports SVG.
// If it does not, throw an error.
if (!Modernizr.svg){
	$('#chartCell').append(
		$('<div>').addClass('svgError')
			.html("This demo requires SVG support. " +
				  "Click <a href='http://caniuse.com/#cats=SVG'>here</a> " + 
				  "to see which browsers support SVG."));
	throw 'SVG not supported';
}

// Variables that define properties of the visualization.  `margin` is the
// number of pixels allotted for annotations (axis labels, etc) around the
// outside of the plot.  `r` is the radius of the circles.  
var margin = 50;
var r = 3;
var numTicks = 10;
var apiPath = "/api/v2/data/query.json";

// The dimensions of the plot are the dimensions of the HTML div element, minus
// the margin size.
var w = $("#chartCell").width()-margin;
var h = $("#chartCell").height()-margin;

// `x` and `y` convert expresion values to pixel position. The domains of these
// scales (the range of expression values) will be computed dynamically later.
var x = d3.scale.linear().range([0,w]);
var y = d3.scale.linear().range([h,0]);

// Initialize the chart element.  The translation transform displaces the
// chart by half the margin size.
var vis = d3.select("#chartCell").append("svg:svg")
	.attr("width", w+margin)
	.attr("height", h+margin)
	.append("svg:g")
	.attr("transform", "translate(" + margin / 2 + "," + margin / 2 + ")");

// Set some default probe ids, but change them if they are specified in the 
// url parameter string.
var probe1 = 1053210;
var probe2 = 1022127;
var donor = null;
var urlVars = getUrlVars();
if ('probe1' in urlVars)
	probe1 =  urlVars['probe1'];
if ('probe2' in urlVars)
	probe2 =  urlVars['probe2'];
if ('donor' in urlVars)
	donor =  urlVars['donor'];

// Initialize the home button and show a loading screen until loading's done.
$("#chartCell").css("background","no-repeat center url(\"../images/loading.gif\")");
$("#homeButton").button({ icons:  {	primary: "ui-icon-home"	}});

// Download the expression data from the API.  If a donor is specified, 
// download expression for just that donor. Otherwise download everything.
var url = apiPath +	"?criteria=service::human_microarray_expression[probes$in"+probe1+","+probe2+"]";

if (donor)	
	url += "[donor$eq"+donor+"]";


// Make the AJAX call that downloads the expression values.  
$.ajax(url, { 
	dataType: 'json', 
	success: function(response) { 
		if (response.success)
			buildScatterPlot(response.msg); 
		else
			apiError(response.msg, url);
	},
	error: function(response) { apiError(response.statusText, url); }
});

// This function lays out the D3 scatter plot.
function buildScatterPlot(data) {

	// Hide the loading image.
	$("#chartCell").css("background", "");

	// Fill the appropriate table elements with probe labels.
	$('<a>').attr('href','http://human.brain-map.org/probes/'+probe1)
		.html(data.probes[0]['gene-symbol'])
		.appendTo("#gene1Label");

	$('<a>').attr('href','http://human.brain-map.org/probes/'+probe2)
		.html(data.probes[1]['gene-symbol'])
		.appendTo("#gene2Label");

	// Build an array to hold the sample data points along with relevant
	// structure and donor information.
	var dataPoints = []
	for (var i=0; i<data.samples.length; i++) {
		var sample = data.samples[i];
		dataPoints.push({ x: data.probes[0].expression_level[i],
						  y: data.probes[1].expression_level[i],
						  structure: sample.structure,
						  donor: sample.donor.name,
						  color: "#"+sample.structure.color });
	}

	// Update the domain of the x and y scales. It can be helpful if the axes
	// have the same domain so that the slope of the line fit to the data
	// points is clearer.
	if (dataPoints.length > 0) {
		var domain = [dataPoints[0].x, dataPoints[0].y];
		for (var i=1; i<dataPoints.length; i++) {
			p = dataPoints[i];
			domain[0] = Math.min(p.x, Math.min(p.y, domain[0]));
			domain[1] = Math.max(p.x, Math.max(p.y, domain[1]));
		}
		domain[0] = Math.floor(domain[0]);
		domain[1] = Math.ceil(domain[1]);
		x.domain(domain);
		y.domain(domain);

		numTicks = domain[1] - domain[0] + 1;

		// don't want there to be too many ticks
		var newTicks = numTicks;
		var factor = .5;
		while (newTicks > 12) {
			newTicks = Math.ceil(numTicks * factor);
			factor *= .5;
		}

		numTicks = newTicks;
	}

	// D3 scales have a `ticks` method that will a specified number of evenly
	// spaced values across the domain of the scale.  Here we create a set of
	// lines for horizontal and vertical ticks as a light background 
	// grid.  You can read the horizontal tick code as follows: "Select all of the 
	// xtick elements and join them to these tick values.  For any new data value 
	// (all of them), append an SVG line element whose horizontal position is 
	// the result of the x scale applied to the data value and whose vertical
	// range spans the height of the graph."
	var axisGroup = vis.append("svg:g").attr("class","axes");
	axisGroup.selectAll("line.xticks").data( x.ticks(numTicks) )
		.enter().append("svg:line")
		.attr("class","xtick")
		.attr("x1", x)
		.attr("y1", 0)
		.attr("x2", x)
		.attr("y2", h)
		.attr("stroke","#eee");

	axisGroup.selectAll("line.yticks").data( y.ticks(numTicks) )
		.enter().append("svg:line")
		.attr("class","ytick")
		.attr("x1", w)
		.attr("y1", y)
		.attr("x2", 0)
		.attr("y2", y)
		.attr("stroke","#eee");

	// These two calls simply add the x and y axes.
	axisGroup.append("svg:line")
		.attr("stroke-width", 3)
		.attr("stroke","gray")
		.attr("x1", 0)
		.attr("y1", h)
		.attr("x2", w)
		.attr("y2", h);

	axisGroup.append("svg:line")
		.attr("stroke-width", 3)
		.attr("stroke","gray")
		.attr("x1", 0)
		.attr("y1", h)
		.attr("x2", 0)
		.attr("y2", 0);

	// Add the scatter plot circles.  Their positions are set by the `cx` and `cy`
	// properties.  We set those attributes by a function that takes a data value
	// and maps its expression values through the `x` and `y` scales.  
	var pointGroup = vis.append("svg:g").attr("class","points");
	pointGroup.selectAll("circle.points").data(dataPoints)
		.enter().append("svg:circle")
		.attr("class", "point")
		.attr("cx",function(d) { return x(d.x); })
		.attr("cy",function(d) { return y(d.y); })
		.attr("r",r)
		.attr("fill",function(d) { return d.color; })
		.on("mouseover", mouseover);

	// Finally, we draw text labels next to the x and y axes that indicate the
	// data values at the tick positions we drew awhile ago.  Note that these
	// positions have to be offset a bit so that they don't actually sit on the
	// axes themselves.
	pointGroup.selectAll("text.xlabels").data( x.ticks(numTicks) )
		.enter().append("svg:text")
		.attr("class","xlabel")
		.attr("x", x)
		.attr("y", h)
		.attr("dx", 0)
		.attr("dy", 10)
		.text( function(d) { return d; });

	pointGroup.selectAll("text.ylabels").data( y.ticks(numTicks) )
		.enter().append("svg:text")
		.attr("class","ylabel")
		.attr("x", 0)
		.attr("y", y)
		.attr("dx", -20)
		.attr("dy", 0)
		.text( function(d) { return d; });

	// When the mouse enters one of the data elements, display its properties
	// and highlight its properties by adding a stroke and making it bigger. We 
	// have to keep track of which element is currently being highlighted so 
	// that we can remove the highlight when it changes.
	var highlightElement = null;
	function mouseover(d)
	{
		$("#structureLabel").html(d.structure.name);
		$("#donorLabel").html(d.donor);
		$("#exp1Label").html(d.x);
		$("#exp2Label").html(d.y);

		var element = d3.select(this);
		element.transition().duration(100)
			.attr("r",r+2)
			.attr("stroke","black");

		if (highlightElement) {
			highlightElement.transition().duration(100)
				.attr("r",r)
				.attr("stroke","none");
		}

		highlightElement = element;
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

// This function splits the URL parameter string into a JavaScript hash.
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
