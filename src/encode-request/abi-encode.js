"use strict";

var isFunction = require("../utils/is-function");

function encodeNumber(number) {
  if (typeof number !== "number") throw new Error("number must be a number.");
  return "0x" + number.toString(16);
}

function encodeArray(array) {
  var i;
  if (!(array instanceof Array)) throw new Error("array must be an array.");
  for (i = 0; i < array.length; ++i) {
    array[i] = encodePrimitive(array[i]);
  }
  return array;
}

function encodeObject(object) {
  var property;
  for (property in object) {
    if (object.hasOwnProperty(property)) {
      object[property] = encodePrimitive(object[property]);
    }
  }
  return object;
}

function encodePrimitive(primitive) {
  if (typeof primitive === "undefined") return primitive;
  if (primitive === null) return primitive;
  if (typeof primitive === "boolean") return primitive;
  if (typeof primitive === "string") return primitive;
  if (typeof primitive === "number") return encodeNumber(primitive);
  if (primitive instanceof Array) return encodeArray(primitive);
  if (typeof primitive === "object") return encodeObject(primitive);
  if (isFunction(primitive)) throw new Error("Cannot encode a function to be sent to PUFFScoin.");
  throw new Error("Attempted to encode an unsupported type: " + typeof primitive);
}

module.exports = {
  encodePrimitive: encodePrimitive,
  encodeNumber: encodeNumber,
  encodeArray: encodeArray,
  encodeObject: encodeObject,
};
