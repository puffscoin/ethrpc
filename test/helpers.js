"use strict";

var assert = require("chai").assert;
var os = require("os");
var StubServer = require("puffscoinjs-stub-rpc-server");
var rpc = require("../src");

function errorHandler(err) {
  assert.isTrue(false, (err || {}).message || err);
}

module.exports.getIpcAddress = function () {
  return process.env.PUFFSRPC_TEST_IPC_ADDRESS || ((os.type() === "Windows_NT") ? "\\\\.\\pipe\\TestRPC" : "testrpc.ipc");
};

module.exports.getWsAddress = function () {
  return process.env.PUFFSRPC_TEST_WS_ADDRESS || "ws://localhost:1337";
};

module.exports.getHttpAddress = function () {
  return process.env.PUFFSRPC_TEST_HTTP_ADDRESS || "http://localhost:1337";
};

module.exports.rpcConnect = function (transportType, transportAddress, callback) {
  var configuration = this.getRpcConfiguration(transportType, transportAddress);
  rpc.connect(configuration, function (err) {
    assert.isNull(err, (err || {}).message);
    callback(null);
  });
};

module.exports.getRpcConfiguration = function (transportType, transportAddress) {
  switch (transportType) {
    case "IPC":
      return {
        ipcAddresses: [transportAddress],
        wsAddresses: [],
        httpAddresses: [],
        pollingIntervalMilliseconds: 1,
        blockRetention: 5,
        errorHandler: errorHandler,
      };
    case "WS":
      return {
        ipcAddresses: [],
        wsAddresses: [transportAddress],
        httpAddresses: [],
        pollingIntervalMilliseconds: 1,
        blockRetention: 5,
        errorHandler: errorHandler,
      };
    case "HTTP":
      return {
        ipcAddresses: [],
        wsAddresses: [],
        httpAddresses: [transportAddress],
        pollingIntervalMilliseconds: 1,
        blockRetention: 5,
        errorHandler: errorHandler,
      };
    default:
      assert.isFalse(true, "Unknown transportType: " + transportType);
  }
};

module.exports.createStubRpcServerWithRequiredResponders = function (transportType, transportAddress) {
  var stubRpcServer = StubServer.createStubServer(transportType, transportAddress);
  stubRpcServer.addResponder(function (request) {
    if (request.method === "eth_gasPrice") return "0x09184e72a000";
    if (request.method === "eth_estimateGas") return "0x123456";
  });
  return stubRpcServer;
};
