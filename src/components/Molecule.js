'use strict';

import Action         from '../actions/Action';
import ArgumentError  from '../errors/ArgumentError';
import Atom           from './Atom';

/**
 * The Molecule class is the base class for all objects that can serve as
 * component object containers on the component list. The component list manages
 * all objects componented. Use the Molecule class to arrange the component
 * objects in the component list. Each Molecule object has its own child list for
 * organizing the order of the objects. The order is the up-to-down order
 * that determines which object is added before, which is after, and so on.
 *
 * Atom is an abstract base class; therefore, you cannot call Atom directly.
 * Invoking new Atom() throws an ArgumentError exception.
 *
 * The Molecule class is an abstract base class for all objects that can contain
 * child objects. It cannot be instantiated directly; calling the new Molecule()
 * constructor throws an ArgumentError exception.
 *
 * @constructor {name} The name of the component, which it will be used to
 * locate their html view in the DOM.
 *
 * @author Luis Sardon
 *
 */

class Molecule extends Atom {
  constructor(name) {
    super(name);

    if (new.target === Molecule) {
      throw new ArgumentError("Yout cannot instantiate the Molecule class directly");
    }

    /**
     * Child list
     *
     */

    this.children = [];

    /**
     * Determines whether or not the children of the component object are mouse,
     * or user input device, enabled.
     *
     */

    this.mouseChildren = true;

    /**
     * Determines whether the children of the component object are tab enabled.
     *
     */

    this.tabChildren = true;
  }

  /**
   * Get type
   *
   * @return {String} Componen Type
   */

  get type() {
    return "Molecule";
  }

  /**
   * [Read-only] Set numChildren
   *
   * @throws {ArgumentError} Throws when you try to modify the value of
   * numChildren
   *
   */

  set numChildren(value) {
    throw new ArgumentError('Cannot assign to read only property \'numChildren\'');
  }

  /**
   * Get numChildren
   *
   * @return {int} Returns the number of children of this component object.
   *
   */

  get numChildren() {
    return this.children.length;
  }

  /**
   * Adds a child Atom instance to this Molecule instance. The child is added
   * after all other children in this Molecule instance. (To add a child to a
   * specific index position, use the addChildAt() method.)
   *
   * If you add a child object that already has a different component object
   * container as a parent, the object is removed from the child list of the
   * other component object container.
   *
   * @param {child:Atom} The Atom instance to add as a child of this Molecule
   * instance.
   *
   * @return {Atom} The Atom instance that you pass in the child parameter.
   *
   * @action {added} Dispatched when a component object is added to the
   * component list.
   *
   * @throws {ArgumentError} Throws when the child is not an Atom instance, also
   * throws when the child is the same as the parent, and when the child is a
   * Molecule instance or Organism instance.
   *
   */

  addChild(child) {
    return this.addChildAt(child, this.children.length);
  }

  /**
   * Adds a child Atom instance to this Molecule instance. The child is added at
   * the index position specified. An index of 0 represents the bottom of the
   * component list for this Molecule object.
   *
   * If you add a child object that already has a different component object
   * container as a parent, the object is removed from the child list of the
   * other component object container.
   *
   * @param {child:Atom} The Atom instance to add as a child of this Molecule
   * instance.
   * @param {index:int} The index position to which the child is added. If you
   * specify a currently occupied index position, the child object that exists
   * at that position and all higher positions are moved up one position in the
   * child list.
   *
   * @return {Atom} The Atom instance to add as a child of this Molecule
   * instance.
   *
   * @action {added} Dispatched when a component object is added to the
   * component list.
   *
   * @throws {RangeError} Throws if the index position does not exist in the
   * child list.
   * @throws {ArgumentError} Throws when the child is not an Atom instance, also
   * throws when the child is the same as the parent, and when the child is a
   * Molecule instance or Organism instance.
   *
   */

  addChildAt(child, index) {
    let validChild = this.isValidChild(child);
    let newChild = child.parent !== this;

    if(validChild instanceof Error)
      throw validChild;

    // TODO: append child.view to this.view

    child.parent = this;
    child.index = index;

    if(newChild)
      this.children.push(child);

    this.updateChildren();

    if(newChild)
      child.dispatchAction(Action.ADDED);

    child.addActionListener(Atom.PARENT_CHANGED, this.handleChildParentChanged);

    return child;
  }

