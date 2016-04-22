'use strict';

import Atom     from './Atom';

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
   * Get Atom child by its name
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
   * Adds a child Atom instance to this Molecule instance.
   *
   */

  addChild(child) {
    if(this.childCanBeInstantiated(child)) {
      child.parent = this;
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
    delete this.children[child.name];
  }
}

export default Molecule;
