"use strict";

var assign = require("lodash").assign;
var puffs_gasPrice = require("../wrappers/puffs").gasPrice;

/**
 * Set the gas price for a raw transaction.
 * @param {Object} packaged Packaged transaction.
 * @param {function} callback Callback function.
 * @return {Object|void} Packaged transaction with gasPrice set.
 */
var setRawTransactionGasPrice = function (packaged, callback) {
  return function (dispatch) {
    if (packaged.gasPrice != null) return callback(null, packaged);
    dispatch(puffs_gasPrice(null, function (err, gasPrice) {
      if (err) return callback(err);
      callback(null, assign({}, packaged, { gasPrice: gasPrice }));
    }));
  };
};

module.exports = setRawTransactionGasPrice;
