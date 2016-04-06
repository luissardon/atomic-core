(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _Atom = require('./lib/components/Atom');

var _Atom2 = _interopRequireDefault(_Atom);

var _Molecule = require('./lib/components/Molecule');

var _Molecule2 = _interopRequireDefault(_Molecule);

var _Organism = require('./lib/components/Organism');

var _Organism2 = _interopRequireDefault(_Organism);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _Atom2.default;
exports.default = _Molecule2.default;
exports.default = _Organism2.default;

},{"./lib/components/Atom":3,"./lib/components/Molecule":4,"./lib/components/Organism":5}],2:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _Utils = require('../utils/Utils');

var _Utils2 = _interopRequireDefault(_Utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The ActionDispatcher class is the base class for all classes that dispatch
 * actions.
 * 
 * @author Luis Sardon
 * 
 */

var ActionDispatcher = function () {
  function ActionDispatcher() {
    _classCallCheck(this, ActionDispatcher);

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

  _createClass(ActionDispatcher, [{
    key: 'addActionListener',
    value: function addActionListener(type, listener, priority, useWeakReference) {

      var actionListener = {
        listener: listener,
        priority: priority || 0,
        useWeakReference: useWeakReference || false
      };

      /**
       * Inject a unique id into the listener object so that the action
       * listener can never be duplicated.
       * 
       */

      listener.uid = listener.uid || _Utils2.default.getUID();

      /**
       * Create a new list of actionFlow
       *
       */

      this.actionFlow[type] = this.actionFlow[type] || [];
      this.actionFlow[type][priority] = this.actionFlow[type][priority] = [];

      /**
       * Add the listener object in to the action flow
       *
       */

      var priorityList = this.actionFlow[type][priority];
      var priorityIndex = priorityList.length;

      for (var i in priorityList) {
        if (priorityList[i].listener.uid === listener.uid) {
          priorityIndex = i;
          break;
        }
      }

      /**
       * Clear undefined slots
       *
       */
      var actionList = this.actionFlow[type];

      for (var _i in actionList) {
        if (!actionList[_i]) delete this.actionFlow[type][_i];
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

  }, {
    key: 'dispatchAction',
    value: function dispatchAction(action) {
      var actionList = this.actionFlow[action.type];

      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = actionList[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var i = _step.value;

          var priorityList = actionList[i];

          for (var _i2 in priorityList) {
            var actionListener = priorityList[_i2];

            actionListener.listener.apply(this, [action]);

            if (actionListener.useWeakReference) delete this.actionFlow[action.type][actionListener.priority][_i2];
          }
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator.return) {
            _iterator.return();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
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

  }, {
    key: 'removeActionListener',
    value: function removeActionListener(type, listener) {
      var actionList = this.actionFlow[type];

      var _iteratorNormalCompletion2 = true;
      var _didIteratorError2 = false;
      var _iteratorError2 = undefined;

      try {
        for (var _iterator2 = actionList[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
          var i = _step2.value;

          var priorityList = actionList[i];

          for (var _i3 in priorityList) {
            var actionListener = priorityList[_i3];

            delete this.actionFlow[type][actionListener.priority][_i3];

            break;
          }
        }
      } catch (err) {
        _didIteratorError2 = true;
        _iteratorError2 = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion2 && _iterator2.return) {
            _iterator2.return();
          }
        } finally {
          if (_didIteratorError2) {
            throw _iteratorError2;
          }
        }
      }
    }
  }]);

  return ActionDispatcher;
}();

exports.default = ActionDispatcher;

},{"../utils/Utils":7}],3:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UIComponent2 = require('../core/UIComponent');

var _UIComponent3 = _interopRequireDefault(_UIComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Atom class is the base class for all atom components, defining properties
 * and methods that are common to all atoms.
 * 
 */

var Atom = function (_UIComponent) {
  _inherits(Atom, _UIComponent);

  function Atom() {
    _classCallCheck(this, Atom);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Atom).call(this));
  }

  return Atom;
}(_UIComponent3.default);

exports.default = Atom;

},{"../core/UIComponent":6}],4:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UIComponent2 = require('../core/UIComponent');

var _UIComponent3 = _interopRequireDefault(_UIComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Molecule class is the base class for all molecule components, defining
 * properties and methods that are common to all molecules.
 * 
 */

var Molecule = function (_UIComponent) {
  _inherits(Molecule, _UIComponent);

  function Molecule() {
    _classCallCheck(this, Molecule);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Molecule).call(this));
  }

  return Molecule;
}(_UIComponent3.default);

