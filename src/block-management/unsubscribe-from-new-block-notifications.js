"use strict";

var puffs_unsubscribe = require("../wrappers/puffs").unsubscribe;
var internalState = require("../internal-state");
var storeObservers = require("../store-observers");
var logError = require("../utils/log-error");

function unsubscribeFromNewBlockNotifications() {
  return function (dispatch, getState) {
    var newHeadsSubscription = getState().newHeadsSubscription;
    if (newHeadsSubscription.reconnectToken != null) {
      internalState.get("transporter").removeReconnectListener(newHeadsSubscription.reconnectToken);
    }
    dispatch({ type: "CLEAR_NEW_HEADS_SUBSCRIPTION" });
    if (newHeadsSubscription.id != null) {
      dispatch(storeObservers.remove(newHeadsSubscription.id));
      dispatch(puffs_unsubscribe(newHeadsSubscription.id, logError));
    }
  };
}

module.exports = unsubscribeFromNewBlockNotifications;
