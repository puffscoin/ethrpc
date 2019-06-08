#!/usr/bin/env node

var puffsrpc = global.puffsrpc = require("./src");
var logError = global.logError = require("./src/utils/log-error");

var connectOptions = global.connectOptions = {
  httpAddresses: ["http://127.0.0.1:11363"],
  wsAddresses: ["ws://127.0.0.1:11364"],
  ipcAddresses: [],
  errorHandler: logError,
};

puffsrpc.setDebugOptions({ connect: true });

puffsrpc.connect(connectOptions, function (err) {
  if (err) return console.error(err);
  puffsrpc.puffs.coinbase(function (err, coinbase) {
    if (err) return console.error(err);
    if (coinbase == null) console.log("coinbase address not found");
  });
  puffsrpc.net.version(function (err, networkID) {
    if (err) return console.error(err);
    if (networkID == null) console.error("net_version failed");
  });
});
