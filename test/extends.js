'use strict';

import {
  Atom,
  Molecule,
  Organism,
  ComponentObject,
  ActionDispatcher
} from '../lib/index.js';

import test from 'ava';

class neoAtom extends Atom {}
class neoMolecule extends Molecule {}
class neoOrganism extends Organism {}

let atom = new neoAtom();
let molecule = new neoMolecule();
let organism = new neoOrganism();

test('ATOM SHOULD BE AN INSTANCE OF ComponentObject', t => {
  t.truthy(atom instanceof ComponentObject);
});
test('MOLECULE SHOULD BE AN INSTANCE OF ComponentObject', t => {
  t.truthy(molecule instanceof ComponentObject);
});
test('ORGANISM SHOULD BE AN INSTANCE OF ComponentObject', t => {
  t.truthy(organism instanceof ComponentObject);
});
