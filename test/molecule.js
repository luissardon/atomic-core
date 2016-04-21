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

let atom = new neoAtom();
let molecule = new neoMolecule();
let molecule_2 = new neoMolecule();
let organism = new neoOrganism();

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
