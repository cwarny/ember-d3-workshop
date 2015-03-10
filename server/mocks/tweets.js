module.exports = function(app) {
  var express = require('express');
  var tweetsRouter = express.Router();

  tweetsRouter.get('/', function(req, res) {
    var options = {
      root: __dirname,
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.sendFile("data.json", options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('File sent');
      }
    });
  });

  tweetsRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  tweetsRouter.get('/:id', function(req, res) {
    res.send({
      'tweets': {
        id: req.params.id
      }
    });
  });

  tweetsRouter.put('/:id', function(req, res) {
    res.send({
      'tweets': {
        id: req.params.id
      }
    });
  });

  tweetsRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/tweets', tweetsRouter);
};
