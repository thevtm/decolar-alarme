var React = require('react');
var ReactPropTypes = React.PropTypes;

var AlarmeError = React.createClass({
  render: function() {
    var p = this.props;
    var e = p.error;
    return (
      <li className="alarmeError">
        { e.message }
      </li>
    );
  }
});

module.exports = AlarmeError;
