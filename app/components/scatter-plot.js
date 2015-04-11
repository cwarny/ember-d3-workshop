import Ember from "ember";

export default Ember.Component.extend({
	tagName: "svg",
	attributeBindings: ["width", "height"],

	margin: { top: 20, right: 80, bottom: 40, left: 80 },
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

	xScale: function() {
		return d3.scale.linear()
			.domain(d3.extent(this.get("data"), function(d) { return d.x; }))
			.range([ 0, this.get("chartW") ]);
	}.property("data", "chartW"),

	yScale: function() {
		return d3.scale.linear()
			.domain(d3.extent(this.get("data"), function(d) { return d.y; }))
			.range([ this.get("chartH"), 0 ]);
	}.property("data", "chartH"),

	rScale: function() {
		return d3.scale.linear()
			.domain(d3.extent(this.get("data"), function(d) { return d.r; }))
			.range([ 5, 20 ]);
	}.property("data", "chartH"),

	cScale: function() {
		return d3.scale.category10()
			.domain(this.get("data").mapBy("type").uniq());
	}.property("data", "chartH"),

	xAxis: function() {
		return d3.svg.axis()
			.scale(this.get("xScale"))
			.tickFormat(d3.format("d"))
			.orient("bottom");
	}.property("xScale"),

	yAxis: function() {
		return d3.svg.axis()
			.scale(this.get("yScale"))
			.orient("left");
	}.property("yScale"),

	renderedData: function() {
		var xScale = this.get("xScale"),
			yScale = this.get("yScale"),
			rScale = this.get("rScale"),
			cScale = this.get("cScale");

		var data = this.get("data").map(function(d) {
			return {
				x: xScale(d.x),
				y: yScale(d.y),
				r: rScale(d.r),
				color: cScale(d.type),
				label: d.label
			}
		});

		debugger;

		return data;
	}.property("data"),

	didInsertElement: function() {
		var svg = d3.select(this.get("element"));
		svg.select(".x-axis-group").call(this.get("xAxis"));
		svg.select(".y-axis-group").call(this.get("yAxis"));
	}
});