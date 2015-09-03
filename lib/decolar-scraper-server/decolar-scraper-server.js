var sio = require('socket.io');
var DecolarScraper = require('../decolar-scraper/decolar-scraper');
var bunyan = require('bunyan');

/*---- Logger ----*/
var log = bunyan.createLogger({
  name:"decolar-scraper-server"
});

/*---- Const ----*/
var REFRESH_TIME_INTERVAL = 15000;

function setIntervalNow ( fn, delay ) {
  "use strict";

  fn();
  return setInterval( fn, delay );
}

module.exports = function(io) {
  log.info('Intervalo entre scrapers: %s milisegundos', REFRESH_TIME_INTERVAL);

  io.on('connection', function(socket) {
    log.info('Usuario conectado.', {session:socket.id});

    socket.on('Request Scraper', function (url) {
      log.info('Scraper requisitado.', {session:socket.id, url:url});

          // Inicia scraper
          var intervalID = setIntervalNow(function () {
              // Request data
              DecolarScraper.scrapeDecolarPreco(url)
                .done(function (menorPreco) { // Solicitação bem sucedida
                  // Envia info para o cliente
                  var data = { momento:(new Date()), preco: menorPreco };

                  log.info('Menor preço enviado para cliente.',
                    {session:socket.id, data:data});

                  socket.emit('Recive Scraper', data);

                }, function (err) { // Caso de algum erro

                  if (err instanceof DecolarScraper.URLDecolarInvalidaError) {
                    log.warn(err);
                    socket.emit('Error Scraper', err);
                    clearInterval(intervalID);

                  } else if (err instanceof DecolarScraper.RequestStatusNotOKError) {
                    log.error(err);
                    socket.emit('Error Scraper', err);
                    clearInterval(intervalID);

                  } else {
                    log.error(err);
                    socket.emit('Error Scraper', new Error('Ocorreu um erro inesperado.'));
                    clearInterval(intervalID);
                  }
                });
          }, REFRESH_TIME_INTERVAL);

          socket.on('disconnect', function () {
            log.info('Usuario desconectado.', {session:socket.id});
            clearInterval(intervalID);
          });
        });
  });


  return io;
};
