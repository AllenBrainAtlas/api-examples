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

// A an example visualization of connectivity data using the d3 partition and bundle layouts.

// Hard-coded links to the data files to be used in this visualization
var structuresFile = "../structures/all.structures.json";
var connFile = "../structures/all.connections.json";

if (!Modernizr.svg){
	$('#chart').append(
		$('<div>').addClass('svgError')
			.html("This demo requires SVG support. " +
				  "Click <a href='http://caniuse.com/#cats=SVG'>here</a> " + 
				  "to see which browsers support SVG."));
	throw 'SVG not supported';
}

// Constants that control properties of the visualization:
//
// * `w,h`: width/height of the visualization in pixels  
// * `outerPct`: percent of radial pixel width for the ontology visualization
// * `colorRange`: color range corresponding to `corrDomain`
// * `opacityRange`: opacity range corresponding to `corrDomain`
// * `fadedOpacityRange`: opacity range for non-highlighted lines
// * `highlightOpacityRange`: opacity range for highlighted lines
// * `tensionRange`: line tension range corresponding to the angular
//                   distance between structures in the ontology visualization.
//                   Nearby structures are less tense, so they don't project as far
//                   into the visualization.
// * `transitionTime`: transition duration in milliseconds.
// * `fastTransitionTime`: transition duration for faster transitions.
// * `rootStructureId`: the database ID of the root of the mouse ontology.

var w = $("#chart").width();
var h = $("#chart").height();
var r = Math.min(w, h) / 2;
var outerPct = .30;
var colorRange = ["green","blue"];
var opacityRange = [.1,0.2];
var fadedOpacityRange = [0, .05];
var highlightOpacityRange = [.4,0.7];
var tensionRange = [0,.99];
var transitionTime = 1000;
var fastTransitionTime = 200;
var rootStructureId = 8;

// Scales for interpolating a range of colors/angles/values/etc
//
// * `x`: interpolates unitless [0,1] to radians [0,2pi].
// * `y`: interpolate [0,1] to outside-in in the outer ring (ontology vis.).
// * `iy`: interpolate [0,1] to inside-out in the inner circle (link vis.).
// * `distScale`: convert [-1,1] `x` distances into non-negative distances.
// * `connColorScale`: correlation colors.
// * `connOpacityScale`: correlation opacities.
// * `connFadedOpacityScale`: correlation opacities, not highlighted.
// * `connHighlightOpacityScale`: correlation opacities, highlighted.
// * `connTensionScale`: node separation mapped to line tension.

var x = d3.scale.linear().range([0, 2 * Math.PI]);
var y = d3.scale.linear().range([r, r*(1.0 - outerPct)]);
var iy = d3.scale.linear().range([0, r*(1.0 - outerPct)]);
var distScale = d3.scale.linear().clamp(true)
    .domain([-1,-.5,0,.5,1]).range([0,.5,0,.5,0]);

var connColorScale = d3.scale.linear().clamp(true).range(colorRange);
var connOpacityScale = d3.scale.linear().clamp(true).range(opacityRange);
var connFadedOpacityScale = d3.scale.linear().clamp(true).range(fadedOpacityRange);
var connHighlightOpacityScale = d3.scale.linear().clamp(true).range(highlightOpacityRange);
var connTensionScale = d3.scale.sqrt().clamp(true).domain([0,.5]).range(tensionRange);

// jQuery'd variables representing html buttons and labels.  

var structureLabel = $("#structureLabel");
var volumeLabel = $("#volumeLabel");
var corrLabel = $("#corrLabel");
var connectionFromLabel = $("#connectionFromLabel");
var connectionToLabel = $("#connectionToLabel");
var scaleButtonContainer = $("#scaleButtons");

// Fill the `scaleButtonContainer` with a set of radio buttons that control the
// size distribution of leaves in the ontology.

var scaleOptions = [{ name: 'volume', id: "#volumeButton", fn: volumeValue },
					{ name: 'uniform', id: "#uniformButton", fn: uniformValue }];

