'use strict';

import ComponentObject from '../core/ComponentObject';

/**
 * The Atom class is the abstract base class for all component objects with
 * which the user can interact, using the mouse, keyboard, or other user input
 * device.
 *
 * You cannot instantiate the Atom class directly. A call to the new Atom()
 * constructor throws an ArgumentError exception.
 *
 * @constructor {name} Instance Name
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

    Object.defineProperty(this, 'doubleClickEnabled', {
      value: true
    });

    /**
     * Specifies whether this object receives mouse, or other user input,
     * messages.
     *
     */

    Object.defineProperty(this, 'mouseEnabled', {
      value: true
    });

    /**
     * Specifies whether this object is in the tab order.
     *
     */

    Object.defineProperty(this, 'tabEnabled', {
      value: false
    });

    /**
     * Specifies the tab ordering.
     * The tabIndex property is -1 by default, meaning no tab index is set for
     * the object.
     *
     */

    Object.defineProperty(this, 'tabIndex', {
      value: -1
    });

    /**
     * Subscribe to DOM events after adding the component
     *
     */

    this.addActionListener(Action.ADDED, subscribeEvents, 0, true);
  }

  subscribeEvents(a) {
    this.view.addEventListener('onclick', this.onClick);
    this.view.addEventListener('oncopy', this.onCopy);
    this.view.addEventListener('oncut', this.onCut);
    this.view.addEventListener('ondclick', this.onDoubleClick);
    this.view.addEventListener('focusin', this.onFocusIn);
    this.view.addEventListener('focusout', this.onFocusOut);

    /**
     * Touch Events
     * ontouchcancel, ontouchend, ontouchmove, ontouchstart
     *
     * @todo {onLongPress} Dispatched when the user presses two points of
     * contact over the UIComponent instance on a touch-enable device
     * @todo {onPan} Dispatched when the user moves a point of contact over the
     * UIComponent instance on a touch-enable device
     * @todo {onRotate} Dispatched when the user performs a rotation gesture at
     * a point of contact with an UIComponent instance
     * @todo {onSwipe} Dispatched when the user performs a swipe gesture at a
     * point of contact with an UIComponent instance
     * @todo {onTap} Dispatched when the user creates a point of contact with an
     * UIComponent instance, then taps on a touch-enable device
     * @todo {onZoom} Dispatched when the user performs a zoom gesture at a
     * point of contact with an UIComponent instance
     *
     */

    this.view.addEventListener('onkeydown', this.onKeyDown);
    this.view.addEventListener('onkeyup', this.onKeyUp);
    this.view.addEventListener('onmousedown', this.onMouseDown);
    this.view.addEventListener('onmousemove', this.onMouseMove);
    this.view.addEventListener('onmouseout onmouseleave', this.onMouseOut);
    this.view.addEventListener('onmouseover onmouseenter', this.onMouseOver);
    this.view.addEventListener('onmouseup', this.onMouseUp);
    this.view.addEventListener('onwheel', this.onMouseWheel);
    this.view.addEventListener('onpaste', this.onPaste);
    this.view.addEventListener('ontouchstart', this.onTouchBegin);
    this.view.addEventListener('ontouchend', this.onTouchEnd);
    this.view.addEventListener('ontouchmove', this.onTouchMove);
  }
}

export default Atom;
