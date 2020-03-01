var assert = require('chai').assert;

import EventEmitter from '../../../src/objects/event_emitter';

module.exports = function EventEmitterTest() {
  it('check event emitter is of type object', function() {
    assert.equal(typeof EventEmitter, 'object');
  });

  it('check event emitter default values', function() {
    assert.equal(EventEmitter.isEnabled(), false);
    assert.equal(EventEmitter.getCallback(), null);
  });

  it('confirm if event emitter is singleton object', function() {
    assert.deepEqual(EventEmitter.getInstance(), EventEmitter);
  });

  it('test event emitter prototype method setCallback with null', function() {
    EventEmitter.setCallback(null);
		assert.equal(EventEmitter.isEnabled(), false);
    assert.equal(EventEmitter.getCallback(), null);
  });

  it('test event emitter prototype method setCallback', function() {
  	let callback = () => {};
  	EventEmitter.setCallback(callback);
    assert.equal(EventEmitter.isEnabled(), true);
    assert.deepEqual(EventEmitter.getCallback(), callback);
  });

  it('test event emitter prototype method clear', function() {
  	let callback = () => {};
  	EventEmitter.setCallback(callback);
  	EventEmitter.clear();
    assert.equal(EventEmitter.isEnabled(), false);
    assert.equal(EventEmitter.getCallback(), null);
  });
};