'use strict';

const ACTIVATE    = 'activate';
const ADDED       = 'added';
const CANCEL      = 'cancel';
const CLEAR       = 'clear';
const CLOSE       = 'close';
const CLOSING     = 'closing';
const COMPLETE    = 'complete';
const COPY        = 'copy';
const CUT         = 'cut';
const DEACTIVATE  = 'deactivate';
const EXITING     = 'exiting';
const FULLSCREEN  = 'fullScreen';
const INIT        = 'init';
const OPEN        = 'open';
const PASTE       = 'paste';
const REMOVED     = 'removed';
const RENDER      = 'render';
const SELECT      = 'select';

/**
 * The Action class is used as the base class for the creation of Action objects,
 * which are passed as parameters to action listeners when an action occurs.
 *
 * The properties of the Action class carry basic information about an action,
 * such as the action's type or whether the action's default behavior can be
 * canceled. For many actions, such as the actions represented by the Action
 * class constants, this basic information is sufficient. Other actions, however,
 * may require more detailed information. Actions associated with a mouse click,
 * for example, need to include additional information about the location of the
 * click action and whether any keys were pressed during the click action. You
 * can pass such additional information to action listeners by extending the
 * Action class, which is what the MouseAction class does. The Atomic-core
 * library defines several Action subclasses for common actions that require
 * additional information. Actions associated with each of the Action subclasses
 * are described in the documentation for each class.
 *
 * @param {type:String} The type of the action, accessible as Action.type.
 * @param {bubbles:Boolean} (default: false) Determines whether the Action
 * object participates in the bubbling stage of the action flow. The default
 * value is false.
 * @param {cancelable:Boolean} (default: false) Determines whether the Action
 * object can be canceled. The default values is false.
 *
 * @author Luis Sardon
 *
 */

class Action {
  constructor(type, bubbles, cancelable) {
    this.type = type;
    this.bubbles = bubbles || false;
    this.cancelable = cancelable || false;

    /**
     * The event target. This property contains the target node. For example,
     * if a user clicks a button, the target node is the display list node
     * containing that button.
     *
     */

    Object.defineProperty(this, 'target', {
      value: null,
      writable: true
    });
  }

  static get ACTIVATE()   { return ACTIVATE;    }
  static get ADDED()      { return ADDED;       }
  static get CANCEL()     { return CANCEL;      }
  static get CLEAR()      { return CLEAR;       }
  static get CLOSE()      { return CLOSE;       }
  static get CLOSING()    { return CLOSING;     }
  static get COMPLETE()   { return COMPLETE;    }
  static get COPY()       { return COPY;        }
  static get CUT()        { return CUT;         }
  static get DEACTIVATE() { return DEACTIVATE;  }
  static get EXITING()    { return EXITING;     }
  static get FULLSCREEN() { return FULLSCREEN;  }
  static get INIT()       { return INIT;        }
  static get OPEN()       { return OPEN;        }
  static get PASTE()      { return PASTE;       }
  static get REMOVED()    { return REMOVED;     }
  static get RENDER()     { return RENDER;      }
  static get SELECT()     { return SELECT;      }
}

export default Action;
