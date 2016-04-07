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

test('UIComponent debe ser una extencion de ActionDispatcher', t => {
  t.truthy(uiComponent.actionFlow);
});
test('Atom debe ser una extencion de UIComponent', t => {
  t.truthy(atom.render);
});
test('Molecule debe ser una extencion de UIComponent', t => {
  t.truthy(molecule.render);
});
test('Organism debe ser una extencion de UIComponent', t => {
  t.truthy(organism.render);
});
