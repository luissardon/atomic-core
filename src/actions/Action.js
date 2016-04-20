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
 * @param {type} The type of the action, accessible as Action.type.
 */

class Action {
  constructor(type) {
    this.type = type;
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
