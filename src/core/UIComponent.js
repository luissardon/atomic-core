'use strict';

import Action from '../actions/Action';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The UIComponent class is the base class for all components that can be placed
 * on the component list. The component list manages all components. Use the
 * Molecule class to arrange the component objects in the component list.
 *
 * UIComponent is an abstract class; therefore, you cannot call UIComponent
 * directly. Invoking new UIComponent throws an ArgumentError exception.
 *
 * All component objects inherit from UIComponent class.
 *
 * @param {name} UIComponent Name
 *
 */

let componentList = { atoms: {}, molecules: {}, organisms: {}};

class UIComponent extends ActionDispatcher {
  constructor(type, name) {
    super();

    /**
     * Define 'added' property
     *
     */

    Object.defineProperty(this, 'added', {
      value: false
    });

    /**
     * Define read-only 'type' property
     *
     */

    Object.defineProperty(this, 'type', {
      value: type,
      writable: false
    });

    /**
     * Define read-only 'name' property
     *
     */

    Object.defineProperty(this, 'name', {
      value: name,
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

    /**
     * Add component to the collection
     *
     */

    if(componentList[this.type + 's'])
      componentList[this.type + 's'][name] = this;
  }

  /**
   * Global acces to a particular component
   *
   * @param {name} UIComponent ID
   * @return {UIComponent} Instance of a component
   *
   */

  static getComponent(name) {
    return componentList[this.name.toLowerCase() + 's'][name];
  }

  /**
   * Global acces to components
   *
   * @return {array} Collection of components
   *
   */

  static getComponents() {
    let collection = [];
    let collectionType = componentList[this.name.toLowerCase() + 's'];

    for (let component in collectionType) {
      if (collectionType[component]) {
        collection.push(typeUIComponent[component]);
      }
    }

    return collection;
  }

  /**
   * Get Added State
   *
   * @return {boolean} true if the UIComponent was added
   *
   */

  get added() {
    return this['added'];
  }

  /**
   * Set Added State, only works if the param value is true and the current
   * added state value is false
   *
   * @param {value} Boolean
   *
   */

  set added(value) {
    if(value === true && this['added'] === false) {
      this['added'] = value;
      this.dispatchAction(Action.ADDED);
    }
  }

  /**
   * UIComponent View
   *
   * @return {html}
   *
   */

  get render() {
    try {
      let view = document.querySelectorAll(`[data-name="${this.name}"]`);
      return view;
    } catch(e) {
      return true;
    }
  }
}

export default UIComponent;
