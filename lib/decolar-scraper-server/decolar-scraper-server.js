var sio = require('socket.io');
var DecolarScraper = require('../decolar-scraper/decolar-scraper');

var REFRESH_TIME_INTERVAL = 15000;

function setIntervalNow ( fn, delay ) {
  "use strict";

  fn();
  return setInterval( fn, delay );
}

module.exports = function(io) {

  io.on('connection', function(socket) {
    console.log('Usuario conectado.');

    socket.on('Request Scraper', function (url) {
      console.log('Scraper requisitado - ' + url);

          // Inicia scraper
          var intervalID = setIntervalNow(function () {
              // Request data
              DecolarScraper.scrapeDecolarPreco(url)
                .done(function (menorPreco) {
                  // Envia info para o cliente
                  console.log(menorPreco + " " + (new Date()));
                  socket.emit('Recive Scraper', { momento:(new Date()), preco: menorPreco });
                });
          }, REFRESH_TIME_INTERVAL);

          socket.on('disconnect', function () {
            console.log('Usuario desconectado.');
            clearInterval(intervalID);
          });
        });
  });


  return io;
};
