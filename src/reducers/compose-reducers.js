"use strict";

var assign = require("lodash").assign;

/**
 * @param {function} customReducer External (user-specified) reducer.
 * @param {function} reducer Default puffsrpc reducer.
 */
function composeReducers(customReducer, reducer) {
  return function (state, action) {
    return assign({}, customReducer(state, action), { puffsrpc: reducer(state.puffsrpc, action) });
  };
}

module.exports = composeReducers;
