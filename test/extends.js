'use strict';

import {
  Atom,
  Molecule,
  Organism,
  UIComponent,
  ActionDispatcher
} from '../lib/index.js';

import test from 'ava';

let actionDispatcher = new ActionDispatcher();
let uiComponent = new UIComponent();
let atom = new Atom();
let molecule = new Molecule();
let organism = new Organism();

test('UIComponent SHOULD BE AN EXTENSION OF ActionDispatcher', t => {
  t.truthy(uiComponent.actionFlow);
});
test('Atom SHOULD BE AN EXTENSION OF UIComponent', t => {
  t.truthy(atom.render);
});
test('Molecule SHOULD BE AN EXTENSION OF UIComponent', t => {
  t.truthy(molecule.render);
});
test('Organism SHOULD BE AN EXTENSION OF UIComponent', t => {
  t.truthy(organism.render);
});
