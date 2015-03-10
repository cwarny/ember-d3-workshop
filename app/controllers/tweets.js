import Ember from "ember";

/* global d3 */

export default Ember.Controller.extend({
	websocket: Ember.inject.service(),

	subscribe: function () {
		var socket = this.get("websocket.socket");
		var _this = this;
		socket.on("tweet", function(tweet) {
			tweet.created_at = d3.time.format("%a %b %d %H:%M:%S %Z %Y").parse(tweet.created_at);
			_this.get("model").pushObject(tweet);
			var old = _this.get("model").reject(function(d) {
				var now = new Date();
				return d.created_at > new Date(now.getTime() - 20*60000);
			});
			if (old.length) _this.get("model").removeObjects(old);
		});
	},

	unsubscribe: function () {
		var socket = this.get("websocket.socket");
		socket.removeAllListeners();
	}
});