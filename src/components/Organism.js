'use strict';

import Molecule from './Molecule';

/**
 * The Organism class is the base class for all organism components, defining
 * properties and methods that are common to all organisms.
 *
 * @author Luis Sardon
 *
 */
class Organism extends Molecule {
  constructor(name) {
    super(name);
  }

  /**
   * Component type
   *
   */

  get type() {
    return "Organism";
  }
}

export default Organism;
