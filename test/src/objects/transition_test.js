var assert = require('chai').assert;

import Transition from '../../../src/objects/transition';
import State from '../../../src/objects/state';

module.exports = function TransitionTest() {
  it('check transition is of type object', function() {
  	let transition = new Transition();
    assert.equal(typeof transition, 'object');
  });

  it('check transition object is auto generated', function() {
  	let transition = new Transition();
    assert.include(transition.getTransitionId(), 'fsm_transition_id_');
    assert.include(transition.getTransitionName(), 'fsm_transition_name_');
    assert.equal(transition.getEntityId(), null);
    assert.deepEqual(transition.getTransitionFrom(), []);
    assert.equal(transition.getTransitionTo(), null);
    assert.equal(typeof transition.getMethods().before, 'function');
    assert.equal(typeof transition.getMethods().after, 'function');
    assert.equal(typeof transition.getMethods().start, 'function');
  });

  it('check transition object is generated', function() {
    let fromStates = [new State()],
        toState = new State();
  	let transition = new Transition({
  		id: 'transitionId',
  		name: 'transitionName',
      entityId: 'entityId',
      from: fromStates,
      to: toState,
      methods: {
        before: function() {},
        after: function() {},
        start: function() {}
      }
  	});
    assert.equal(transition.getTransitionId(), 'transitionId');
    assert.equal(transition.getTransitionName(), 'transitionName');
    assert.equal(transition.getEntityId(), 'entityId');
    assert.deepEqual(transition.getTransitionFrom(), fromStates);
    assert.deepEqual(transition.getTransitionTo(), toState);
    assert.equal(typeof transition.getMethods().before, 'function');
    assert.equal(typeof transition.getMethods().after, 'function');
    assert.equal(typeof transition.getMethods().start, 'function');
  });

  it('check transition object allows update', function() {
    let fromStates = [new State()],
        toState = new State();
    let transition = new Transition({
  		id: 'transitionId',
  		name: 'transitionName',
      entityId: 'entityId'
  	});
  	transition.setTransitionId('tId');
    assert.equal(transition.getTransitionId(), 'tId');
    transition.setTransitionName('tName');
    assert.equal(transition.getTransitionName(), 'tName');
    transition.setEntityId('entId');
    assert.equal(transition.getEntityId(), 'entId');
    transition.setTransitionFrom(fromStates);
    assert.deepEqual(transition.getTransitionFrom(), fromStates);
    transition.setTransitionTo(toState);
    assert.deepEqual(transition.getTransitionTo(), toState);
    transition.setMethods({
      start: null,
      before: null,
      after: null
    });
    assert.equal(typeof transition.getMethods().before, 'function');
    assert.equal(typeof transition.getMethods().after, 'function');
    assert.equal(typeof transition.getMethods().start, 'function');
  });

  it('check transition object disallow update', function() {
    let fromStates = [new State()],
        toState = new State();
    let transition = new Transition({
  		id: 'transitionId',
  		name: 'transitionName',
      entityId: 'entityId',
      from: fromStates,
      to: toState
  	});
  	transition.setTransitionId().setTransitionName().setEntityId().setTransitionFrom().setTransitionTo().setMethods();
    assert.equal(transition.getTransitionId(), 'transitionId');
    assert.equal(transition.getTransitionName(), 'transitionName');
    assert.equal(transition.getEntityId(), 'entityId');
    assert.deepEqual(transition.getTransitionFrom(), fromStates);
    assert.deepEqual(transition.getTransitionTo(), toState);
    assert.equal(typeof transition.getMethods().before, 'function');
    assert.equal(transition.before(), true);
    assert.equal(typeof transition.getMethods().after, 'function');
    assert.equal(transition.after(), true);
    assert.equal(typeof transition.getMethods().start, 'function');
    assert.equal(transition.start(), true);
  });

  it('check transition object allow before method update', function() {
    let beforeMethod = function() {};
    let transition = new Transition({
      id: 'transitionId',
      name: 'transitionName',
      entityId: 'entityId',
    });
    assert.equal(typeof transition.getMethods().before, 'function');
    transition.setMethodBefore();
    assert.equal(typeof transition.getMethods().before, 'function');
    transition.setMethodBefore(beforeMethod);
    assert.deepEqual(transition.getMethods().before, beforeMethod);
  });

  it('check transition object allow after method update', function() {
    let afterMethod = function() {};
    let transition = new Transition({
      id: 'transitionId',
      name: 'transitionName',
      entityId: 'entityId',
    });
    assert.equal(typeof transition.getMethods().after, 'function');
    transition.setMethodAfter();
    assert.equal(typeof transition.getMethods().after, 'function');
    transition.setMethodAfter(afterMethod);
    assert.deepEqual(transition.getMethods().after, afterMethod);
  });

  it('check transition object allow start method update', function() {
    let startMethod = function() {};
    let transition = new Transition({
      id: 'transitionId',
      name: 'transitionName',
      entityId: 'entityId',
    });
    assert.equal(typeof transition.getMethods().start, 'function');
    transition.setMethodStart();
    assert.equal(typeof transition.getMethods().start, 'function');
    transition.setMethodStart(startMethod);
    assert.deepEqual(transition.getMethods().start, startMethod);
  });

  it('check transition object invoking start method calls state leave method', function() {
    let fromState = new State({id: 'stateId'}),
        transition = new Transition({
          id: 'transitionId',
          name: 'transitionName',
          entityId: 'entityId',
        });
    assert.equal(transition.start(fromState), true);
  });

  it('check transition object allow adding states', function() {
    let state = new State({id: 'stateId'});
    let transition = new Transition({
      id: 'transitionId',
      name: 'transitionName'
    });
    transition.addStates();
    transition.addStates([state]);
    assert.deepEqual(transition.getTransitionFrom(), [state]);
  });
};