import Ember from "ember";

/* global d3 */

export default Ember.Controller.extend({
	data: function() {
		var data = this.get("model");
		data.forEach(function(d) {
			d.created_at = d3.time.format("%a %b %d %H:%M:%S %Z %Y").parse(d.created_at);
		});
		return data;
	}.property("model")
});