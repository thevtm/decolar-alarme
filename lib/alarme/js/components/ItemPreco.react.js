var React = require('react');
var ReactPropTypes = React.PropTypes;
var FormataDinheiro = require('../util/formata-dinheiro.js');

var ItemPreco = React.createClass({
  render: function() {
    var p = this.props;
    var menorPreco = p.preco[0];
    var preco = FormataDinheiro(menorPreco.raw.amount, menorPreco.formatted.mask);
    return (
      <li className="itemPreco">
        { p.momento } - { preco }
      </li>
    );
  }
});

module.exports = ItemPreco;
