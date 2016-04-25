/*jshint sub:true*/
/*jshint -W078*/

'use strict';

import Utils            from '../utils/Utils';
import Action           from '../actions/Action';
import MouseAction      from '../actions/MouseAction';
import KeyboardAction   from '../actions/KeyboardAction';
import FormAction       from '../actions/FormAction';
import TouchAction      from '../actions/TouchAction';
import ComponentObject  from './ComponentObject';

const PARENT_CHANGED = 'parentChanged';

/**
 * The Atom class is the abstract base class for all component objects with
 * which the user can interact, using the mouse, keyboard, or other user input
 * device.
 *
 * You cannot instantiate the Atom class directly. A call to the new Atom()
 * constructor throws an TypeError exception.
 *
 * @constructor {name} The name of the component, which it will be used to
 * locate their html view in the DOM.
 *
 * @author Luis Sardon
 *
 */

class Atom extends ComponentObject {
  constructor(name) {
    super(name);

    if (new.target === Atom) {
      throw new TypeError("Yout cannot instantiate the Atom class directly");
    }

    /**
     * Specifies whether the object receives doubleClick actions.
     *
     */

    this.doubleClickEnabled = true;

    /**
     * Specifies whether this object receives mouse, or other user input,
     * messages.
     *
     * If mouseEnabled is set to false, the instance does not receive any mouse
     * actions (or other user input actions like keyboard actions).
     */

    this.mouseEnabled = true;

    /**
     * Specifies whether this object is in the tab order.
     *
     */

    this.tabEnabled = false;

    /**
     * Specifies the tab ordering.
     * The tabIndex property is -1 by default, meaning no tab index is set for
     * the object.
     *
     */

    this.tabIndex = -1;

    /**
     * Subscribe to DOM events after adding the component
     *
     */

    if(Utils.isClient())
      this.addActionListener(Action.ADDED, this.subscribeEvents, 0, true);
  }

  static get PARENT_CHANGED() { return PARENT_CHANGED; }

  /**
   * Parent instance
   *
   */

   get parent() {
     return this._parent;
   }

   /**
    * Autoremove Component from parent before moving
    *
    */

  set parent(value) {
    if(this._parent !== value) {
      this._parent = value;
      this.dispatchAction(Atom.PARENT_CHANGE);
    }
  }

  /**
   * Component type
   *
   */

  get type() {
    return "Atom";
  }

  subscribeEvents(a) {
    this.view.addEventListener('onclick',       this.handleEventListener);
    this.view.addEventListener('ondclick',      this.handleEventListener);
    this.view.addEventListener('onmousedown',   this.handleEventListener);
    this.view.addEventListener('onmouseenter',  this.handleEventListener);
    this.view.addEventListener('onmouseleave',  this.handleEventListener);
    this.view.addEventListener('onmousemove',   this.handleEventListener);
    this.view.addEventListener('onmouseover',   this.handleEventListener);
    this.view.addEventListener('onmouseout',    this.handleEventListener);
    this.view.addEventListener('onmouseup',     this.handleEventListener);
    this.view.addEventListener('onwheel',       this.handleEventListener);
    this.view.addEventListener('onkeydown',     this.handleEventListener);
    this.view.addEventListener('onkeypress',    this.handleEventListener);
    this.view.addEventListener('onkeyup',       this.handleEventListener);
    this.view.addEventListener('onblur',        this.handleEventListener);
    this.view.addEventListener('onchange',      this.handleEventListener);
    this.view.addEventListener('onfocus',       this.handleEventListener);
    this.view.addEventListener('onfocusin',     this.handleEventListener);
    this.view.addEventListener('onfocusout',    this.handleEventListener);
    this.view.addEventListener('oninput',       this.handleEventListener);
    this.view.addEventListener('oninvalid',     this.handleEventListener);
    this.view.addEventListener('onreset',       this.handleEventListener);
    this.view.addEventListener('onsearch',      this.handleEventListener);
    this.view.addEventListener('onselect',      this.handleEventListener);
    this.view.addEventListener('oncopy',        this.handleEventListener);
    this.view.addEventListener('oncut',         this.handleEventListener);
    this.view.addEventListener('onpaste',       this.handleEventListener);
    this.view.addEventListener('ontouchcancel', this.handleEventListener);
    this.view.addEventListener('ontouchend',    this.handleEventListener);
    this.view.addEventListener('ontouchmove',   this.handleEventListener);
    this.view.addEventListener('ontouchstart',  this.handleEventListener);
  }

