var React = require('react');
var ReactPropTypes = React.PropTypes;
var R = require('ramda');

var ItemPreco = require('./ItemPreco.react');


var ListaPrecos = React.createClass({
  render: function() {
    var itemsPrecosNodes = R.map(function (item) {
      return (
        <ItemPreco key={item.id} momento={item.momento} preco={item.MenorPreco} />
      );
    }, this.props.data);

    return (
      <div id="scroll">
        <ul className="listaPrecos">
          { itemsPrecosNodes }
        </ul>
      </div>
    );
  }
});

module.exports = ListaPrecos;
