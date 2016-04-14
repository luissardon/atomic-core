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

    /**
     * Define read-only 'view' property
     *
     */

    Object.defineProperty(this, 'view', {
      value: this.render,
      writable: false
    });

    this.dispatchAction(Action.ADDED);
  }

  /**
   * Get Parent Atomic Component if exist
   *
   * @return {boolean}
   * @todo
   */
  get parent() {

  }

  /**
   * Component View
   * @return {html}
   */
  get render() {
    return document.querySelectorAll(`[data-cid="${this['cid']}"]`);
  }
}

export default UIComponent;
