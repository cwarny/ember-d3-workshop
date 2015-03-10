import Ember from "ember";

export default Ember.Route.extend({
	model: function () {
		return [];
	},
	activate: function () {
		this.controllerFor("tweets").subscribe();
	},
	deactivate: function () {
		this.controllerFor("tweets").unsubscribe();
 	}
});