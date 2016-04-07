'use strict';

import Action from '../actions/Action';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The UIComponent class is the base class for all atomic view components,
 * atoms, molecules and organisms.
 *
 */

class UIComponent extends ActionDispatcher {
  constructor(name) {
    super();

    /**
     * Define read-only 'name' property
     *
     */

    Object.defineProperty(this, 'name', {
      value: name,
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