exports.default = Molecule;

},{"../core/UIComponent":6}],5:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _UIComponent2 = require('../core/UIComponent');

var _UIComponent3 = _interopRequireDefault(_UIComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The Organism class is the base class for all organism components, defining
 * properties and methods that are common to all organisms.
 * 
 */

var Organism = function (_UIComponent) {
  _inherits(Organism, _UIComponent);

  function Organism() {
    _classCallCheck(this, Organism);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Organism).call(this));
  }

  return Organism;
}(_UIComponent3.default);

exports.default = Organism;

},{"../core/UIComponent":6}],6:[function(require,module,exports){
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _ActionDispatcher2 = require('../actions/ActionDispatcher');

var _ActionDispatcher3 = _interopRequireDefault(_ActionDispatcher2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * The UIComponent class is the base class for all atomic view components,
 * atoms, molecules and organisms.
 * 
 */

var UIComponent = function (_ActionDispatcher) {
  _inherits(UIComponent, _ActionDispatcher);

  function UIComponent() {
    _classCallCheck(this, UIComponent);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(UIComponent).call(this));
  }

  _createClass(UIComponent, [{
    key: 'render',
    value: function render() {}
  }]);

  return UIComponent;
}(_ActionDispatcher3.default);

exports.default = UIComponent;

},{"../actions/ActionDispatcher":2}],7:[function(require,module,exports){
'use strict';

/**
 * Utilities
 * 
 */

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Utils = function () {
  function Utils() {
    _classCallCheck(this, Utils);
  }

  _createClass(Utils, null, [{
    key: 'getUID',
    value: function getUID() {
      return Math.random().toString(36).substr(2, 9);
    }
  }]);

  return Utils;
}();

exports.default = Utils;

},{}],8:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _index = require('../../index.js');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Button = function (_Atom) {
  _inherits(Button, _Atom);

  function Button() {
    _classCallCheck(this, Button);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Button).call(this));
  }

  _createClass(Button, [{
    key: 'debug',
    value: function debug() {
      console.log('Hola soy', this);
    }
  }]);

  return Button;
}(_index.Atom);

