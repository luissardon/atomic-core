import {
  Atom,
  Molecule,
  Organism,
  Action
} from '../lib/index.js';

import test from 'ava';

class neoAtom extends Atom {}
class neoMolecule extends Molecule {}
class neoOrganism extends Organism {}

let atom = new neoAtom('myAtom');
let molecule = new neoMolecule('myMolecule');
let molecule_2 = new neoMolecule('myMolecule_2');
let organism = new neoOrganism('myOrganism');

test('SHOULD ADD AN ATOM INSTANCE TO A MOLECULE INSTANCE', t => {
	t.deepEqual(molecule.addChild(atom), atom);
});

test('SHOULDN\'T ADD A ORGANISM INSTANCE TO A MOLECULE INSTANCE', t => {
  try {
	   molecule.addChild(organism);
     t.fail();
  } catch (e) {
    t.pass();
  }
});

test('SHOULDN\'T ADD A MOLECULE INSTANCE TO ANOTHER MOLECULE INSTANCE', t => {
  try {
	   molecule.addChild(molecule_2);
     t.fail();
  } catch (e) {
    t.pass();
  }
});

test('SHOULDN\'T ADD A MOLECULE INSTANCE TO ITSELF', t => {
  try {
	   molecule.addChild(molecule);
     t.fail();
  } catch (e) {
    t.deepEqual(e.message, 'You cannot add a child Molecule instance to itself');
  }
});

test('numChildren PROPERTY OF MOLECULE INSTANCE SHOULD BE 1', t => {
  t.deepEqual(molecule.numChildren, 1);
});

test('SHOULD PASS ATOM INSTANCE FROM MOLECULE INSTANCE TO ANOTHER MOLECULE INSTANCE', t => {
  molecule_2.addChild(atom);
  t.deepEqual(atom.parent, molecule_2);
});

test('MOLECULE_2 INSTANCE SHOULD CONTAIN ATOM INSTANCE', t => {
  t.true(molecule_2.contains(atom));
});
