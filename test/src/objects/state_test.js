var assert = require('chai').assert;

import State from '../../../src/objects/state';

module.exports = function StateTest() {
  it('check state is of type object', function() {
  	let state = new State();
    assert.equal(typeof state, 'object');
  });

  it('check state object is auto generated', function() {
  	let state = new State();
    assert.include(state.getStateId(), 'fsm_state_id_');
    assert.include(state.getStateName(), 'fsm_state_name_');
    assert.equal(state.getEntityId(), null);
    assert.equal(typeof state.getMethods().enter, 'function');
    assert.equal(typeof state.getMethods().leave, 'function');
    assert.equal(typeof state.getMethods().reached, 'function');
    assert.equal(typeof state.getMethods().entered, 'function');
    assert.equal(typeof state.getMethods().left, 'function');
  });

  it('check state object is generated', function() {
  	let state = new State({
  		id: 'stateId',
  		name: 'stateName',
      entityId: 'entityId',
      methods: {
        enter: function() {},
        leave: function() {}
      }
  	});
    assert.equal(state.getStateId(), 'stateId');
    assert.equal(state.getStateName(), 'stateName');
    assert.equal(state.getEntityId(), 'entityId');
    assert.equal(typeof state.getMethods().enter, 'function');
    assert.equal(typeof state.getMethods().leave, 'function');
    assert.equal(typeof state.getMethods().reached, 'function');
    assert.equal(typeof state.getMethods().entered, 'function');
    assert.equal(typeof state.getMethods().left, 'function');
  });

  it('check state object allows update', function() {
    let state = new State({
  		id: 'stateId',
  		name: 'stateName',
      entityId: 'entityId'
  	});
  	state.setStateId('eId');
    assert.equal(state.getStateId(), 'eId');
    state.setStateName('eName');
    assert.equal(state.getStateName(), 'eName');
    state.setEntityId('entId');
    assert.equal(state.getEntityId(), 'entId');
    state.setMethods({
      enter: null,
      leave: null,
      reached: null,
      entered: null,
      left: null
    });
    assert.equal(typeof state.getMethods().enter, 'function');
    assert.equal(typeof state.getMethods().leave, 'function');
    assert.equal(typeof state.getMethods().reached, 'function');
    assert.equal(typeof state.getMethods().entered, 'function');
    assert.equal(typeof state.getMethods().left, 'function');
  });

  it('check state object disallow update', function() {
    let state = new State({
  		id: 'stateId',
  		name: 'stateName',
      entityId: 'entityId'
  	});
  	state.setStateId().setStateName().setEntityId().setMethods();
    assert.equal(state.getStateId(), 'stateId');
    assert.equal(state.getStateName(), 'stateName');
    assert.equal(state.getEntityId(), 'entityId');
    assert.equal(typeof state.getMethods().enter, 'function');
    assert.equal(state.enter(), true);
    assert.equal(typeof state.getMethods().leave, 'function');
    assert.equal(state.leave(), true);
    assert.equal(typeof state.getMethods().reached, 'function');
    assert.equal(state.reached(), true);
    assert.equal(typeof state.getMethods().entered, 'function');
    assert.equal(state.entered(), true);
    assert.equal(typeof state.getMethods().left, 'function');
    assert.equal(state.left(), true);
  });
  
  it('check state object allow enter method update', function() {
    let enterMethod = function() {};
    let state = new State({
      id: 'stateId',
      name: 'stateName',
      entityId: 'entityId'
    });
    assert.equal(typeof state.getMethods().enter, 'function');
    state.setMethodEnter();
    assert.equal(typeof state.getMethods().enter, 'function');
    state.setMethodEnter(enterMethod);
    assert.deepEqual(state.getMethods().enter, enterMethod);
  });

  it('check state object allow leave method update', function() {
    let leaveMethod = function() {};
    let state = new State({
      id: 'stateId',
      name: 'stateName',
      entityId: 'entityId'
    });
    assert.equal(typeof state.getMethods().leave, 'function');
    state.setMethodLeave();
    assert.equal(typeof state.getMethods().leave, 'function');
    state.setMethodLeave(leaveMethod);
    assert.deepEqual(state.getMethods().leave, leaveMethod);
  });

  it('check state object allow entered method update', function() {
    let enteredMethod = function() {};
    let state = new State({
      id: 'stateId',
      name: 'stateName',
      entityId: 'entityId'
    });
    assert.equal(typeof state.getMethods().entered, 'function');
    state.setMethodEntered();
    assert.equal(typeof state.getMethods().entered, 'function');
    state.setMethodEntered(enteredMethod);
    assert.deepEqual(state.getMethods().entered, enteredMethod);
  });

  it('check state object allow left method update', function() {
    let leftMethod = function() {};
    let state = new State({
      id: 'stateId',
      name: 'stateName',
      entityId: 'entityId'
    });
    assert.equal(typeof state.getMethods().left, 'function');
    state.setMethodLeft();
    assert.equal(typeof state.getMethods().left, 'function');
    state.setMethodLeft(leftMethod);
    assert.deepEqual(state.getMethods().left, leftMethod);
  });

  it('check state object allow reached method update', function() {
    let reachedMethod = function() {};
    let state = new State({
      id: 'stateId',
      name: 'stateName',
      entityId: 'entityId'
    });
    assert.equal(typeof state.getMethods().reached, 'function');
    state.setMethodReached();
    assert.equal(typeof state.getMethods().reached, 'function');
    state.setMethodReached(reachedMethod);
    assert.deepEqual(state.getMethods().reached, reachedMethod);
  });
};