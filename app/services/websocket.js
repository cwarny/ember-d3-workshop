import Ember from 'ember';

/* global io */

export default Ember.Service.extend({
	_setup: function () {
		this.socket = io(`${window.location.hostname}:8080`);
	}.on("init"),

	send: function(message) {
		this.socket.emit("message", message);
	}
});