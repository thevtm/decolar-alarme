var express = require('express');

console.log(module.parent.filename);

var app = module.exports = module.parent.exports.setAppDefaults();

/* GET home page. */
app.get('/', function(req, res) {
  res.render(__dirname + '/views/index');
});

/* Serve static content */
app.use('/public', express.static(__dirname + '/public'));
