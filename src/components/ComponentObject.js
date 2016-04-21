/*jslint browser:true */

'use strict';

import Utils from '../utils/Utils';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The ComponentObject class is the base class for all components that can be
 * placed on the component list. The component list manages all components. Use
 * the ComponentObjectContainer class to arrange the component objects in the
 * component list.
 *
 * ComponentObject is an abstract class; therefore, you cannot call
 * ComponentObject directly. Invoking new ComponentObject() throws an
 * ArgumentError exception.
 *
 * All component objects inherit from ComponentObject class.
 *
 * @constructor {name} Instance Name
 *
 */

let componentList = { atoms: {}, molecules: {}, organisms: {}};

class ComponentObject extends ActionDispatcher {
  constructor(name) {
    super();

    /**
     * Indicates the ComponentObjectContainer that contains this
     * ComponentObject.
     *
     */

    this.parent = undefined;

    /**
     * Indicates the instance name of the ComponentObject
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
      value: Utils.hasDocument() ? document.querySelectorAll(`[data-name="${this.name}"]`) || this.render : false,
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
    throw new Error('There is no html view to render');
  }
}

export default ComponentObject;
