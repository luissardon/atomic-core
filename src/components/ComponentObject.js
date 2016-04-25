/*jslint browser:true */
/*jshint sub:true*/

'use strict';

import Utils            from '../utils/Utils';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The ComponentObject class is the base class for all components that can be
 * placed on the component list. The component list manages all components. Use
 * the ComponentObjectContainer class to arrange the component objects in the
 * component list.
 *
 * ComponentObject is an abstract class; therefore, you cannot call
 * ComponentObject directly. Invoking new ComponentObject() throws an
 * TypeError exception.
 *
 * All component objects inherit from ComponentObject class.
 *
 * @constructor {name} The name of the component, which it will be used to
 * locate their html view in the DOM.
 *
 * @author Luis Sardon
 *
 */

let componentList = { atoms: {}, molecules: {}, organisms: {}};

class ComponentObject extends ActionDispatcher {
  constructor(name) {
    super();

    if (new.target === ComponentObject) {
      throw new TypeError(`Yout cannot instantiate the ComponentObject class directly`);
    }

    /**
     * Indicates the ComponentObjectContainer that contains this
     * ComponentObject.
     *
     */

    Object.defineProperty(this, '_parent', {
      value: null,
      writable: true
    });

    /**
     * Indicates the instance name of the ComponentObject
     *
     */

    Object.defineProperty(this, 'name', {
      value: name,
      enumerable: true
    });

    /**
     * Indicates the html view of the component
     *
     */

    Object.defineProperty(this, 'view', {
      value: Utils.isClient() ? (document.querySelectorAll(`[data-name="${this.name}"]`) || this.render) : undefined,
      enumerable: true
    });
  }

  /**
   * Component type
   *
   */

  get type() {
    return undefined;
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
