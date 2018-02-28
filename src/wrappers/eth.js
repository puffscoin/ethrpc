"use strict";

var makeWrapper = require("./make-wrapper");

module.exports = {
  accounts: makeWrapper("eth_accounts"),
  blockNumber: makeWrapper("eth_blockNumber"),
  call: makeWrapper("eth_call"),
  coinbase: makeWrapper("eth_coinbase"),
  compileLLL: makeWrapper("eth_compileLLL"),
  compileSerpent: makeWrapper("eth_compileSerpent"),
  compileSolidity: makeWrapper("eth_compileSolidity"),
  estimateGas: makeWrapper("eth_estimateGas"),
  gasPrice: makeWrapper("eth_gasPrice"),
  getBalance: makeWrapper("eth_getBalance"),
  getBlockByHash: makeWrapper("eth_getBlockByHash"),
  getBlockByNumber: makeWrapper("eth_getBlockByNumber"),
  getBlockTransactionCountByHash: makeWrapper("eth_getBlockTransactionCountByHash"),
  getBlockTransactionCountByNumber: makeWrapper("eth_getBlockTransactionCountByNumber"),
  getCode: makeWrapper("eth_getCode"),
  getCompilers: makeWrapper("eth_getCompilers"),
  getFilterChanges: makeWrapper("eth_getFilterChanges"),
  getFilterLogs: makeWrapper("eth_getFilterLogs"),
  getLogs: makeWrapper("eth_getLogs"),
  getStorageAt: makeWrapper("eth_getStorageAt"),
  getTransactionByBlockHashAndIndex: makeWrapper("eth_getTransactionByBlockHashAndIndex"),
  getTransactionByBlockNumberAndIndex: makeWrapper("eth_getTransactionByBlockNumberAndIndex"),
  getTransactionByHash: makeWrapper("eth_getTransactionByHash"),
  getTransactionCount: makeWrapper("eth_getTransactionCount"),
  getTransactionReceipt: makeWrapper("eth_getTransactionReceipt"),
  getUncleByBlockHashAndIndex: makeWrapper("eth_getUncleByBlockHashAndIndex"),
  getUncleByBlockNumberAndIndex: makeWrapper("eth_getUncleByBlockNumberAndIndex"),
  getUncleCountByBlockHash: makeWrapper("eth_getUncleCountByBlockHash"),
  getUncleCountByBlockNumber: makeWrapper("eth_getUncleCountByBlockNumber"),
  getWork: makeWrapper("eth_getWork"),
  hashrate: makeWrapper("eth_hashrate"),
  mining: makeWrapper("eth_mining"),
  newBlockFilter: makeWrapper("eth_newBlockFilter"),
  newFilter: makeWrapper("eth_newFilter"),
  newPendingTransactionFilter: makeWrapper("eth_newPendingTransactionFilter"),
  protocolVersion: makeWrapper("eth_protocolVersion"),
  sendRawTransaction: makeWrapper("eth_sendRawTransaction"),
  sendTransaction: makeWrapper("eth_sendTransaction"),
  sign: makeWrapper("eth_sign"),
  signTransaction: makeWrapper("eth_signTransaction"),
  submitHashrate: makeWrapper("eth_submitHashrate"),
  submitWork: makeWrapper("eth_submitWork"),
  subscribe: makeWrapper("eth_subscribe"),
  syncing: makeWrapper("eth_syncing"),
  uninstallFilter: makeWrapper("eth_uninstallFilter"),
  unsubscribe: makeWrapper("eth_unsubscribe"),
};
