var React = require('react');
var ReactPropTypes = React.PropTypes;
var FormataDinheiro = require('../util/formata-dinheiro');
var FormatDate = require('../util/format-date');

var ItemPreco = React.createClass({
  render: function() {
    var p = this.props;
    var momento = FormatDate(p.momento, 'dd/mm/yy HH:MM:ss');
    var menorPreco = p.preco[0];
    var preco = FormataDinheiro(menorPreco.raw.amount, menorPreco.formatted.mask);
    return (
      <li className="itemPreco">
        { momento } - { preco }
      </li>
    );
  }
});

module.exports = ItemPreco;
