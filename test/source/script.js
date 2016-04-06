'use strict';

import {Atom} from '../../index.js';

class Button extends Atom {
  constructor() {
    super();
  }
  
  debug() {
    console.log('Hola soy', this);
  }
}

let button = new Button();
button.debug();