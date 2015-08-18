var express = require('express');

var app = module.exports = module.parent.exports.setAppDefaults();

/* GET home page. */
app.get('/', function(req, res) {
  res.render(__dirname + '/views/alarme');
});

/* Serve static content */
app.use('/static', express.static(__dirname + '/public'));
