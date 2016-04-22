/*jslint browser:true */

'use strict';

/**
 * Utilities
 *
 * @author Luis Sardon
 *
 */

class Utils {

  /**
   * Generate a Unique ID
   *
   * @return {number}
   */

  static getUID() {
    return Math.random().toString(36).substr(2, 9);
  }

  /**
   * Check if the value is a Function type
   *
   * @param {value} Object
   * @return {boolean} true if it matches
   */

  static isFunction(value) {
    let getType = {};
    return value && getType.toString.call(value) === '[object Function]';
  }

  /**
   * Check if we are on the client side
   *
   */

  static isClient() {
    try {
      return !!document;
    } catch (e) {
      return false;
    }
  }
}

export default Utils;
