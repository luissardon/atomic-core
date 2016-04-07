'use strict';

import {UIComponent} from '../lib/index.js';
import test from 'ava';

let component = new UIComponent('some');

test('SHOULD NOT CHANGE THE NAME OF THE COMPONENT PROPERTY', t => {
  try {
    component.name = 'other';
    t.fail();
  } catch(e) {
    t.pass();
  }
});
