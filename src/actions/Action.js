'use strict';

const ACTIVATE = 'activate';
const DEACTIVATE = 'deactivate';
const ADDED = 'added';
const REMOVED = 'removed';

/**
 * The Action class is used as the base class for the creation of Action objects,
 * which are passed as parameters to action listeners when an action occurs.
 *
 * @param {type} The type of the action, accessible as Action.type.
 */

class Action {
  constructor(type) {
    this.type = type;
  }

  static get ACTIVATE() { return ACTIVATE; }
  static get DEACTIVATE() { return DEACTIVATE; }
  static get ADDED() { return ADDED; }
  static get REMOVED() { return REMOVED; }

  /**
   * @todo Prevents processing of any aciion listeners in nodes subsequent to the
   * current node in the action flow.
   *
   */

  stopPropagation() {
  }
}

export default Action;