  /**
   * Handle Event Listener
   * Transform DOM Event into Action
   *
   * @param {e} Event
   *
   */

  handleEventListener(e) {
    let action = false;
    let data = {};

    switch (e.type) {
      case 'onclick':
        action = new MouseAction      (MouseAction    .CLICK        , data);
        break;
      case 'ondclick':
        if(this.doubleClickEnabled)
          action = new MouseAction    (MouseAction    .DOUBLE_CLICK , data);
        break;
      case 'onmousedown':
        action = new MouseAction      (MouseAction    .MOUSE_DOWN   , data);
        break;
      case 'onmouseenter':
        action = new MouseAction      (MouseAction    .MOUSE_ENTER  , data);
        break;
      case 'onmouseleave':
        action = new MouseAction      (MouseAction    .MOUSE_LEAVE  , data);
        break;
      case 'onmousemove':
        action = new MouseAction      (MouseAction    .MOUSE_MOVE   , data);
        break;
      case 'onmouseover':
        action = new MouseAction      (MouseAction    .MOUSE_OVER   , data);
        break;
      case 'onmouseout':
        action = new MouseAction      (MouseAction    .MOUSE_OUT    , data);
        break;
      case 'onmouseup':
        action = new MouseAction      (MouseAction    .MOUSE_UP     , data);
        break;
      case 'onwheel':
        action = new MouseAction      (MouseAction    .WHEEL        , data);
        break;
      case 'onkeydown':
        action = new KeyboardAction   (KeyboardAction .KEY_DOWN     , data);
        break;
      case 'onkeypress':
        action = new KeyboardAction   (KeyboardAction .KEY_PRESS    , data);
        break;
      case 'onkeyup':
        action = new KeyboardAction   (KeyboardAction .KEY_UP       , data);
        break;
      case 'onblur':
        action = new FormAction       (FormAction     .BLUR         , data);
        break;
      case 'onchange':
        action = new FormAction       (FormAction     .CHANGE       , data);
        break;
      case 'onfocus':
        action = new FormAction       (FormAction     .FOCUS        , data);
        break;
      case 'onfocusin':
        action = new FormAction       (FormAction     .FOCUS_IN     , data);
        break;
      case 'onfocusout':
        action = new FormAction       (FormAction     .FOCUS_OUT    , data);
        break;
      case 'oninput':
        action = new FormAction       (FormAction     .INPUT        , data);
        break;
      case 'oninvalid':
        action = new FormAction       (FormAction     .INVALID      , data);
        break;
      case 'onreset':
        action = new FormAction       (FormAction     .RESET        , data);
        break;
      case 'onsearch':
        action = new FormAction       (FormAction     .SEARCH       , data);
        break;
      case 'onselect':
        action = new Action           (Action         .SELECT       , data);
        break;
      case 'oncopy':
        action = new Action           (Action         .COPY         , data);
        break;
      case 'oncut':
        action = new Action           (Action         .CUT          , data);
        break;
      case 'onpaste':
        action = new Action           (Action         .PASTE        , data);
        break;
      case 'ontouchcancel':
        action = new TouchAction      (TouchAction    .TOUCH_CANCEL , data);
        break;
      case 'ontouchend':
        action = new TouchAction      (TouchAction    .TOUCH_END    , data);
        break;
      case 'ontouchmove':
        action = new TouchAction      (TouchAction    .TOUCH_MOVE   , data);
        break;
      case 'ontouchstart':
        action = new TouchAction      (TouchAction    .TOUCH_BEGIN  , data);
        break;
    }

    if(action) {
      if(!this.mouseEnabled) {
        if(action instanceof MouseAction ||
           action instanceof KeyboardAction ||
           action instanceof FormAction) {
           return;
        }
      }

      this.dispatchAction(action);
    }
  }
}

export default Atom;
