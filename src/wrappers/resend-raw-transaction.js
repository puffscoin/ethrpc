"use strict";

var speedomatic = require("speedomatic");
var clone = require("clone");
var puffs = require("../wrappers/puffs");
var signRawTransactionWithKey = require("../raw-transactions/sign-raw-transaction-with-key");

function resendRawTransaction(transaction, privateKey, gasPrice, gasLimit, callback) {
  return function (dispatch) {
    var newTransaction = clone(transaction);
    if (gasPrice) newTransaction.gasPrice = speedomatic.hex(gasPrice);
    if (gasLimit) newTransaction.gasLimit = speedomatic.hex(gasLimit);
    var signedTransaction = signRawTransactionWithKey(newTransaction, privateKey);
    return dispatch(puffs.sendRawTransaction(signedTransaction, callback));
  };
}

module.exports = resendRawTransaction;
