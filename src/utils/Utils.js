'use strict';

/**
 * Utilities
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
}

export default Utils;
