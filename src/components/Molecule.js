'use strict';

import UIComponent from '../core/UIComponent';

/**
 * The Molecule class is the base class for all molecule components, defining
 * properties and methods that are common to all molecules.
 *
 * @author Luis Sardon
 *
 */
class Molecule extends UIComponent {
  constructor(cid) {
    super('molecule', cid);
  }
}

export default Molecule;
