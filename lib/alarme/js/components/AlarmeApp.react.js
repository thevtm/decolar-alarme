var React = require('react');
var AlarmeStore = require('../stores/AlarmeStore');
var ListaPrecos = require('./ListaPrecos.react');



/**
 * Retrieve the current Alarme data from the AlarmeStore
 */
function getAlarmeState() {
  return {
    allAlarme: AlarmeStore.getAlarmes()
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
    return (
      <div>
        <h1> Precos </h1>
        <ListaPrecos data={ this.state.allAlarme } />
      </div>
    );
  },

  /**
   * Event handler for 'change' events coming from the AlarmeStore
   */
  _onChange: function() {
    this.setState(getAlarmeState());
  }

});

module.exports = AlarmeApp;
