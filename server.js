var express = require('express');
var server = require('nodebootstrap-server');

server.setup(function(runningApp) {

  // runningApp.use(require('express-session')({secret: CONF.app.cookie_secret, resave: false, saveUninitialized: false}));

  // Choose your favorite view engine(s)
  runningApp.set('view engine', 'jade');

  //// you could use two view engines in parallel (if you are brave):
  // runningApp.set('view engine', 'j2');
  // runningApp.engine('j2', require('swig').renderFile);

  //---- Initialize Socket.io
  var io = require('socket.io')(runningApp.http);
  require('decolar-scraper-server')(io);

  //---- Mounting well-encapsulated application modules
  //---- See: http://vimeo.com/56166857

  runningApp.use('/hello', require('hello')); // attach to sub-route
  runningApp.use(require('routes')); // attach to root route
  runningApp.use('/', require('index'));
  runningApp.use('/alarme', require('alarme'));

  //---- Serve static content
  runningApp.use('/public', express.static(__dirname + '/public'));


  // If you need websockets:
  // var socketio = require('socket.io')(runningApp.http);
  // require('fauxchatapp')(socketio);

});
