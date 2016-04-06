/**
 * The ActionDispatcher class is the base class for all classes that dispatch
 * actions.
 * 
 */
class ActionDispatcher {
  
  constructor() {
    this.actionFlow = [];
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
   */
  addActionListener(type, listener, priority, useWeakReference) {
    priority = priority || 0;
    useWeakReference = useWeakReference || false;
  }
  
  /**
   * Dispatches an action into the action flow. The action target is the
   * ActionDispatcher object upon which the dispatchAction() method is called.
   * 
   * @param {action} The Action object that is dispatched into the action flow.
   * @return {boolean} A value of true if the action was successfully dispatched.
   *         A value of false indicates failure or that preventDefault() was
   *         called on the action.
   * 
   * @todo {Error} The action dispatch recursion limit has been reached.
   */
  dispatchAction(action) {
  }
  
  /**
   * Removes a listener from the ActionDispatcher object.
   * 
   * @param {type} The type of action.
   * @param {listener} The listener object to remove.
   */
  removeActionListener(type, listener) {
  }
}

export default ActionDispatcher;