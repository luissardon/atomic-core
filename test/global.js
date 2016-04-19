'use strict';

import {
  Atom,
  Molecule,
  Organism
} from '../lib/index.js';

import test from 'ava';

let atom = new Atom('myAtom');
let atom2 = new Atom('myAtom2');

test('SHOULD GET THE ATOM COMPONENT GLOBALLY', t => {
  t.deepEqual(Atom.getComponent('myAtom'), atom);
});

test('SHOULD GET ALL HE ATOM COMPONENTS GLOBALLY', t => {
  t.deepEqual(Atom.getComponents().length, 2);
})
