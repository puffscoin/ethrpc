"use strict";

var puffs_estimateGas = require("../wrappers/puffs").estimateGas;
var calculateEstimatedGasWithBuffer = require("./calculate-estimated-gas-with-buffer");

function getEstimatedGasWithBuffer(packaged, callback) {
  return function (dispatch) {
    dispatch(puffs_estimateGas(packaged, function (err, estimatedGas) {
      if (err) return callback(err);
      callback(null, calculateEstimatedGasWithBuffer(estimatedGas));
    }));
  };
}

module.exports = getEstimatedGasWithBuffer;
