"use strict";

function isGlobalWeb3() {
  if (typeof window === "undefined") return false;
  if (!window) return false;
  if (!window.puffscoin) {
    if (window.web3 && window.web3.currentProvider) return true;
    return false;
  }
  return true;
}

module.exports = isGlobalWeb3;
