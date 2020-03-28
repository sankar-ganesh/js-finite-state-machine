'use strict';

function EventEmitter() {
  this.clear();
  return this;
}

EventEmitter.prototype.isFunction = function(obj) {
	return (obj && typeof obj === 'function')? true : false;
};

EventEmitter.prototype.getCallback = function() {
	return this.callback;
};

EventEmitter.prototype.setCallback = function(callback) {
	if (this.isFunction(callback)) {
		this.callback = callback;
	}
	this.enabled = false;
	if (this.callback) {
		this.enabled = true;
	}
	return this;
};

EventEmitter.prototype.isEnabled = function() {
	return this.enabled;
};

EventEmitter.prototype.clear = function() {
	this.callback = null;
	this.enabled = false;
};

export default EventEmitter;