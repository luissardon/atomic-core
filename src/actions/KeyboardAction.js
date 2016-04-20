'use strict';

const KEY_DOWN  = 'keyDown';
const KEY_PRESS = 'keyPress';
const KEY_UP    = 'KeyUp';

/**
 * A KeyboardAction object is dispatched in response to user input through a
 keyboard.
 *
 * @param {type} The type of the action, accessible as KeyboardAction.type.
 */

class KeyboardAction {
  constructor(type) {
    this.type = type;
  }

  static get KEY_DOWN()   { return KEY_DOWN;  }
  static get KEY_PRESS()  { return KEY_PRESS; }
  static get KEY_UP()     { return KEY_UP;    }
}

export default KeyboardAction;
