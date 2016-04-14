# atomic-core [![NPM version][npm-image]][npm-url]
Librería Javascript con POO para la creación de Componentes bajo el *Sistema de
Diseño Atómico* para el **Proyecto Atomic**.

Lee más acerca de este proyecto [aquí](#).

## Traducciones
* [Inglés](https://github.com/luissardon/atomic-core/blob/master/README.md)

## Cómo funciona

Esta librería funciona bajo el concepto de *diseño atómico*, por lo que su unico
propósito es el de darnos una forma de manejar la parte **funcional** de este
concepto, para la creación de componentes.

Si no conoces nada de el *Proyecto Atomic*, te recomiendo que primero leas
***"Partes de un Componente Atomic"*** [aquí](#).

### Características
- Creación de Clases de los Componentes por medio de *[Herencia](#)*.
- Localización de la vista enviando el *[ID del Componente (cid)](#)* a través del
constructor de la clase.
- Manejo de la comunicación entre componentes a través del
*[Despachador de Acciones](#)*.
- *[Acceso global](#)* hacia los componentes.

## Empezando

### Instalación

#### Node
npm install atomic-core --save

### Creando un Componente

#### 1º Crear un Componente
En un nuevo archivo, vamos a crear una clase ***Button*** que extienda de Atom.

```javascript
//- button.js

'use strict';

import Atom from 'atomic-core';

/**
 * Componente Button
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

#### 2º Instanciando un Componente
Para este caso la única forma de instanciar un *Átomo* es dentro de una *Molécula* o
un *Organismo*, por lo que en un nuevo archivo, vamos a crear la clase ***Menu*** que
extienda de *Molecule* para conseguirlo.

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

    this.miBoton = new Button('miBoton');
    // Donde 'miBoton' es el valor del atributo data-cid del componente
    // desde la vista html.
  }
}

extends default Menu;
```
... actualmente en desarrollo...

[npm-image]: https://img.shields.io/npm/v/atomic-core.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/atomic-core
