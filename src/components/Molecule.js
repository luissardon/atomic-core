'use strict';

import Atom from './Atom';

/**
 * The Molecule class is the base class for all molecule components, defining
 * properties and methods that are common to all molecules.
 *
 * @author Luis Sardon
 *
 */
class Molecule extends Atom {
  constructor(name) {
    super(name);
  }
}

export default Molecule;
