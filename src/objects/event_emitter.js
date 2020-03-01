'use strict';

var EventEmitter = (function() {
	var instance;

	function Emitter() {
    if (instance) {
      return instance;
    }
    this.callback = null;
    this.enabled = false;
    instance = this;
  }

  Emitter.prototype.isFunction = function(obj) {
		return (obj && typeof obj === 'function')? true : false;
	};

	Emitter.prototype.getCallback = function() {
		return this.callback;
	};

	Emitter.prototype.setCallback = function(callback) {
		if (this.isFunction(callback)) {
			this.callback = callback;
		}
		this.enabled = false;
		if (this.callback) {
			this.enabled = true;
		}
		return this;
	};

	Emitter.prototype.isEnabled = function() {
		return this.enabled;
	};

	Emitter.prototype.clear = function() {
		this.callback = null;
		this.enabled = false;
	};

	Emitter.prototype.getInstance = function() {
		return new Emitter();
	};

  return new Emitter();
})();

export default EventEmitter;