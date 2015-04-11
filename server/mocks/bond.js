module.exports = function(app) {
  var express = require('express');
  var bondRouter = express.Router();

  bondRouter.get('/', function(req, res) {
    var options = {
      root: __dirname,
      headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
      }
    };
    res.sendFile("bond.json", options, function (err) {
      if (err) {
        console.log(err);
        res.status(err.status).end();
      }
      else {
        console.log('File sent');
      }
    });
  });

  bondRouter.post('/', function(req, res) {
    res.status(201).end();
  });

  bondRouter.get('/:id', function(req, res) {
    res.send({
      'bond': {
        id: req.params.id
      }
    });
  });

  bondRouter.put('/:id', function(req, res) {
    res.send({
      'bond': {
        id: req.params.id
      }
    });
  });

  bondRouter.delete('/:id', function(req, res) {
    res.status(204).end();
  });

  app.use('/api/bond', bondRouter);
};
