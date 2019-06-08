"use strict";

var puffs_gasPrice = require("./puffs").gasPrice;
var isHex = require("../utils/is-hex");

function setGasPrice(callback) {
  return function (dispatch) {
    dispatch(puffs_gasPrice(null, function (err, gasPrice) {
      if (err) return callback(err);
      if (gasPrice != null && isHex(gasPrice)) {
        dispatch({ type: "SET_GAS_PRICE", gasPrice: parseInt(gasPrice, 16) });
      }
      callback(null);
    }));
  };
}

module.exports = setGasPrice;
