"use strict";

var parsePuffscoinResponse = require("../decode-response/parse-puffscoin-response");
var isObject = require("../utils/is-object");
var RPCError = require("../errors/rpc-error");
var internalState = require("../internal-state");

/**
 * Used internally.  Processes a response from the blockchain by looking up the
 * associated callback and calling it.
 */
function blockchainMessageHandler(error, jso) {
  return function (dispatch, getState) {
    var debug = getState().debug;
    var outOfBandErrorHandler = internalState.get("outOfBandErrorHandler");
    if (debug.broadcast) console.log("[puffsrpc] RPC response:", JSON.stringify(jso));

    if (error !== null) return outOfBandErrorHandler(error);
    if (!isObject(jso)) return outOfBandErrorHandler(new RPCError("INVALID_TRANSPORT_MESSAGE", jso));

    var subscriptionHandler = function () {
      if (jso.method !== "eth_subscription") return outOfBandErrorHandler(new RPCError("UNSUPPORTED_RPC_REQUEST", jso));
      if (typeof jso.params.subscription !== "string") return outOfBandErrorHandler(new RPCError("NO_SUBSCRIPTION_ID", jso));
      if (jso.params.result == null) return outOfBandErrorHandler(new RPCError("NO_SUBSCRIPTION_RESULT", jso));
      var storeObserver = getState().storeObservers[jso.params.subscription];
      if (storeObserver != null) {
        dispatch({ type: storeObserver.reaction, data: jso.params.result });
      }
    };

    var errorHandler = function () {
      // errors with IDs can go through the normal result process
      if (jso.id != null) {
        if (debug.broadcast) console.log("outstanding request:", internalState.get("outstandingRequests." + jso.id));
        // eslint-disable-next-line no-use-before-define
        return responseHandler(jso);
      }
      outOfBandErrorHandler(new RPCError(jso.error));
    };

    var responseHandler = function () {
      if (typeof jso.id !== "number") return errorHandler(new RPCError("INVALID_MESSAGE_ID", jso));
      var outstandingRequest = internalState.get("outstandingRequests." + jso.id);
      internalState.unset("outstandingRequests." + jso.id);
      if (!isObject(outstandingRequest)) return outOfBandErrorHandler(new RPCError("JSON_RPC_REQUEST_NOT_FOUND", jso));
      parsePuffscoinResponse(jso, outstandingRequest.callback);
    };

    // depending on the type of message it is (request, response, error, invalid) we will handle it differently
    if (jso.method !== undefined) {
      subscriptionHandler();
    } else if (jso.result !== undefined) {
      responseHandler();
    } else if (jso.error !== undefined) {
      errorHandler();
    } else {
      outOfBandErrorHandler(new RPCError("INVALID_JSON_RPC_MESSAGE", jso));
    }
  };
}

module.exports = blockchainMessageHandler;
