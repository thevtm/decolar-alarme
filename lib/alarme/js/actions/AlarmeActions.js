var AppDispatcher = require('../dispatcher/AppDispatcher');
var AlarmeConstants = require('../constants/AlarmeConstants.js');

/**
  * AlarmeActions Creator
  */
var AlarmeActions = {

  /**
    * Dispatch Recebe Preco Action
    * @param {object} data Data do preço.
    */
  recebePreco: function (data) {
    AppDispatcher.dispatch({
      actionType: AlarmeConstants.ALARME_RECEBE_PRECO,
      data: data
    });
  }

};

module.exports = AlarmeActions;
