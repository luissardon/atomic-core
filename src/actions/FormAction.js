'use strict';

const BLUR      = 'blur';
const CHANGE    = 'change';
const FOCUS     = 'focus';
const FOCUS_IN  = 'focusIn';
const FOCUS_OUT = 'focusOut';
const INPUT     = 'input';
const INVALID   = 'invalid';
const RESET     = 'reset';
const SEARCH    = 'search';

/**
 * TODO: FormAction description
 *
 * @param {type} The type of the action, accessible as FormAction.type.
 */

class FormAction {
  constructor(type) {
    this.type = type;
  }

  static get BLUR()       { return BLUR;      }
  static get CHANGE()     { return CHANGE;    }
  static get FOCUS()      { return FOCUS;     }
  static get FOCUS_IN()   { return FOCUS_IN;  }
  static get FOCUS_OUT()  { return FOCUS_OUT; }
  static get INPUT()      { return INPUT;     }
  static get INVALID()    { return INVALID;   }
  static get RESET()      { return RESET;     }
  static get SEARCH()     { return SEARCH;    }
}

export default FormAction;
