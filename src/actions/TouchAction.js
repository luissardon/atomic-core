'use strict';

const TOUCH_CANCEL  = 'touchCancel';
const TOUCH_END     = 'touchEnd';
const TOUCH_MOVE    = 'touchMove';
const TOUCH_BEGIN   = 'touchBegin';

/**
 * TODO: TouchAction description
 *
 * @constructor {type} The type of the action, accessible as TouchAction.type.
 *
 * @author Luis Sardon
 *
 */

class TouchAction {
  constructor(type) {
    this.type = type;
  }

  static get TOUCH_CANCEL() { return TOUCH_CANCEL;  }
  static get TOUCH_END()    { return TOUCH_END;     }
  static get TOUCH_MOVE()   { return TOUCH_MOVE;    }
  static get TOUCH_BEGIN()  { return TOUCH_BEGIN;   }
}

export default TouchAction;
