'use strict';

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
    this.actionFlow = {};
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
    
    let actionListener = {
      listener : listener,
      priority : priority || 0,
      useWeakReference : useWeakReference || false
    }
    
    /**
     * Inject a unique id into the listener object so that the action
     * listener can never be duplicated.
     * 
     */
    
    listener.uid = listener.uid || Utils.getUID();
    
    /**
     * Create a new list of actionFlow
     *
     */
    
    this.actionFlow[type] = this.actionFlow[type] || [];
    this.actionFlow[type][priority] = this.actionFlow[type][priority] = []
    
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
      if(!actionList[i])
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
    let actionList = this.actionFlow[action.type];
    
    for (let i of actionList) {
      let priorityList = actionList[i];
      
      for (let i in priorityList) {
        let actionListener = priorityList[i];
        
        actionListener.listener.apply(this, [action]);
        
        if(actionListener.useWeakReference)
          delete this.actionFlow[action.type][actionListener.priority][i];
      }
    }
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
    
    for (let i of actionList) {
      let priorityList = actionList[i];
      
      for (let i in priorityList) {
        let actionListener = priorityList[i];
        
        delete this.actionFlow[type][actionListener.priority][i];
        
        break;
      }
    }
  }
}

export default ActionDispatcher;