"use strict";

var speedomatic = require("speedomatic");
var clone = require("clone");
var puffs = require("../wrappers/puffs");

function resendTransaction(transaction, gasPrice, gasLimit, callback) {
  return function (dispatch) {
    var newTransaction = clone(transaction);
    if (gasPrice) newTransaction.gasPrice = speedomatic.hex(gasPrice);
    if (gasLimit) newTransaction.gasLimit = speedomatic.hex(gasLimit);
    return dispatch(puffs.sendTransaction(newTransaction, callback));
  };
}

module.exports = resendTransaction;