$.each(scaleOptions, function(index, button) {
	var name = button.name;
	scaleButtonContainer.append($(document.createElement('input'))
								.attr('type','radio')
								.attr('id',name+'Button')
								.attr('name','scaleRadio')
								.attr('value',name)
								.attr('checked',name=='uniform'));

	scaleButtonContainer.append($(document.createElement('label'))
								.attr('for',name+'Button')
								.html(name));
});

scaleButtonContainer.buttonset();
scaleButtonContainer.css("font-size",8);

$("#homeButton").button({ icons: { primary: "ui-icon-home" }});

// These are the functions used to scale the structure arcs.

function volumeValue(d) { return d.volume; }

function uniformValue(d) { return 1; }

// Construct the basic chart element, append an svg element and transform it.

var vis = d3.select("#chart").append("svg:svg")
    .attr("width", w)
    .attr("height", h)
	.append("svg:g")
    .attr("transform", "translate(" + w / 2 + "," + h / 2 + ")");

// Construct the d3 visualization algorithm objections. `partition` handles
// the ontology layout, `bundle` the hierarchical edge bundling line layout.
//
// The `partition` layout builds a JS ontology representation, each element
// having `x` and `dx` properties in [0,1] that define the space the structure
// consumes in the layout.  Each element also has `y` and `dy` properties in
// [0,1] that describe how high up the hierarchy they are.  The `arc` method
// maps the "horizontal" properties to radians and the "vertical" properties
// to radial pixel length for the circular layout.
//
// The `bundle` layout takes an array of structure-structure connections and 
// interjects nodes corresponding to the nodes on the shortest path between 
// the leaves in the hierarchy. `connectionLine` looks at given node and
// determines if the line should touch the ontology visualization 
// (e.g. leaves) or be routed through virtual control points in the middle
// of the circle (e.g. parents). 

var partition = d3.layout.partition()
    .sort(function(a,b) { return b.graph_order - a.graph_order; })
    .value(uniformValue);

var bundle = d3.layout.bundle();

var arc = d3.svg.arc()
    .startAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x))); })
    .endAngle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.x + d.dx))); })
    .innerRadius(function(d) { return Math.max(0, y(d.y)); })
    .outerRadius(function(d) { return Math.max(0, y(d.y + d.dy)); });

var connectionLine = d3.svg.line.radial()
	.interpolate("bundle")
	.radius(function(d) { return d.terminal ? 
						  Math.max(0, y(d.node.y + d.node.dy)) :
						  Math.max(0, iy(d.node.y + d.node.dy)); })

	.angle(function(d) { return Math.max(0, Math.min(2 * Math.PI, x(d.node.x + .5*d.node.dx))); });

// initialize some globals that will be defined once the data is loaded.

var nodes = null;
var links = null;
var bundledLinks = null;
var connections = null;
var arcs = null;
var lines = null;

// #### Load the data and lay out the SVG elements.
//
// This is asynchronous, so the second argument to each `d3.json` call is a 
// function that will be called once the data is loaded.

