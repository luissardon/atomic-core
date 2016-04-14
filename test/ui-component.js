'use strict';

import {UIComponent} from '../lib/index.js';
import test from 'ava';

let component = new UIComponent('some');

test('SHOULDN\'T CHANGE THE CID OF THE COMPONENT PROPERTY', t => {
  try {
    component.cid = 'other';
    t.fail();
  } catch(e) {
    t.pass();
  }
});
