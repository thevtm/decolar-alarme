var AlarmeActions = require('./actions/AlarmeActions');

var React = require('react');
var AlarmeApp = require('./components/AlarmeApp.react');

React.render(
  <AlarmeApp />,
  document.getElementById('alarmeapp')
);

//---- Socket.IO
function urlParam (name) {
    var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
    if (results === null) {
       return null;
    } else {
       return results[1] || 0;
    }
}

var socket = io();
url = unescape(urlParam('url'));

socket.on('connect', function () {
    if(url === null) {
        return;
    }

    console.log('Scraper requisitado - ' + url);
    socket.emit('Request Scraper', url);
});


socket.on('Recive Scraper', function(data) {
    console.log('Scraper recebido - ' + JSON.stringify(data));
    AlarmeActions.recebePreco(data);
});

socket.on('Error Scraper', function(err) {
  console.log(JSON.stringify(err));
  AlarmeActions.recebeError(err);
});
