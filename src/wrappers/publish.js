"use strict";

var puffs = require("./puffs");
var RPCError = require("../errors/rpc-error");

// publish a new contract to the blockchain from the coinbase account
function publish(compiled, callback) {
  return function (dispatch) {
    dispatch(puffs.coinbase(function (err, coinbase) {
      if (err) return callback(err);
      if (coinbase == null) return callback(new RPCError("COINBASE_NOT_SET"));
      dispatch(puffs.sendTransaction({ from: coinbase, data: compiled, gas: "0x6230b8" }, callback));
    }));
  };
}

module.exports = publish;
