import Ember from "ember";

/* global d3 */

export default Ember.Component.extend({
	tagName: "svg",
	attributeBindings: ["width", "height"],
	classNames: ["chart"],

	margin: { top: 20, right: 80, bottom: 40, left: 80 }, // See @mbostock's "margin convention": http://bl.ocks.org/mbostock/3019563
	width: 1200,
	height: 600,

	chartW: function() {
		var width = this.get("width"),
			margin = this.get("margin");
		return width - margin.left - margin.right;
	}.property("width"),
	chartH: function() {
		var height = this.get("height"),
			margin = this.get("margin");
		return height - margin.top - margin.bottom;
	}.property("height"),

	transformG: function() {
		var margin = this.get("margin");
		return "translate(%@,%@)".fmt(margin.left, margin.top);
	}.property(),

	transformX: function() {
		return "translate(0,%@)".fmt(this.get("chartH"));
	}.property("chartH"),

	bins: function() {
		var data = this.get("data");
		var M = d3.max(data, function(d) { return d.created_at; });
		var m = d3.min(data, function(d) { return d.created_at; });
		var bins = d3.time.minutes(m, M);
		bins.unshiftObject(d3.time.minute(m));
		bins.pushObject(d3.time.minute(M));
		return bins;
	}.property("data.@each"),

	histogram: function() {
		var bins = this.get("bins"),
			data = this.get("data");
		var values = data.map(function(d) { return d.created_at; });
		return d3.layout.histogram().bins(bins)(values);
	}.property("data.@each", "bins.@each"),

	xScale: function() {
		return d3.scale.ordinal()
			.domain(this.get("bins"))
			.rangeRoundBands([ 0, this.get("chartW") ], .2);
	}.property("chartW", "bins.@each"),

	yScale: function() {
		return d3.scale.linear()
			.domain([ 0, d3.max(this.get("histogram"), function(d) { return d.y; }) ])
			.range([ this.get("chartH"), 0 ]);
	}.property("histogram", "chartH"),

	tickFormat: function() { // https://github.com/mbostock/d3/wiki/Time-Formatting#format_multi
		return d3.time.format.multi([
			[".%L", function(d) { return d.getMilliseconds(); }],
			[":%S", function(d) { return d.getSeconds(); }],
			["%I:%M", function(d) { return d.getMinutes(); }],
			["%I %p", function(d) { return d.getHours(); }],
			["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
			["%b %d", function(d) { return d.getDate() != 1; }],
			["%B", function(d) { return d.getMonth(); }],
			["%Y", function() { return true; }]
		]);
	}.property(),

	xAxis: function() {
		return d3.svg.axis()
			.scale(this.get("xScale"))
			.tickFormat(this.get("tickFormat"))
			.orient("bottom");
	}.property("xScale"),

	yAxis: function() {
		return d3.svg.axis()
			.scale(this.get("yScale"))
			.orient("left");
	}.property("yScale"),

	draw: function() {
		var chartW = this.get("chartW"),
			chartH = this.get("chartH"),
			xAxis = this.get("xAxis"),
			yAxis = this.get("yAxis"),
			xScale = this.get("xScale"),
			yScale = this.get("yScale"),
			svg = d3.select(this.get("element")),
			data = this.get("histogram");

		svg.select(".x-axis-group").call(xAxis);
		svg.select(".y-axis-group").call(yAxis);

		var bar = svg.select(".chart-group").selectAll(".bar")
			.data(data, function(d) { return d.x; });

		bar.exit().remove();

		bar.enter()
			.append("rect")
			.attr("class", "bar")
			.attr("x", function(d) { return xScale(d.x); })
			.attr("y", function(d) { return yScale(d.y); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return chartH - yScale(d.y); });

		bar.transition()
 			.duration(1000)
 			.attr("x", function(d) { return xScale(d.x); })
			.attr("y", function(d) { return yScale(d.y); })
			.attr("width", xScale.rangeBand())
			.attr("height", function(d) { return chartH - yScale(d.y); });

	}.observes("histogram").on("didInsertElement")

});