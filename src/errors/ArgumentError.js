'use strict';

import AtomicError from './AtomicError';

/**
 * The ArgumentError class represents an error that occurs when the arguments
 * supplied in a function do not match the arguments defined for that function.
 * This error occurs, for example, when a function is called with the wrong
 * number of arguments, an argument of the incorrect type, or an invalid
 * argument.
 *
 * @constructor {message} Error message.
 *
 * @author Luis Sardon
 *
 */

class ArgumentError extends AtomicError {
	constructor(message) {
		super(message);
	}
}

export default ArgumentError;
