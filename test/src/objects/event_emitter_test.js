var assert = require('chai').assert;

import EventEmitter from '../../../src/objects/event_emitter';

module.exports = function EventEmitterTest() {
  it('check event emitter is of type object', function() {
    let eventEmitter = new EventEmitter();
    assert.equal(typeof eventEmitter, 'object');
  });

  it('check event emitter default values', function() {
    let eventEmitter = new EventEmitter();
    assert.equal(eventEmitter.isEnabled(), false);
    assert.equal(eventEmitter.getCallback(), null);
  });

  it('test event emitter prototype method setCallback with null', function() {
    let eventEmitter = new EventEmitter();
    eventEmitter.setCallback(null);
		assert.equal(eventEmitter.isEnabled(), false);
    assert.equal(eventEmitter.getCallback(), null);
  });

  it('test event emitter prototype method setCallback', function() {
    let eventEmitter = new EventEmitter();
  	let callback = () => {};
  	eventEmitter.setCallback(callback);
    assert.equal(eventEmitter.isEnabled(), true);
    assert.deepEqual(eventEmitter.getCallback(), callback);
  });

  it('test event emitter prototype method clear', function() {
    let eventEmitter = new EventEmitter();
  	let callback = () => {};
  	eventEmitter.setCallback(callback);
  	eventEmitter.clear();
    assert.equal(eventEmitter.isEnabled(), false);
    assert.equal(eventEmitter.getCallback(), null);
  });
};