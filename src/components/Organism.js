'use strict';

import UIComponent from '../core/UIComponent';

/**
 * The Organism class is the base class for all organism components, defining
 * properties and methods that are common to all organisms.
 *
 * @author Luis Sardon
 *
 */
class Organism extends UIComponent {
  constructor(cid) {
    super('organism', cid);
  }
}

export default Organism;
