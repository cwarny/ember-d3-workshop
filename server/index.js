module.exports = function(app) {
	var io = require("socket.io")(8080);
	var cfg = require("./config.js");
	var tw = require("node-tweet-stream")(cfg);

	tw.track("bieber");

	tw.on("tweet", function(tweet){
		console.log(tweet.id_str);
		io.emit("tweet", tweet);
	});
};