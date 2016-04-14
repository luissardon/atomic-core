'use strict';

import Action from '../actions/Action';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The UIComponent class is the base class for all atomic view components,
 * atoms, molecules and organisms.
 *
 * @param {cid} Component cid
 *
 */

class UIComponent extends ActionDispatcher {
  constructor(type, cid) {
    super();

    /**
     * Define read-only 'type' property
     *
     */

    Object.defineProperty(this, 'type', {
      value: type,
      writable: false
    });

    /**
     * Define read-only 'cid' property
     *
     */

    Object.defineProperty(this, 'cid', {
      value: cid,
      writable: false
    });

    this.dispatchAction(Action.ADDED);
  }

  /**
   * Render
   *
   */
  render() {

  }
}

export default UIComponent;
