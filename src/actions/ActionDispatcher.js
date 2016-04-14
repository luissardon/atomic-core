'use strict';

import Action from './Action';
import Utils from '../utils/Utils';

/**
 * The ActionDispatcher class is the base class for all classes that dispatch
 * actions.
 *
 * @author Luis Sardon
 *
 */

class ActionDispatcher {

  constructor() {

    /**
     * Define read-only 'actionFlow' property
     *
     */

    Object.defineProperty(this, 'actionFlow', {
      value: {}
    });

    /**
     * Define writable 'active' property
     *
     */

    Object.defineProperty(this, 'active', {
      value: true,
      writable: true
    });
  }

  /**
   * Get the Action Flow
   *
   */

  get actionFlow() {
    return this['actionFlow'];
  }

  /**
   * Know whether the Action Dispatcher is active or not.
   *
   */

  get active() {
    return this['active'];
  }

  /**
   * Activate/Deactivate dispatch actions
   * @param {value} Boolean
   */

  set active(value) {
    if(this.active === false && value === true) {
      dispatchAction(Action.ACTIVATE);
    }

    if(this.active === true && value === false) {
      dispatchAction(Action.DEACTIVATE);
    }

    this['active'] = false;
  }

  /**
   * Registers an action listener object with an ActionDispatcher object so
   * that the listener receives notification of an action.
   *
   * @param {type} The type of action.
   * @param {listener} The listener function that processes the action.
   * @param {priority} (default = 0) The priority level of the action
   *        listener.
   * @param {useWeakReference} (default = false) Determines whether the
   *        reference to the listener is strong or weak.
   *
   * @todo {ArgumentError} The listener specified is not a function.
   *
   */

  addActionListener(type, listener, priority, useWeakReference) {
    priority = priority || 0;
    useWeakReference = useWeakReference || false;

    let actionListener = {
      listener : listener,
      priority : priority,
      useWeakReference : useWeakReference
    };

    /**
     * Inject a unique id into the listener object so that the action
     * listener can never be duplicated.
     *
     */

    listener.uid = listener.uid || Utils.getUID();

    /**
     * Create an actionFlow list
     *
     */

    this.actionFlow[type] = this.actionFlow[type] || [];
    this.actionFlow[type][priority] = this.actionFlow[type][priority] || [];

    /**
     * Add the listener object in to the action flow
     *
     */

    let priorityList = this.actionFlow[type][priority];
    let priorityIndex = priorityList.length;

    for (var i in priorityList) {
      if(priorityList[i].listener.uid === listener.uid) {
        priorityIndex = i;
        break;
      }
    }

    /**
     * Clear undefined slots
     *
     */
    let actionList = this.actionFlow[type];

    for (let i in actionList) {
      if(actionList[i] === undefined)
        delete this.actionFlow[type][i];
    }

    this.actionFlow[type][priority][priorityIndex] = actionListener;
  }

  /**
   * Dispatches an action into the action flow. The action target is the
   * ActionDispatcher object upon which the dispatchAction() method is called.
   *
   * @param {action} The Action object that is dispatched into the action flow.
   * @return {boolean} A value of true if the action was successfully dispatched.
   *         A value of false indicates failure.
   *
   * @todo {Error} The action dispatch recursion limit has been reached.
   *
   */

  dispatchAction(action) {
    if(this.active === false) {
      return listeners;
    }

    action = typeof action === "string" ? new Action(action) : action;
    let actionList = this.actionFlow[action.type];
    let listeners = [];

    let orderedActionList = [].concat(actionList).reverse();
    for (let i in orderedActionList) {
      let priorityList = orderedActionList[i];

      for (let i in priorityList) {
        let actionListener = priorityList[i];

        actionListener.listener.apply(this, [action]);
        listeners.push(actionListener);

        if(actionListener.useWeakReference)
          delete this.actionFlow[action.type][actionListener.priority][i];
      }
    }

    return listeners;
  }

  /**
   * Removes a listener from the ActionDispatcher object.
   *
   * @param {type} The type of action.
   * @param {listener} The listener object to remove.
   *
   */

  removeActionListener(type, listener) {
    let actionList = this.actionFlow[type];

    for (let i in actionList) {
      let priorityList = actionList[i];

      for (let i in priorityList) {
        let actionListener = priorityList[i];

        if(actionListener.listener.uid === listener.uid)
          delete this.actionFlow[type][actionListener.priority][i];

        break;
      }
    }
  }
}

export default ActionDispatcher;
