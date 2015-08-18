/*
 * Copyright (c) 2014, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the BSD-style license found in the
 * LICENSE file in the root directory of this source tree. An additional grant
 * of patent rights can be found in the PATENTS file in the same directory.
 *
 * TodoStore
 */

var AppDispatcher = require('../dispatcher/AppDispatcher');
var EventEmitter = require('events').EventEmitter;
var AlarmeConstants = require('../constants/AlarmeConstants');
var assign = require('object-assign');
var R = require('ramda');

var CHANGE_EVENT = 'change';

var _alarmes = [ ];
var _alarmes_count_id = 0;

/**
 * Push um alarme para Alarmes store.
 * @param  {object} data The content of the alarme
 */
function pushAlarme( data ) {
  data.id = _alarmes_count_id++;
  _alarmes.push(data);
}


var AlarmeStore = assign({}, EventEmitter.prototype, {

  /**
    * Retorna todos os Alarmes
    * @return {object}
    */
  getAlarmes: R.always(_alarmes),

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

    default:
      // no op
  }
});

module.exports = AlarmeStore;
