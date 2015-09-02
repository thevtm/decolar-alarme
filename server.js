var express = require('express');
var app = express();
var server = require('http').Server(app);


server.listen(process.env.PORT);


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
