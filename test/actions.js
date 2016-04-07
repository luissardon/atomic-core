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

test.cb('molecule action listener ACTIVATE should dispatch 2 listeners', t => {
  t.plan(2);

  molecule.addActionListener(Action.ACTIVATE, (a) => {
    console.log(a);
    t.pass();
    t.end();
  });

  molecule.addActionListener(Action.ACTIVATE, (a) => {
    console.log(a);
    t.pass();
    t.end();
  },1);

  molecule.dispatchAction(Action.ACTIVATE);
});
