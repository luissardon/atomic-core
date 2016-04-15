'use strict';

import {UIComponent} from '../lib/index.js';
import test from 'ava';

let component = new UIComponent('abstract', 'some');

test('SHOULDN\'T CHANGE THE CID PROPERTY OF THE COMPONENT', t => {
  try {
    component.cid = 'other';
    t.fail();
  } catch(e) {
    t.pass();
  }
});
