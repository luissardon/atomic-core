'use strict';

/**
 * The AtomicError class represents an error that can be extended.
 *
 * @constructor {message} Error message.
 *
 * @author Luis Sardon
 *
 */

class AtomicError extends Error {
	constructor(message) {
		super(message);

		this.name = this.constructor.name;
    this.message = message;

    if (typeof Error.captureStackTrace === 'function') {
      Error.captureStackTrace(this, this.constructor);
    } else {
      this.stack = (new Error(message)).stack;
    }
	}
}

export default AtomicError;
