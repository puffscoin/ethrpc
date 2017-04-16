"use strict";

var addSubscription = require("./add-subscription");

function selectCurrentBlock(state) {
  return state.currentBlock;
}

function addNewHeadsSubscription(id, onStateChange) {
  return function (dispatch) {
    dispatch(addSubscription(id, selectCurrentBlock, onStateChange));
  };
}

module.exports = addNewHeadsSubscription;
