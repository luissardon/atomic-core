'use strict';

import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The UIComponent class is the base class for all components that can be placed
 * on the component list. The component list manages all components. Use the
 * UIComponentContainer class to arrange the component objects in the component
 * list.
 *
 * UIComponent is an abstract class; therefore, you cannot call UIComponent
 * directly. Invoking new UIComponent throws an ArgumentError exception.
 *
 * All component objects inherit from UIComponent class.
 *
 * @constructor {name} Instance Name
 *
 */

let componentList = { atoms: {}, molecules: {}, organisms: {}};

class UIComponent extends ActionDispatcher {
  constructor(name) {
    super();

    /**
     * Indicates the UIComponentContainer that contains this UIComponent.
     *
     */

    this.parent = undefined;

    /**
     * Indicates the instance name of the UIComponent
     *
     */

    Object.defineProperty(this, 'name', {
      value: name,
      writable: false
    });

    /**
     * Indicates the html view of the component
     *
     */

    Object.defineProperty(this, 'view', {
      value: document.querySelectorAll(`[data-name="${this.name}"]`)
          || this.render,
      writable: false
    });
  }

  /**
   * New HTML View
   *
   * @return {html} returns the new html view to render otherwise throw an Error
   *
   */

  get render() {
    throw new Error('There is no component view to render');
  }
}

export default UIComponent;
