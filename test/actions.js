'use strict';

import {
  Atom,
  Molecule,
  Organism,
  Action
} from '../lib/index.js';

import test from 'ava';

let atom = new Atom();
let molecule = new Molecule();
let organism = new Organism();

test.cb('ATOM SHOULD CALL ONE LISTENER', t => {
  t.plan(1);

  atom.addActionListener(Action.ACTIVATE, (a) => {
    t.deepEqual(a.type, Action.ACTIVATE);
    t.end();
  });

  atom.dispatchAction(Action.ACTIVATE);
});

test.cb('MOLECULE SHOULD CALL THE SECOND LISTENER BEFORE THE FIRST ONE', t => {
  t.plan(2);

  molecule.addActionListener(Action.ACTIVATE, (a) => {
    t.deepEqual(a.type, Action.ACTIVATE);
    t.end();
  });

  molecule.addActionListener(Action.ACTIVATE, (a) => {
    t.deepEqual(a.type, Action.ACTIVATE);
  }, 1);

  molecule.dispatchAction(Action.ACTIVATE);
});

test.cb('ORGANISM SHOULD CALL 3 LISTENERS BY CANCELING THE FIRST ONE AFTER HIS FIRST CALL', t => {
  t.plan(3);

  let times = 0;

  organism.addActionListener(Action.ACTIVATE, (a) => {
    t.deepEqual(a.type, Action.ACTIVATE);
  }, 0, true);

  organism.addActionListener(Action.ACTIVATE, (a) => {
    t.deepEqual(a.type, Action.ACTIVATE);
    if(times++ === 1)
      t.end();
  });

  organism.dispatchAction(Action.ACTIVATE);
  organism.dispatchAction(Action.ACTIVATE);
});
