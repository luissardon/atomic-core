'use strict';

import {
  Atom,
  Molecule,
  Organism,
  UIComponent,
  ActionDispatcher
} from '../lib/index.js';

import test from 'ava';

test('UIComponent debe ser una extencion de ActionDispatcher', t => {
  t.not(Atom, undefined);
});
