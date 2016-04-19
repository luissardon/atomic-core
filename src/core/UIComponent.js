'use strict';

import Action from '../actions/Action';
import ActionDispatcher from '../actions/ActionDispatcher';

/**
 * The UIComponent class is the base class for all atomic view components,
 * atoms, molecules and organisms.
 *
 * @param {cid} Component ID
 *
 */

let components = { atoms: {}, molecules: {}, organisms: {}};

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

    /**
     * Add component to the collection
     *
     */

    if(components[this.type + 's'])
      components[this.type + 's'][cid] = this;

    this.dispatchAction(Action.ADDED);
  }

  /**
   * Global acces to a particular component
   *
   * @param {cid} Component ID
   * @return {UIComponent} Instance of a component
   *
   */

  static getComponent(cid) {
    return components[this.name.toLowerCase() + 's'][cid];
  }

  /**
   * Global acces to components
   *
   * @return {array} Collection of components
   *
   */

  static getComponents() {
    let componentsArr = [];
    let typeComponents = components[this.name.toLowerCase() + 's'];

    for (let component in typeComponents) {
      if (typeComponents[component]) {
        componentsArr.push(typeComponents[component]);
      }
    }

    return componentsArr;
  }

  /**
   * Component View
   *
   * @return {html}
   *
   */
  get render() {
    try {
      let view = document.querySelectorAll(`[data-cid="${this.cid}"]`);
      view.setAttribute('data-atomic-type', this.type);
      return view;
    } catch(e) {
      return true;
    }
  }
}

export default UIComponent;
