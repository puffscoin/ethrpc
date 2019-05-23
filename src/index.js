"use strict";

var createPuffsrpc = require("./create-puffsrpc");
var reducer = require("./reducers");
var composeReducers = require("./reducers/compose-reducers");
var version = require("./version");

var puffsrpc = createPuffsrpc(reducer);
ethrpc.withCustomReducer = function (customReducer) {
  return createPuffsrpc(composeReducers(customReducer, reducer));
};

puffsrpc.lib_version = version;
module.exports = ethrpc;