d3.json(structuresFile, function(structures) {

	// Build a hash from structure id to structure.  Make parent-child 
	// relationships explicit.
	var structureHash = {};
	for (var i=0; i<structures.length; i++) {
		var s = structures[i];
		s.children = [];
		structureHash[s.id] = s;
	}



	for (var i = 0; i < structures.length; i++) {
		var s = structures[i];
		var numParents = s.structure_id_path.length - 1;
		if (numParents > 0) {
			var parentId = s.structure_id_path[numParents-1];
			structureHash[parentId].children.push(s);
		}
	}

	// This is the root node of the ontology.
	var structureTree = structureHash[rootStructureId];

	// Read in the connection file.
	d3.json(connFile, function(connData) {

		// Transform the connections so that source and target actually point 
		// to structures rather than structure IDs.
		connections = connData.map(function(c) {
			return {
				source: structureHash[c.source],
				target: structureHash[c.target],
				corr: c.corr
			};
		});

		// Compute the minimum and maximum correlation values and update the 
		// scales accordingly.
		updateCorrelationDomain(
			connections.reduce(function(r,c) { 
				return [Math.min(c.corr,r[0]), Math.max(c.corr,r[1])] 
			}, [10,-10]));

		// Filter out connections from child to parent or vice-versa.
		connections = connections.filter(function(c) {
			return !childOf(c.source,c.target) && !childOf(c.target,c.source)
		});

		// Supply the partition algorithm with the ontology, add
		// an svg group to the chart to hold the structure arcs,
		// and draw them.
		nodes = partition.nodes(structureTree);
		vis.append("svg:g").attr("class","arc");
		redrawArcs();

		// Add a property to the connections -- angular distance on the plot.
		for (var i=0; i<connections.length; i++) {
			var c = connections[i];
			var src = c.source;
			var trg = c.target;

			c.dist = distScale((src.x+.5*src.dx) - (trg.x+.5*trg.dx));
		}

		// Flatten the ontology into arrays separated by ontology depth, then   
		// use this to pool connnections up the ontology. Finally layout the
		// connections.
		vis.append("svg:g").attr("class","line");

		redrawLines();

		// Register Click event handlers for buttons that determine if 
		// structure arcs are scaled uniformly or by their volume.

		$.each(scaleOptions, function(index, button) {
			$(button.id).click(function() {
				arcs.data(partition.value(button.fn).nodes(structureTree))
					.style("fill", arcColor)
					.style("stroke", arcStroke)
					.style("stroke-width", arcStrokeWidth)
					.transition()
					.duration(transitionTime)
					.attrTween("d",dataTween);
				
				redrawLines();
			});
		});
	});
});

// A function handler for interpolating between the scales.  Currently not used.

function arcTween(d) {
	var xd = d3.interpolate(x.domain(), [d.x, d.x + d.dx]);
	
	return function(d, i) {
		return i ?
			function(t) { return arc(d); } :
        function(t) { x.domain(xd(t)); return arc(d); };
	};
}

// Add properties to an element that cache their current position and width.

function stash(d) {
	d.x0 = d.x;
	d.dx0 = d.dx;
}

// Interpolate the arcs in data space.

function dataTween(d) {
	var i = d3.interpolate({x: d.x0, dx: d.dx0}, d);

	return function(t) {
		var b = i(t);
		d.x0 = b.x;
		d.dx0 = b.dx;

		return arc(b);
	};
}

// ### Methods for drawing lines
//
// Draw the connection curves.  

function redrawLines() {
	// If there are no bundled links yet, they need to be built.
	if (!bundledLinks) {
		bundledLinks = bundle(connections);

		// This is called a "data join." Within the group 'line', path elements
		// are joined to data supplied in the `bundledLinks` array.  The data
		// join returns all of the existing elements, for which update their
		// layout.  The opacity transition makes sure that any existing elements
		// fade in smoothly.

		lines = vis.selectAll("g.line").selectAll("path")
			.data(bundledLinks)
			.attr("d", lineLayout)
			.style("opacity",0);

		lines.transition()
			.duration(fastTransitionTime)
			.style("opacity",lineOpacity);


		// The `enter` method is called when paths are first added, which
		// is a good time to set their shape and color properties.  The
		// transition at the end ensures that they fade in smoothly.

		lines.enter().append("svg:path")
			.attr("d", lineLayout)
			.style("fill","none")
			.style("opacity", 0)
			.style("stroke", lineColor)
			.style("stroke-width", 1)
			.on("mouseover", lineMouseOver)
			.on("mouseout", lineMouseOut)
			.transition()
			.duration(fastTransitionTime)
			.style("opacity",lineOpacity);			

		// The 'exit' method is called whenever data elements are removed (which
		// happens when the number of nodes has changed).  The transition fades 
		// them out before they actually get removed from the DOM.

		lines.exit().transition()
			.duration(fastTransitionTime)
			.style("opacity",0)
			.remove();

	} else {

		// this is a transition.  d3 makes this very easy, for CSS properties
		// that are easy to interpolate, just supply the data, call for a 
		// transition, and tell it what property is changing.

		vis.selectAll("g.line").selectAll("path")
			.data(bundledLinks)
			.transition()
			.duration(transitionTime)
			.attr("d", lineLayout)
			.style("stroke", lineColor)
			.style("opacity",lineOpacity);
	}
}

// This function takes a connection (`d`), which is an array of structure 
// elements, and returns an svg path.  The tension of that path is lower
// if the two structures are radially close to each other.

