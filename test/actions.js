'use strict';

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
let organism = new neoOrganism();

test.cb('SHOULD CALL ONE LISTENER', t => {
  t.plan(1);

  atom.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
    t.end();
  }, 0, true);

  atom.dispatchAction('TEST');
});

test.cb('SHOULDN\'T CALL A LISTENER', t => {
  t.plan(0);

  atom.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
  });

  atom.active = false;
  atom.dispatchAction('TEST');

  t.end();
});

test.cb('SHOULD CALL THE SECOND LISTENER BEFORE THE FIRST ONE', t => {
  t.plan(2);

  molecule.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
    t.end();
  });

  molecule.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
  }, 1);

  molecule.dispatchAction('TEST');
});

test.cb('SHOULD CALL 3 LISTENERS BY CANCELING THE FIRST ONE AFTER HIS FIRST CALL', t => {
  t.plan(3);

  let times = 0;

  organism.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
  }, 0, true);

  organism.addActionListener('TEST', (a) => {
    t.deepEqual(a.type, 'TEST');
    if(times++ === 1)
      t.end();
  });

  organism.dispatchAction('TEST');
  organism.dispatchAction('TEST');
});