var button = new Button();
button.debug();

},{"../../index.js":1}]},{},[8])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uLy4uL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIuLi8uLi9pbmRleC5qcyIsIi4uLy4uL2xpYi9hY3Rpb25zL0FjdGlvbkRpc3BhdGNoZXIuanMiLCIuLi8uLi9saWIvY29tcG9uZW50cy9BdG9tLmpzIiwiLi4vLi4vbGliL2NvbXBvbmVudHMvTW9sZWN1bGUuanMiLCIuLi8uLi9saWIvY29tcG9uZW50cy9PcmdhbmlzbS5qcyIsIi4uLy4uL2xpYi9jb3JlL1VJQ29tcG9uZW50LmpzIiwiLi4vLi4vbGliL3V0aWxzL1V0aWxzLmpzIiwic2NyaXB0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7Ozs7OztBQUVBOzs7O0FBQ0E7Ozs7QUFDQTs7Ozs7Ozs7Ozs7QUNKQTs7Ozs7Ozs7QUFFQTs7Ozs7Ozs7Ozs7Ozs7OztJQVVNO0FBRUosV0FGSSxnQkFFSixHQUFjOzBCQUZWLGtCQUVVOztBQUNaLFNBQUssVUFBTCxHQUFrQixFQUFsQixDQURZO0dBQWQ7Ozs7Ozs7Ozs7Ozs7Ozs7O2VBRkk7O3NDQXFCYyxNQUFNLFVBQVUsVUFBVSxrQkFBa0I7O0FBRTVELFVBQUksaUJBQWlCO0FBQ25CLGtCQUFXLFFBQVg7QUFDQSxrQkFBVyxZQUFZLENBQVo7QUFDWCwwQkFBbUIsb0JBQW9CLEtBQXBCO09BSGpCOzs7Ozs7OztBQUZ3RCxjQWM1RCxDQUFTLEdBQVQsR0FBZSxTQUFTLEdBQVQsSUFBZ0IsZ0JBQU0sTUFBTixFQUFoQjs7Ozs7OztBQWQ2QyxVQXFCNUQsQ0FBSyxVQUFMLENBQWdCLElBQWhCLElBQXdCLEtBQUssVUFBTCxDQUFnQixJQUFoQixLQUF5QixFQUF6QixDQXJCb0M7QUFzQjVELFdBQUssVUFBTCxDQUFnQixJQUFoQixFQUFzQixRQUF0QixJQUFrQyxLQUFLLFVBQUwsQ0FBZ0IsSUFBaEIsRUFBc0IsUUFBdEIsSUFBa0MsRUFBbEM7Ozs7Ozs7QUF0QjBC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TTs7Ozs7Ozs2QkFDWTtBQUNkLGFBQU8sS0FBSyxNQUFMLEdBQWMsUUFBZCxDQUF1QixFQUF2QixFQUEyQixNQUEzQixDQUFrQyxDQUFsQyxFQUFxQyxDQUFyQyxDQUFQLENBRGM7Ozs7U0FEWjs7O2tCQU1TOzs7QUNiZjs7OztBQUVBOzs7Ozs7OztJQUVNOzs7QUFDSixXQURJLE1BQ0osR0FBYzswQkFEVixRQUNVOztrRUFEVixvQkFDVTtHQUFkOztlQURJOzs0QkFLSTtBQUNOLGNBQVEsR0FBUixDQUFZLFVBQVosRUFBd0IsSUFBeEIsRUFETTs7OztTQUxKOzs7QUFVTixJQUFJLFNBQVMsSUFBSSxNQUFKLEVBQVQ7QUFDSixPQUFPLEtBQVAiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQXRvbSBmcm9tICcuL2xpYi9jb21wb25lbnRzL0F0b20nO1xuaW1wb3J0IE1vbGVjdWxlIGZyb20gJy4vbGliL2NvbXBvbmVudHMvTW9sZWN1bGUnO1xuaW1wb3J0IE9yZ2FuaXNtIGZyb20gJy4vbGliL2NvbXBvbmVudHMvT3JnYW5pc20nO1xuXG5leHBvcnQgZGVmYXVsdCBBdG9tO1xuZXhwb3J0IGRlZmF1bHQgTW9sZWN1bGU7XG5leHBvcnQgZGVmYXVsdCBPcmdhbmlzbTtcblxuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgVXRpbHMgZnJvbSAnLi4vdXRpbHMvVXRpbHMnO1xuXG4vKipcbiAqIFRoZSBBY3Rpb25EaXNwYXRjaGVyIGNsYXNzIGlzIHRoZSBiYXNlIGNsYXNzIGZvciBhbGwgY2xhc3NlcyB0aGF0IGRpc3BhdGNoXG4gKiBhY3Rpb25zLlxuICogXG4gKiBAYXV0aG9yIEx1aXMgU2FyZG9uXG4gKiBcbiAqL1xuXG5jbGFzcyBBY3Rpb25EaXNwYXRjaGVyIHtcbiAgXG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuYWN0aW9uRmxvdyA9IHt9O1xuICB9XG4gIFxuICAvKipcbiAgICogUmVnaXN0ZXJzIGFuIGFjdGlvbiBsaXN0ZW5lciBvYmplY3Qgd2l0aCBhbiBBY3Rpb25EaXNwYXRjaGVyIG9iamVjdCBzb1xuICAgKiB0aGF0IHRoZSBsaXN0ZW5lciByZWNlaXZlcyBub3RpZmljYXRpb24gb2YgYW4gYWN0aW9uLlxuICAgKiBcbiAgICogQHBhcmFtIHt0eXBlfSBUaGUgdHlwZSBvZiBhY3Rpb24uXG4gICAqIEBwYXJhbSB7bGlzdGVuZXJ9IFRoZSBsaXN0ZW5lciBmdW5jdGlvbiB0aGF0IHByb2Nlc3NlcyB0aGUgYWN0aW9uLlxuICAgKiBAcGFyYW0ge3ByaW9yaXR5fSAoZGVmYXVsdCA9IDApIFRoZSBwcmlvcml0eSBsZXZlbCBvZiB0aGUgYWN0aW9uXG4gICAqICAgICAgICBsaXN0ZW5lci5cbiAgICogQHBhcmFtIHt1c2VXZWFrUmVmZXJlbmNlfSAoZGVmYXVsdCA9IGZhbHNlKSBEZXRlcm1pbmVzIHdoZXRoZXIgdGhlXG4gICAqICAgICAgICByZWZlcmVuY2UgdG8gdGhlIGxpc3RlbmVyIGlzIHN0cm9uZyBvciB3ZWFrLlxuICAgKiBcbiAgICogQHRvZG8ge0FyZ3VtZW50RXJyb3J9IFRoZSBsaXN0ZW5lciBzcGVjaWZpZWQgaXMgbm90IGEgZnVuY3Rpb24uXG4gICAqIFxuICAgKi9cbiAgXG4gIGFkZEFjdGlvbkxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyLCBwcmlvcml0eSwgdXNlV2Vha1JlZmVyZW5jZSkge1xuICAgIFxuICAgIGxldCBhY3Rpb25MaXN0ZW5lciA9IHtcbiAgICAgIGxpc3RlbmVyIDogbGlzdGVuZXIsXG4gICAgICBwcmlvcml0eSA6IHByaW9yaXR5IHx8IDAsXG4gICAgICB1c2VXZWFrUmVmZXJlbmNlIDogdXNlV2Vha1JlZmVyZW5jZSB8fCBmYWxzZVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBJbmplY3QgYSB1bmlxdWUgaWQgaW50byB0aGUgbGlzdGVuZXIgb2JqZWN0IHNvIHRoYXQgdGhlIGFjdGlvblxuICAgICAqIGxpc3RlbmVyIGNhbiBuZXZlciBiZSBkdXBsaWNhdGVkLlxuICAgICAqIFxuICAgICAqL1xuICAgIFxuICAgIGxpc3RlbmVyLnVpZCA9IGxpc3RlbmVyLnVpZCB8fCBVdGlscy5nZXRVSUQoKTtcbiAgICBcbiAgICAvKipcbiAgICAgKiBDcmVhdGUgYSBuZXcgbGlzdCBvZiBhY3Rpb25GbG93XG4gICAgICpcbiAgICAgKi9cbiAgICBcbiAgICB0aGlzLmFjdGlvbkZsb3dbdHlwZV0gPSB0aGlzLmFjdGlvbkZsb3dbdHlwZV0gfHwgW107XG4gICAgdGhpcy5hY3Rpb25GbG93W3R5cGVdW3ByaW9yaXR5XSA9IHRoaXMuYWN0aW9uRmxvd1t0eXBlXVtwcmlvcml0eV0gPSBbXVxuICAgIFxuICAgIC8qKlxuICAgICAqIEFkZCB0aGUgbGlzdGVuZXIgb2JqZWN0IGluIHRvIHRoZSBhY3Rpb24gZmxvd1xuICAgICAqXG4gICAgICovXG4gICAgXG4gICAgbGV0IHByaW9yaXR5TGlzdCA9IHRoaXMuYWN0aW9uRmxvd1t0eXBlXVtwcmlvcml0eV07XG4gICAgbGV0IHByaW9yaXR5SW5kZXggPSBwcmlvcml0eUxpc3QubGVuZ3RoO1xuICAgIFxuICAgIGZvciAodmFyIGkgaW4gcHJpb3JpdHlMaXN0KSB7XG4gICAgICBpZihwcmlvcml0eUxpc3RbaV0ubGlzdGVuZXIudWlkID09PSBsaXN0ZW5lci51aWQpIHtcbiAgICAgICAgcHJpb3JpdHlJbmRleCA9IGk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgICBcbiAgICAvKipcbiAgICAgKiBDbGVhciB1bmRlZmluZWQgc2xvdHNcbiAgICAgKlxuICAgICAqL1xuICAgIGxldCBhY3Rpb25MaXN0ID0gdGhpcy5hY3Rpb25GbG93W3R5cGVdO1xuICAgIFxuICAgIGZvciAobGV0IGkgaW4gYWN0aW9uTGlzdCkge1xuICAgICAgaWYoIWFjdGlvbkxpc3RbaV0pXG4gICAgICAgIGRlbGV0ZSB0aGlzLmFjdGlvbkZsb3dbdHlwZV1baV07XG4gICAgfVxuICAgIFxuICAgIHRoaXMuYWN0aW9uRmxvd1t0eXBlXVtwcmlvcml0eV1bcHJpb3JpdHlJbmRleF0gPSBhY3Rpb25MaXN0ZW5lcjtcbiAgfVxuICBcbiAgLyoqXG4gICAqIERpc3BhdGNoZXMgYW4gYWN0aW9uIGludG8gdGhlIGFjdGlvbiBmbG93LiBUaGUgYWN0aW9uIHRhcmdldCBpcyB0aGVcbiAgICogQWN0aW9uRGlzcGF0Y2hlciBvYmplY3QgdXBvbiB3aGljaCB0aGUgZGlzcGF0Y2hBY3Rpb24oKSBtZXRob2QgaXMgY2FsbGVkLlxuICAgKiBcbiAgICogQHBhcmFtIHthY3Rpb259IFRoZSBBY3Rpb24gb2JqZWN0IHRoYXQgaXMgZGlzcGF0Y2hlZCBpbnRvIHRoZSBhY3Rpb24gZmxvdy5cbiAgICogQHJldHVybiB7Ym9vbGVhbn0gQSB2YWx1ZSBvZiB0cnVlIGlmIHRoZSBhY3Rpb24gd2FzIHN1Y2Nlc3NmdWxseSBkaXNwYXRjaGVkLlxuICAgKiAgICAgICAgIEEgdmFsdWUgb2YgZmFsc2UgaW5kaWNhdGVzIGZhaWx1cmUuXG4gICAqIFxuICAgKiBAdG9kbyB7RXJyb3J9IFRoZSBhY3Rpb24gZGlzcGF0Y2ggcmVjdXJzaW9uIGxpbWl0IGhhcyBiZWVuIHJlYWNoZWQuXG4gICAqIFxuICAgKi9cbiAgXG4gIGRpc3BhdGNoQWN0aW9uKGFjdGlvbikge1xuICAgIGxldCBhY3Rpb25MaXN0ID0gdGhpcy5hY3Rpb25GbG93W2FjdGlvbi50eXBlXTtcbiAgICBcbiAgICBmb3IgKGxldCBpIG9mIGFjdGlvbkxpc3QpIHtcbiAgICAgIGxldCBwcmlvcml0eUxpc3QgPSBhY3Rpb25MaXN0W2ldO1xuICAgICAgXG4gICAgICBmb3IgKGxldCBpIGluIHByaW9yaXR5TGlzdCkge1xuICAgICAgICBsZXQgYWN0aW9uTGlzdGVuZXIgPSBwcmlvcml0eUxpc3RbaV07XG4gICAgICAgIFxuICAgICAgICBhY3Rpb25MaXN0ZW5lci5saXN0ZW5lci5hcHBseSh0aGlzLCBbYWN0aW9uXSk7XG4gICAgICAgIFxuICAgICAgICBpZihhY3Rpb25MaXN0ZW5lci51c2VXZWFrUmVmZXJlbmNlKVxuICAgICAgICAgIGRlbGV0ZSB0aGlzLmFjdGlvbkZsb3dbYWN0aW9uLnR5cGVdW2FjdGlvbkxpc3RlbmVyLnByaW9yaXR5XVtpXTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgXG4gIC8qKlxuICAgKiBSZW1vdmVzIGEgbGlzdGVuZXIgZnJvbSB0aGUgQWN0aW9uRGlzcGF0Y2hlciBvYmplY3QuXG4gICAqIFxuICAgKiBAcGFyYW0ge3R5cGV9IFRoZSB0eXBlIG9mIGFjdGlvbi5cbiAgICogQHBhcmFtIHtsaXN0ZW5lcn0gVGhlIGxpc3RlbmVyIG9iamVjdCB0byByZW1vdmUuXG4gICAqIFxuICAgKi9cbiAgXG4gIHJlbW92ZUFjdGlvbkxpc3RlbmVyKHR5cGUsIGxpc3RlbmVyKSB7XG4gICAgbGV0IGFjdGlvbkxpc3QgPSB0aGlzLmFjdGlvbkZsb3dbdHlwZV07XG4gICAgXG4gICAgZm9yIChsZXQgaSBvZiBhY3Rpb25MaXN0KSB7XG4gICAgICBsZXQgcHJpb3JpdHlMaXN0ID0gYWN0aW9uTGlzdFtpXTtcbiAgICAgIFxuICAgICAgZm9yIChsZXQgaSBpbiBwcmlvcml0eUxpc3QpIHtcbiAgICAgICAgbGV0IGFjdGlvbkxpc3RlbmVyID0gcHJpb3JpdHlMaXN0W2ldO1xuICAgICAgICBcbiAgICAgICAgZGVsZXRlIHRoaXMuYWN0aW9uRmxvd1t0eXBlXVthY3Rpb25MaXN0ZW5lci5wcmlvcml0eV1baV07XG4gICAgICAgIFxuICAgICAgICBicmVhaztcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgQWN0aW9uRGlzcGF0Y2hlcjsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tICcuLi9jb3JlL1VJQ29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgQXRvbSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIGF0b20gY29tcG9uZW50cywgZGVmaW5pbmcgcHJvcGVydGllc1xuICogYW5kIG1ldGhvZHMgdGhhdCBhcmUgY29tbW9uIHRvIGFsbCBhdG9tcy5cbiAqIFxuICovXG5jbGFzcyBBdG9tIGV4dGVuZHMgVUlDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IEF0b207XG4iLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCBVSUNvbXBvbmVudCBmcm9tICcuLi9jb3JlL1VJQ29tcG9uZW50JztcblxuLyoqXG4gKiBUaGUgTW9sZWN1bGUgY2xhc3MgaXMgdGhlIGJhc2UgY2xhc3MgZm9yIGFsbCBtb2xlY3VsZSBjb21wb25lbnRzLCBkZWZpbmluZ1xuICogcHJvcGVydGllcyBhbmQgbWV0aG9kcyB0aGF0IGFyZSBjb21tb24gdG8gYWxsIG1vbGVjdWxlcy5cbiAqIFxuICovXG5jbGFzcyBNb2xlY3VsZSBleHRlbmRzIFVJQ29tcG9uZW50IHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBNb2xlY3VsZTtcbiIsIid1c2Ugc3RyaWN0JztcblxuaW1wb3J0IFVJQ29tcG9uZW50IGZyb20gJy4uL2NvcmUvVUlDb21wb25lbnQnO1xuXG4vKipcbiAqIFRoZSBPcmdhbmlzbSBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIG9yZ2FuaXNtIGNvbXBvbmVudHMsIGRlZmluaW5nXG4gKiBwcm9wZXJ0aWVzIGFuZCBtZXRob2RzIHRoYXQgYXJlIGNvbW1vbiB0byBhbGwgb3JnYW5pc21zLlxuICogXG4gKi9cbmNsYXNzIE9yZ2FuaXNtIGV4dGVuZHMgVUlDb21wb25lbnQge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG59XG5cbmV4cG9ydCBkZWZhdWx0IE9yZ2FuaXNtO1xuIiwiJ3VzZSBzdHJpY3QnO1xuXG5pbXBvcnQgQWN0aW9uRGlzcGF0Y2hlciBmcm9tICcuLi9hY3Rpb25zL0FjdGlvbkRpc3BhdGNoZXInO1xuXG4vKipcbiAqIFRoZSBVSUNvbXBvbmVudCBjbGFzcyBpcyB0aGUgYmFzZSBjbGFzcyBmb3IgYWxsIGF0b21pYyB2aWV3IGNvbXBvbmVudHMsXG4gKiBhdG9tcywgbW9sZWN1bGVzIGFuZCBvcmdhbmlzbXMuXG4gKiBcbiAqL1xuXG5jbGFzcyBVSUNvbXBvbmVudCBleHRlbmRzIEFjdGlvbkRpc3BhdGNoZXIge1xuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBzdXBlcigpO1xuICB9XG4gIFxuICByZW5kZXIoKSB7XG4gICAgXG4gIH1cbn1cblxuZXhwb3J0IGRlZmF1bHQgVUlDb21wb25lbnQ7XG4iLCIndXNlIHN0cmljdCc7XG5cbi8qKlxuICogVXRpbGl0aWVzXG4gKiBcbiAqL1xuXG5jbGFzcyBVdGlscyB7XG4gIHN0YXRpYyBnZXRVSUQoKSB7XG4gICAgcmV0dXJuIE1hdGgucmFuZG9tKCkudG9TdHJpbmcoMzYpLnN1YnN0cigyLCA5KTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBVdGlsczsiLCIndXNlIHN0cmljdCc7XG5cbmltcG9ydCB7QXRvbX0gZnJvbSAnLi4vLi4vaW5kZXguanMnO1xuXG5jbGFzcyBCdXR0b24gZXh0ZW5kcyBBdG9tIHtcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgc3VwZXIoKTtcbiAgfVxuICBcbiAgZGVidWcoKSB7XG4gICAgY29uc29sZS5sb2coJ0hvbGEgc295JywgdGhpcyk7XG4gIH1cbn1cblxubGV0IGJ1dHRvbiA9IG5ldyBCdXR0b24oKTtcbmJ1dHRvbi5kZWJ1ZygpOyJdfQ==
