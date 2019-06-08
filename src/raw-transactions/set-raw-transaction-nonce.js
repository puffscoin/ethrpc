"use strict";

var assign = require("lodash").assign;
var puffs_getTransactionCount = require("../wrappers/puffs").getTransactionCount;
var verifyRawTransactionNonce = require("./verify-raw-transaction-nonce");
var RPCError = require("../errors/rpc-error");


/**
 * Use the number of transactions from this account to set the nonce.
 * @param {Object} packaged Packaged transaction.
 * @param {string} address The sender's PUFFScoin address.
 * @param {function} callback Callback function.
 * @return {Object} Packaged transaction with nonce set.
 */
function setRawTransactionNonce(packaged, address, callback) {
  return function (dispatch, getState) {
    dispatch(puffs_getTransactionCount([address, "pending"], function (err, transactionCount) {
      if (getState().debug.tx) console.log("transaction count:", address, transactionCount);
      if (err) return callback(err);
      if (transactionCount == null) return callback(new RPCError("NO_RESPONSE"));
      var txCount = typeof transactionCount === "number" ? transactionCount : parseInt(transactionCount, 16);
      callback(null, assign({}, packaged, { nonce: dispatch(verifyRawTransactionNonce(txCount)) }));
    }));
  };
}

module.exports = setRawTransactionNonce;
