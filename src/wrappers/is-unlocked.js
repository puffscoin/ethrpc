"use strict";

var puffs_sign = require("../wrappers/puffs").sign;

/**
 * Check to see if the provided account is unlocked for the connected node.
 */
function isUnlocked(account, callback) {
  return function (dispatch) {
    dispatch(puffs_sign([account, "0x00000000000000000000000000000000000000000000000000000000000f69b5"], function (err) {
      if (err) {
        console.warn("puffs_sign failed during puffsrpc.isUnlocked:", err);
        return callback(null, false);
      }
      callback(null, true);
    }));
  };
}

module.exports = isUnlocked;
