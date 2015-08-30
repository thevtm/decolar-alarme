var React = require('react');
var R = require('ramda');
var FormataDinheiro = require('../util/formata-dinheiro.js');
var AlarmeStore = require('../stores/AlarmeStore');
var ListaPrecos = require('./ListaPrecos.react');
var AlarmeError = require('./AlarmeError.react');
var GraficoPreco = require('./GraficoPreco.react');



/**
 * Retrieve the current Alarme data from the AlarmeStore
 */
function getAlarmeState() {
  return {
    allAlarme: AlarmeStore.getAlarmes(),
    error: AlarmeStore.getError(),

    applyPreco: function (fn) {
      try {
        // Caso não tenha recebido dados ainda retorna NaN.
        if(this.allAlarme === undefined || this.allAlarme.length < 1) {
          return Number.NaN;
        }

        // Obtem o ultimo preço recebido.
        var preco = fn(this.allAlarme);

        // Formata o preço para dinheiro.
        return FormataDinheiro(preco.raw.amount, preco.formatted.mask);

      } catch (err) {
        console.error(err);
        return Number.NaN;
      }
    },

    getUltimoPreco: R.pipe(R.head, R.prop('preco'), R.head),

    /**
      * Retorna o ultimo preço formatado.
      * @return {Number}
      */
    getUltimoPrecoFormatado: function () {
      return this.applyPreco(this.getUltimoPreco);
    },

    menorPreco: R.minBy(R.path(['raw', 'amount'])),

    /**
      * Retorna menor preço.
      * @return {Number}
      */
    getMenorPreco: function () {
      var self = this;
      return this.applyPreco(function (alarmes) {
        var precos = R.map(R.pipe(R.prop('preco'), R.head), alarmes);
        return R.reduce(self.menorPreco, R.head(precos), precos);
      });
    }
  };
}


var AlarmeApp = React.createClass({

  getInitialState: function() {
    return getAlarmeState();
  },

  componentDidMount: function() {
    AlarmeStore.addChangeListener(this._onChange);
  },

  componentWillUnmount: function() {
    AlarmeStore.removeChangeListener(this._onChange);
  },

  /**
   * @return {object}
   */
  render: function() {
    var error = this.state.error;
    console.log('Error: ' + error);

    if ( error ) {
      return (
        <AlarmeError error={ error } />
      );
    } else {
      return (
        <div>
          <h1> Decolar Alarme </h1>
          <p> Ultimo preço: { this.state.getUltimoPrecoFormatado() } </p>
          <p> Menor preço: { this.state.getMenorPreco() } </p>
          <GraficoPreco data={ this.state.allAlarme } />
          <h2> Precos </h2>
          <ListaPrecos data={ this.state.allAlarme } />
        </div>
      );
    }
  },

  /**
   * Event handler for 'change' events coming from the AlarmeStore
   */
  _onChange: function() {
    this.setState(getAlarmeState());
  }

});

module.exports = AlarmeApp;
