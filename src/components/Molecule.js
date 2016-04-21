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
     * [Read-only] Returns the number of children of this component object.
     *
     */

     Object.defineProperty(this, 'numChildren', {
       value: 0,
       writable: false
     });

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
   * Adds a child Atom instance to this Molecule instance.
   *
   */

  addChild(child) {
    if(child instanceof Atom) {

      if(child.type === "Organism") {
        throw new TypeError('You cannot add a child Organism instance to this Molecule instance');
      }
      
      if(child === this) {
        throw new TypeError('You cannot add a child Molecule instance to itself');
      }

      if(child.type === "Molecule") {
        throw new TypeError('You cannot add a child Molecule instance to this Molecule instance');
      }

      this.children[child.name] = child;

      return child;
    }

    throw new TypeError('You can only add a child Atom instance to this Molecule instance');
  }
}

export default Molecule;
