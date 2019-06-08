"use strict";

var puffs_getTransaction = require("../wrappers/puffs").getTransaction;

function txNotify(txHash, callback) {
  return function (dispatch, getState) {
    dispatch(puffs_getTransaction(txHash, function (err, transaction) {
      if (err) return callback(err);
      if (transaction) return callback(null, transaction);
      dispatch({ type: "DECREMENT_HIGHEST_NONCE" });
      if (getState().debug.broadcast) console.log(" *** Re-submitting transaction:", txHash);
      dispatch({ type: "TRANSACTION_RESUBMITTED", hash: txHash });
      return callback(null, null);
    }));
  };
}

module.exports = txNotify;
