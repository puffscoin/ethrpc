"use strict";

var speedomatic = require("speedomatic");
var puffs_coinbase = require("./puffs").coinbase;

function setCoinbase(callback) {
  return function (dispatch) {
    dispatch(puffs_coinbase(null, function (err, coinbase) {
      if (err) return callback(err);
      if (coinbase != null) {
        dispatch({ type: "SET_COINBASE", address: speedomatic.formatPuffscoinAddress(coinbase) });
      }
      callback(null);
    }));
  };
}

module.exports = setCoinbase;
