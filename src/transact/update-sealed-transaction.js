"use strict";

var speedomatic = require("speedomatic");
var BigNumber = require("bignumber.js");
var recheckSealedBlock = require("./recheck-sealed-block");
var eth_getTransactionReceipt = require("../wrappers/eth").getTransactionReceipt;
var constants = require("../constants");

function updateSealedTransaction(transactionHash, callback) {
  return function (dispatch, getState) {
    dispatch({ type: "SET_TRANSACTION_CONFIRMATIONS", hash: transactionHash, currentBlockNumber: parseInt(getState().currentBlock.number, 16) });
    var transaction = getState().transactions[transactionHash];
    if (transaction.confirmations < constants.REQUIRED_CONFIRMATIONS) {
      return dispatch(recheckSealedBlock(transaction.tx, callback));
    }
    dispatch({ type: "TRANSACTION_CONFIRMED", hash: transactionHash });
    dispatch(recheckSealedBlock(transaction.tx, function (err, isBlockIncluded) {
      if (err) return callback(err);
      if (!isBlockIncluded) return callback(null);
      dispatch(eth_getTransactionReceipt(transactionHash, function (err, receipt) {
        if (getState().debug.tx) console.log("eth_getTransactionReceipt", transactionHash, err, receipt);
        if (err) return callback(err);
        if (receipt == null) {
          console.warn("[puffsrpc] Transaction receipt not found for", transactionHash, err, receipt);
          return dispatch(recheckSealedBlock(transaction.tx, callback));
        }
        var gasFees = speedomatic.unfix(new BigNumber(receipt.gasUsed, 16).times(new BigNumber(transaction.tx.gasPrice, 16)), "string");
        dispatch({ type: "UPDATE_ON_CHAIN_TRANSACTION", hash: transactionHash, data: { gasFees: gasFees } });
        var status = parseInt(receipt.status, 16);
        if (status === 0) { // status 0x0: failure
          callback(getState().transactions[transactionHash].tx);
        } else if (status === 1) { // status 0x1: success
          transaction.onSuccess(getState().transactions[transactionHash].tx);
          callback(null);
        }
      }));
    }));
  };
}

module.exports = updateSealedTransaction;
