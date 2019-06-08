"use strict";

var puffs_getBlockByNumber = require("../wrappers/puffs").getBlockByNumber;
var internalState = require("../internal-state");
var createBlockAndLogStreamer = require("./create-block-and-log-streamer");
var listenForNewBlocks = require("./listen-for-new-blocks");
var logError = require("../utils/log-error");

function startBlockStream(startingBlockNumber) {
  return function (dispatch) {
    dispatch(createBlockAndLogStreamer());
    if (startingBlockNumber === undefined) return dispatch(listenForNewBlocks());
    dispatch(puffs_getBlockByNumber([startingBlockNumber, false], function (err, block) {
      if (err) return console.error(err);
      internalState.get("blockAndLogStreamer").reconcileNewBlock(block).then(function () {
        dispatch(listenForNewBlocks());
      }).catch(logError);
    }));
  };
}

module.exports = startBlockStream;
