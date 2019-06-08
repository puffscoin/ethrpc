"use strict";

var puffs = require("../wrappers/puffs");
var packageRequest = require("../encode-request/package-request");
var isObject = require("../utils/is-object");
var RPCError = require("../errors/rpc-error");

function callOrSendTransaction(payload, callback) {
  return function (dispatch, getState) {
    if (!isObject(payload)) return callback(new RPCError("TRANSACTION_FAILED"));
    dispatch(packageRequest(payload, function (err, packaged) {
      if (err) return callback(err);
      if (getState().debug.broadcast) console.log("packaged:", packaged);
      if (payload.estimateGas) {
        dispatch(puffs.estimateGas(packaged, callback));
      } else if (payload.send) {
        dispatch(puffs.sendTransaction(packaged, callback));
      } else {
        dispatch(puffs.call([packaged, "latest"], callback));
      }
    }));
  };
}

module.exports = callOrSendTransaction;