function lineLayout(d,i) {
	var c = connections[i];

	if (c.source.id == c.target.id)
		return null;

	var tension = connTensionScale(c.dist);

	td = d.map(function(di) { return { node: di, terminal: di == c.source || di == c.target }; });

	return connectionLine.tension(tension)(td);
}

// Map a connection to a color

function lineColor(d,i) {
	return connColorScale(connections[i].corr);
}

// Map a connection to an opacity

function lineOpacity(d,i) {
	return connOpacityScale(connections[i].corr);
}

// Map a connection to an opacity, fade out elements that are not children of
// the supplied parent.

function lineStructureHighlightOpacity(d,parent,i) {
	if (childOf(d[0],parent) || childOf(d[d.length-1],parent))
		return connHighlightOpacityScale(connections[i].corr);
	else
		return connFadedOpacityScale(connections[i].corr);
}

// Determine if a function is a child of another node by moving up the ontology.

function childOf(node,parent) {
	while (node) {
		if (node.id == parent.id)
			return true;
		node = node.parent;
	}
	return false;
}

// Map a connection to an opacity, fade out lines that don't start and end
// at the same location as the supplied line.

function lineHighlightOpacity(d,line,i) {
	if (d[0].id == line[0].id &&
		d[d.length-1].id == line[line.length-1].id) 
		return connHighlightOpacityScale(connections[i].corr);
	else
		return connFadedOpacityScale(connections[i].corr);
}

// Highlight a line as the user mouses over it.

function lineMouseOver(d,i) {
	connectionFromLabel.html(d[0].name);
	connectionToLabel.html(d[d.length-1].name);
	corrLabel.html(connections[i].corr);

	lines.transition().duration(fastTransitionTime)
		.style("opacity", function(datum,i) { return lineHighlightOpacity(datum, d, i); });
}

// Go back to regular opacity when not mousing over a line.

function lineMouseOut(d) {
	connectionFromLabel.html("");
	connectionToLabel.html("");
	corrLabel.html("");

	lines.transition().duration(fastTransitionTime)
		.style("opacity",lineOpacity);
}

// ### Methods for drawing arcs
//
// Remove all existing structure arcs and draw thm again.

function redrawArcs() {
	// lay out the structure arcs
	vis.selectAll("g.arc").selectAll("path").remove();

	arcs = vis.selectAll("g.arc").selectAll("path")
		.data(nodes)
		.enter().append("svg:path")
		.attr("d", arc)
		.style("fill", arcColor)
		.style("stroke", arcStroke)
		.style("stroke-width", arcStrokeWidth)
		.on("mouseover", arcMouseOver)
		.on("mouseout", arcMouseOut)
		.each(stash);
}

// Clear all highlight information when the mouse leaves an arc.

function arcMouseOut(d) {
	structureLabel.html("");
	volumeLabel.html("");

	if (lines) {
		lines.transition().duration(fastTransitionTime)
			.style("opacity",lineOpacity);
	}
}

// When the mouse is over an arc, describe its corresponding structure and
// highlight all of the lines entering or leaving it and its children.

function arcMouseOver(d) { 
	structureLabel.html(d.name);
	volumeLabel.html(d.volume);

	if (lines) {
		lines.transition().duration(fastTransitionTime)
			.style("opacity",function(datum,i) { return lineStructureHighlightOpacity(datum, d,i); })
	}
}

// Map a structure to a color.

function arcColor(d) {
	if (d.depth > 0)
		return "#" + d.color_hex_triplet;
	else
		return "#fff";
}

// Map a sturcture to an opacity.

function arcOpacity(d) {
	return 1;
}

// White outlines for the structure arcs.

function arcStroke(d) {
	return "#fff";
}

// How wide of an outline to draw for each arc.

function arcStrokeWidth(d) {
	return "1px";
}					   

// Update the domain of all of the interpolation scales.

function updateCorrelationDomain(corrDomain) {
	connColorScale.domain(corrDomain);
	connOpacityScale.domain(corrDomain);
	connFadedOpacityScale.domain(corrDomain);
	connHighlightOpacityScale.domain(corrDomain);
}


