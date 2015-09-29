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
    // Converte de volta para um objeto Date.
    data.momento = new Date(data.momento);

    AppDispatcher.dispatch({
      actionType: AlarmeConstants.ALARME_RECEBE_PRECO,
      data: data
    });
  },

  /**
    * Dispatch Recebe Preco Action
    * @param {object} data Data do preço.
    */
  recebeError: function (error) {
    AppDispatcher.dispatch({
      actionType: AlarmeConstants.ALARME_RECEBE_ERROR,
      error: error
    });
  }

};

module.exports = AlarmeActions;
