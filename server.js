var express = require('express');
var app = express();
var server = require('http').Server(app);


// Choose your favorite view engine(s)
app.set('view engine', 'jade');

//---- Initialize Socket.io
var io = require('socket.io')(server);
require('decolar-scraper-server')(io);

//---- Mounting well-encapsulated application modules
app.use('/', require('index'));
app.use('/alarme', require('alarme'));

//---- Serve static content
app.use('/public', express.static(__dirname + '/public'));

// Run server
var PORT = process.env.PORT || 5000;
console.log('Running on port: ' + PORT);
server.listen(PORT);
