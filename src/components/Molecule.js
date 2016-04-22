'use strict';

import Action from '../actions/Action';
import Atom   from './Atom';

/**
 * The Molecule class is the base class for all component objects that can serve
 * as molecules on the component list. Use the Molecule class to arrange the
 * atom objects in the component list.
 *
 * Each Molecule object has its own child list.
 *
 * The Molecule class is an abstract base class for all component objects that
 * can contain child objects. It cannot be instantiated directly; calling the
 * new Molecule() constructor throws an TypeError exception.
 *
 * @author Luis Sardon
 *
 */
class Molecule extends Atom {
  constructor(name) {
    super(name);

    if (new.target === Molecule) {
      throw new TypeError("Yout cannot instantiate the Molecule class directly");
    }

    /**
     * Child list
     *
     */

    this.children = {};

    /**
     * Determines whether or not the children of the component object are mouse,
     * or user input device, enabled.
     *
     */

    this.mouseChildren = true;

    /**
     * Determines whether the children of the component object are tab enabled.
     *
     */

    this.tabChildren = true;
  }

  /**
   * Component type
   *
   */

  get type() {
    return "Molecule";
  }

  /**
   * [Read-only]
   *
   */

  set numChildren(value) {
    throw new TypeError('Cannot assign to read only property \'numChildren\'');
  }

  /**
   * Returns the number of children of this component object.
   *
   */

  get numChildren() {
    let totalChildren = 0;

    for (var variable in this.children) {
      totalChildren++;
    }

    return totalChildren;
  }

  /**
   * Determines whether the specified component object is a child of the
   * Component instance or the instance itself.
   *
   * @param {child} The child object to test.
   * @return {boolean} true if the child object is a child of the Component or
   * the container itself; otherwise false.
   */

  contains(child) {
    if(child === this)
      return true;

    if(child instanceof Atom && child.parent === this)
      return true;

    return false;
  }

  /**
   * Returns the child component object that exists with the specified name.
   *
   * @parem {name} Component name
   */

  getChildByName(name) {
    return this.children[name];
  }

  /**
   * Check if a child component instance can be instantiated in this component
   * instance
   *
   */

  childCanBeInstantiated(child) {
    if(child instanceof Atom) {

      if(child === this) {
        throw new TypeError('You cannot add a child Molecule instance to itself');
      }

      if(child.type === "Molecule") {
        throw new TypeError('You cannot add a child Molecule instance to this Molecule instance');
      }

      if(child.type === "Organism") {
        throw new TypeError('You cannot add a child Organism instance to this Molecule instance');
      }

      return true;
    }

    throw new TypeError('You can only add a child Atom instance to this Molecule instance');
  }

  /**
   * Adds a child Component instance to this Component instance.
   *
   */

  addChild(child) {
    if(this.childCanBeInstantiated(child)) {
      // TODO: append child.view to this.view

      child.parent = this;
      child.dispatchAction(Action.ADDED);

      this.children[child.name] = child;
      return child;
    }
  }

  /**
   * Removes the specified child Component instance from the child list of the
   * Component instance.
   *
   * @param {child} Component instance
   *
   */

  removeChild(child) {
    // TODO: remove child.view from this.view

    child.dispatchAction(Action.REMOVED);

    delete this.children[child.name];
  }
}

export default Molecule;
