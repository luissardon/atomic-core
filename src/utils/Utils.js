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
}

export default Utils;
