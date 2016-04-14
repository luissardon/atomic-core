'use strict';

import UIComponent from '../core/UIComponent';

/**
 * The Atom class is the base class for all atom components, defining properties
 * and methods that are common to all atoms.
 *
 * @author Luis Sardon
 *
 */
class Atom extends UIComponent {
  constructor(cid) {
    super('atom', cid);
  }
}

export default Atom;
