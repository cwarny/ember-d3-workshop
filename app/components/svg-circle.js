import Ember from "ember";

export default Ember.Component.extend({
	tagName: "g",
	attributeBindings: ["transform"],

	transform: function() {
		return "translate(%@,%@)".fmt(this.get("x"), this.get("y"));
	}.property("x", "y"),
	showLabel: false,
	
	mouseEnter: function() {
		this.toggleProperty("showLabel");
	},

	mouseLeave: function() {
		this.toggleProperty("showLabel");
	}
});