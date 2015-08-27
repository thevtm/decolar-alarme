var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AlarmeConstants = require('../constants/AlarmeConstants');
var assign = require('object-assign');
var R = require('ramda');

var CHANGE_EVENT = 'change';

var _error = null;
var _alarmes = [ ];
var _alarmes_count_id = 0;

/**
 * Push um alarme para Alarmes store.
 * @param  {object} data The content of the alarme
 */
function pushAlarme( data ) {
  data.id = _alarmes_count_id++;
  _alarmes.unshift(data);
}

/**
 * Set error.
 * @param  {Error} error O erro.
 */
function setError( error ) {
  _error = error;
}

/**
  * @class Classe contem dados dos alarmes.
  */
var AlarmeStore = assign({}, EventEmitter.prototype, {

  /**
    * Retorna todos os Alarmes.
    * @return {object}
    */
  getAlarmes: R.always(_alarmes),

  /**
    * Retorna error.
    * null se não ocorreu nenhum error.
    * @return {object}
    */
  getError: function () {
    return _error;
  },

  /**
    * Emit change event.
    */
  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  /**
   * @param {function} callback
   */
  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  /**
   * @param {function} callback
   */
  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  }
});

// Register callback to handle all updates
AppDispatcher.register(function(action) {
  var text;

  switch(action.actionType) {
    case AlarmeConstants.ALARME_RECEBE_PRECO:
      pushAlarme(action.data);
      AlarmeStore.emitChange();
      break;

    case AlarmeConstants.ALARME_RECEBE_ERROR:
      console.log('Recebeu errro');
      setError(action.error);
      AlarmeStore.emitChange();
      break;

    default:
      // no op
  }
});

module.exports = AlarmeStore;
