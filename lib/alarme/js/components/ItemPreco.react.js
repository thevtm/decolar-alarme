var React = require('react');
var ReactPropTypes = React.PropTypes;
var FormataDinheiro = require('../util/formata-dinheiro.js');

var ItemPreco = React.createClass({
  render: function() {
    var p = this.props;
    var d = p.momento;
    var menorPreco = p.preco[0];
    var preco = FormataDinheiro(menorPreco.raw.amount, menorPreco.formatted.mask);
    return (
      <li className="itemPreco">
        { d.getDay() + '/' + d.getMonth() + '/' + (d.getYear() + 1900) + ' - ' + d.getHours() + ':' + d.getMinutes() + ':' + d.getSeconds() } - { preco }
      </li>
    );
  }
});

module.exports = ItemPreco;
