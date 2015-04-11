import Ember from "ember";

export default Ember.Controller.extend({
	data: function() {
		var yDim = this.get("yDim");
		var data = this.get("model").map(function(d) {
			return {
				x: +d.Year,
				y: +d[yDim],
				r: +d[yDim],
				type: d["Bond actor"],
				label: d.Film
			}
		});
		debugger;
		return data;
	}.property("model", "yDim"),

	yDim: "Bond kills",

	actions: {
		changeY: function() {
			this.set("yDim", this.get("yDim") == "Bond kills" ? "Others' kills" : "Bond kills");
		}
	}
});