  /**
   * Handle the PARENT_CHANGED action from an existing child.
   *
   * @param {a:Action}
   *
   */

  handleChildParentChanged(a) {
    let child = a.target;

    if(child.parent !== this) {
      this.children.splice(this.getChildIndex(child), 0);
      child.removeActionListener(Atom.PARENT_CHANGED, this.handleChildParentChanged);
    }
  }

  /**
   * Checking if the child object is valid for this Molecule instance.
   *
   * @return {boolean} Returns true when it pass the validation, otherwise
   * new ArgumentError.
   *
   */

  isValidChild(child) {
    if(child instanceof Atom) {

      if(child === this) {
        return new ArgumentError('You cannot add a child Molecule instance to itself');
      }

      if(child.type === "Molecule") {
        return new ArgumentError('You cannot add a child Molecule instance to this Molecule instance');
      }

      if(child.type === "Organism") {
        return new ArgumentError('You cannot add a child Organism instance to this Molecule instance');
      }

      return true;
    }

    return new ArgumentError('You can only add a child Atom instance to this Molecule instance');
  }

  /**
   * Checking if the inedx position exist in the child list.
   *
   * @return {boolean} Returns true when it pass the validation, otherwise
   * new RangeError.
   *
   */

  isValidIndex(index) {
    if(index > this.children.length || index < 0)
      return new RangeError(`The index "${index}" position does not exist in the child list`);

    return true;
  }

  /**
   * Determines whether the specified component object is a child of the
   * Molecule instance or the instance itself. The search includes the entire
   * component list including this Molecule instance. Grandchildren,
   * great-grandchildren, and so on each return true.
   *
   * @param {child:Atom} The child object to test.
   *
   * @return {boolean} true if the child object is a child of the Molecule or
   * the container itself; otherwise false.
   *
   */

  contains(child) {
    if(child === this)
      return true;

    if(child instanceof Atom && child.parent === this)
      return true;

    this.children.forEach(el => {
      if(el.contains(child))
        return true;
    });

    return false;
  }

  /**
   * Returns the child component object instance that exists at the specified
   * index.
   *
   * @param {index:int} The index position of the child object.
   *
   * @return {Atom} The child component object at the specified index
   * position.
   *
   * @throws {RangeError} Throws if the index position does not exist in the child list.
   *
   */

  getChildAt(index) {
    let validIndex = this.isValidIndex(index);

    if(validIndex instanceof Error)
      throw validIndex;

    return this.children[index];
  }

  /**
   * Returns the child component object that exists with the specified name.
   *
   * The getChildAt() method is faster than the getChildByName() method. The
   * getChildAt() method accesses a child from a cached array, whereas the
   * getChildByName() method has to traverse a linked list to access a child.
   *
   * @param {name:String} The name of the child to return.
   *
   * @return {Atom} The child component object with the specified name.
   *
   */

  getChildByName(name) {
    for (let child of this.children) {
      if(child.name === name) {
        return child;
      }
    }

    return null;
  }


  /**
   * Returns the index position of a child Atom instance.
   *
   * @param {child:Atom} The Atom instance to identify.
   *
   * @return {int} The index position of the child component object to identify.
   *
   * @throws {ArgumentError} Throws when the child parameter is not a child of
   * this object.
   *
   */

  getChildIndex(child) {
    if(child.parent !== this)
      throw new ArgumentError('The child parameter is not a child of this object.');

    this.children.forEach((el, i) => {
      if(el === child) {
        return i;
      }
    });
  }

  /**
   * Removes the specified child Atom instance from the child list of the
   * Molecule instance. The parent property of the removed child is set to null,
   * and the object is garbage collected if no other references to the child
   * exist. The index positions of any component objects above the child in the
   * Molecule are decreased by 1.
   *
   * The garbage collector reallocates unused memory space. When a variable or
   * object is no longer actively referenced or stored somewhere, the garbage
   * collector sweeps through and wipes out the memory space it used to occupy
   * if no other references to it exist.
   *
   * @param {child} The Component instance to remove
   *
   * @return {Atom} The Component instance that you pass in the child parameter.
   *
   * @throws {ArgumentError} Throws if the child parameter is not a child of
   * this object.
   *
   */

