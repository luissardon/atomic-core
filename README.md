# atomic-core [![NPM version][npm-image]][npm-url]
OOP Javascript Library for Building Components Under the *Atomic Design System*
for **The Atomic Project**.

Learn more about *The Atomic Project* [here](https://github.com/luissardon/atomic-proyect/blob/master/README.md).

## Translations
* [Spanish](https://github.com/luissardon/atomic-core/blob/master/README-es.md)

## How it works

This library works under the concept of *atomic design*, so their only purpose
is to give us a way to manage the **functional** part in this concept, for
making components.

If you didn't know about *The Atomic Project* at all, I recommend you to first
take a look at ***"Parts of an Atomic Component"*** [here](#).

### Features
- Creating components classes by *[Inheritance](#)*.
- Targeting on his view by passing the *[Component's ID (cid)](#)* through the
constructor of the class.
- Manages communication between components through *[Actions Dispatchers](#)*.
- *[Global access](#)* to the components.

## Getting started

### Installation

#### Node
npm install atomic-core --save

### Making a Component

#### 1º Create a Component
Into a new file, we're going to create a ***Button*** class that extends from *Atom*.

```javascript
//- button.js

'use strict';

import Atom from 'atomic-core';

/**
 * Button Component
 *
 * @author Luis Sardon
 *
 * @type atom
 *
 */

class Button extends Atom {
  constructor(cid) {
    super(cid);
  }
}

extends default Button;
```

#### 2º Instantiate a Component
For this purpose the only way to instantiate an *Atom* is within a *Molecule* or *Organism*, so into a new file, we're going to create a ***Menu*** class that extends from *Molecule* to accomplish it.

```javascript
//- menu.js

'use strict';

import Molecule from 'atomic-core';
import Button from 'button.js';

/**
 * Menu Component
 *
 * @author Luis Sardon
 *
 * @type molecule
 *
 */

class Menu extends Molecule {
  constructor(cid) {
    super(cid);

    this.myButton = new Button('myButton');
    // where 'myButton' is the data-cid attribute value of the component
    // from the html view.
  }
}

extends default Menu;
```

... currently in development...

[npm-image]: https://img.shields.io/npm/v/atomic-core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/atomic-core