  removeChild(child) {
    // TODO: remove child.view from this.view

    if(child.parent !== this)
      throw new ArgumentError('The child parameter is not a child of this object.');

    this.children.splice(this.getChildIndex(child), 1);
    child.parent = null;

    child.dispatchAction(Action.REMOVED);
    child.removeActionListener(Atom.PARENT_CHANGED, this.handleChildParentChanged);

    return child;
  }

  /**
   * Removes a child Atom from the specified index position in the child list of
   * the Molecule. The parent property of the removed child is set to null, and
   * the object is garbage collected if no other references to the child exist.
   * The index positions of any component objects above the child in the
   * Molecule are decreased by 1.
   *
   * The garbage collector reallocates unused memory space. When a variable or
   * object is no longer actively referenced or stored somewhere, the garbage
   * collector sweeps through and wipes out the memory space it used to occupy
   * if no other references to it exist.
   *
   * @param {index:int} The child index of the Atom to remove.
   *
   * @return {Atom} The Atom instance that was removed.
   *
   * @throws {RangeError} Throws if the index does not exist in the child list.
   *
   */

  removeChildAt(index) {
    let child = this.getChildAt(index);
    return this.removeChild(child);
  }

  /**
   * Removes all child Atom instances from the child list of the Molecule
   * instance. The parent property of the removed children is set to null, and
   * the objects are garbage collected if no other references to the children
   * exist.
   *
   * The garbage collector reallocates unused memory space. When a variable or
   * object is no longer actively referenced or stored somewhere, the garbage
   * collector sweeps through and wipes out the memory space it used to occupy
   * if no other references to it exist.
   *
   * @param {beginIndex:int} (default: 0) The beginning position. A value
   * smaller than 0 throws a RangeError.
   * @param {endIndex:int} (default: 0x7fffffff) The ending position. A value
   * smaller than 0 throws a RangeError.
   *
   * @throws {RangeError} Throws if the beginIndex or endIndex positions do not
   * exist in the child list.
   *
   */

  removeChildren(beginIndex, endIndex) {
    beginIndex = beginIndex || 0;
    endIndex = endIndex || this.children.length;

    let removeChildren = this.children.slice(beginIndex, endIndex);

    removeChildren.forEach(el => {
      this.removeChild(el);
    });
  }

  /**
   * Updates the position of all existing childs in the component object
   * container.
   *
   */

  updateChildren() {
    this.children.forEach((el, i) => {
      if(el.index !== undefined && el.index !== i) {
        this.children.splice(i, 1);
        this.children.splice(el.index, 0, el);
      }

      delete el.index;
    });
  }

  /**
   * TODO: Changes the position of an existing child in the component object
   * container.
   *
   * @param {child:Atom} The child DisplayObject instance for which you want to
   * change the index number.
   * @param {index:int} The resulting index number for the child component object.
   *
   * @throws {RangeError} Throws if the index does not exist in the child list.
   * @throws {ArgumentError} Throws if the child parameter is not a child of
   * this object.
   *
   */

  setChildIndex(child, index) {
    let validChild = this.isValidChild(child);
    let validIndex = this.isValidIndex(index);

    if(validChild instanceof Error)
      throw validChild;

    if(validIndex instanceof Error)
      throw validIndex;

    child.index = index;

    this.updateChildren();
  }

  /**
   * TODO: Swaps the order (up-to-down) of the two specified child objects. All
   * other child objects in the component object container remain in the same
   * index positions.
   *
   * @param {child1:Atom} The first child object.
   * @param {child2:Atom} The second child object.
   *
   * @throws {ArgumentError} Throws if either child parameter is not a child of
   * this object.
   *
   */

  swapChildren(child1, child2) {
  }

  /**
   * TODO: Swaps the order (up-to-down) of the child objects at the two
   * specified index positions in the child list. All other child objects in the
   * component object container remain in the same index positions.
   *
   * @param {child1:Atom} The index position of the first child object.
   * @param {child2:Atom} The index position of the second child object.
   *
   * @throws {RangeError} If either index does not exist in the child list.
   *
   */

  swapChildrenAt(index1, index2) {
  }
}

export default Molecule;
