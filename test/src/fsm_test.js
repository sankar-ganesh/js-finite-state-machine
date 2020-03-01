var assert = require('chai').assert;
var sinon = require('sinon');

import FSM from '../../src/fsm';
import Entity from '../../src/objects/entity';
import State from '../../src/objects/state';
import Transition from '../../src/objects/transition';

module.exports = function FSMTest() {
  it('check fsm is of type object', function() {
  	let fsm = new FSM();
    assert.equal(typeof fsm, 'object');
  });

  it('check fsm object is auto generated', function() {
  	let fsm = new FSM();
    assert.include(fsm.getFSMId(), 'fsm_id_');
    assert.include(fsm.getFSMName(), 'fsm_name_');
    assert.include(fsm.getEntityId(), 'fsm_entity_id_');
    assert.include(fsm.getEntityName(), 'fsm_entity_name_');
    let entity = fsm.getEntity();
    assert.include(entity.getEntityId(), 'fsm_entity_id_');
    assert.include(entity.getEntityName(), 'fsm_entity_name_');
    assert.deepEqual(fsm.getStates(), []);
    assert.deepEqual(fsm.getTransitions(), []);
  });

  it('check fsm object is generated with given properties', function() {
  	let fsm = new FSM({
  		id: "fsmId",
  		name: "fsmName"
  	});
    assert.equal(fsm.getFSMId(), 'fsmId');
    assert.equal(fsm.getFSMName(), 'fsmName');
    assert.equal(fsm.getEntityId(), 'fsmId_entity');
    assert.equal(fsm.getEntityName(), 'fsmName_entity');
    // Check For Entity States
    assert.equal(fsm.getEntityState(), null);
    fsm.setEntityState(new State({id: 'stateId', name: 'stateName'}));
    let state = fsm.getEntityState();
    assert.equal(state.getEntityId(), 'fsmId_entity');
    assert.equal(state.getStateId(), 'stateId');
    assert.equal(state.getStateName(), 'stateName');
  });

  it('check fsm object allows update', function() {
  	let fsm = new FSM({
  		id: "fsmId",
  		name: "fsmName"
  	});
  	fsm.setFSMId();
  	assert.equal(fsm.getFSMId(), 'fsmId');
  	fsm.setFSMId('newFSMId');
    assert.equal(fsm.getFSMId(), 'newFSMId');
    fsm.setFSMName();
    assert.include(fsm.getFSMName(), 'fsmName');
    fsm.setFSMName('newFSMName');
    assert.equal(fsm.getFSMName(), 'newFSMName');
    let state = new State({id: 'stateId', name: 'stateName'});
    fsm.setStates([state]);
    let transition = new Transition({id: 'transitionId', name: 'transitionName'});
    fsm.setTransitions([transition]);
		assert.equal(fsm.getStates()[0].getStateId(), state.getStateId());
    assert.equal(fsm.getTransitions()[0].getTransitionId(), transition.getTransitionId());
  });

  it('check fsm object event emitter without callback', function() {
    let fsm = new FSM();
    assert.equal(fsm.getEventEmitter().isEnabled(), false);
    assert.equal(fsm.getEventEmitter().getCallback(), null);
  });

  it('check fsm object event emitter init callback', function() {
    let callback = () => {};
    let fsm = new FSM({
      callback: callback
    });
    assert.equal(fsm.getEventEmitter().isEnabled(), true);
    assert.deepEqual(fsm.getEventEmitter().getCallback(), callback);
  });

  it('check fsm object event emitter set callback', function() {
    let callback = () => {};
    let fsm = new FSM();
    fsm.setEventCallback(callback);
    assert.equal(fsm.getEventEmitter().isEnabled(), true);
    assert.deepEqual(fsm.getEventEmitter().getCallback(), callback);
  });

  it('check fsm object event emitter clear method', function() {
    let callback = () => {};
    let fsm = new FSM();
    fsm.setEventCallback(callback);
    fsm.resetEventCallback()
    assert.equal(fsm.getEventEmitter().isEnabled(), false);
    assert.equal(fsm.getEventEmitter().getCallback(), null);
  });

  it('check fsm object init', function() {
    let onSolidEnter = sinon.fake(),
        onSolidLeave = sinon.fake(),
        onSolidReached = sinon.fake(),
        onSolidEntered = sinon.fake(),
        onSolidLeft = sinon.fake(),
        onLiquidEnter = sinon.fake(),
        onLiquidLeave = sinon.fake(),
        onLiquidReached = sinon.fake(),
        onLiquidEntered = sinon.fake(),
        onLiquidLeft = sinon.fake(),
        onGasEnter = sinon.fake(),
        onGasLeave = sinon.fake(),
        onGasReached = sinon.fake(),
        onGasEntered = sinon.fake(),
        onGasLeft = sinon.fake(),
        onMeltBefore = sinon.fake(),
        onMeltAfter = sinon.fake(),
        onMeltStart = sinon.fake(),
        onVaporizeStart = sinon.fake(),
        onVaporizeBefore = sinon.fake(),
        onVaporizeAfter = sinon.fake(),
        onCondenseStart = sinon.fake(),
        onCondenseBefore = sinon.fake(),
        onCondenseAfter = sinon.fake(),
        onFreezeStart = sinon.fake(),
        onFreezeBefore = sinon.fake(),
        onFreezeAfter = sinon.fake(),
        solid = new State({
          id: 'solid',
          name: 'solid',
          methods: {
            enter: onSolidEnter,
            leave: onSolidLeave,
            entered: onSolidEntered,
            left: onSolidLeft,
            reached: onSolidReached
          }
        }),
        liquid = new State({
          id: 'liquid',
          name: 'liquid',
          methods: {
            enter: onLiquidEnter,
            leave: onLiquidLeave,
            entered: onLiquidEntered,
            left: onLiquidLeft,
            reached: onLiquidReached
          }
        }),
        gas = new State({
          id: 'gas',
          name: 'gas',
          methods: {
            enter: onGasEnter,
            leave: onGasLeave,
            entered: onGasEntered,
            left: onGasLeft,
            reached: onGasReached
          }
        }),
        substance = new Entity({id: 'substance', name: 'substance', state: solid}),
        melt = new Transition({
          id: 'melt',
          name: 'melt',
          from: [solid],
          to: liquid,
          methods: {
            start: onMeltStart,
            after: onMeltAfter,
            before: onMeltBefore
          }
        }),
        vaporize = new Transition({
          id: 'vaporize',
          name: 'vaporize',
          from: [liquid],
          to: gas,
          methods: {
            start: onVaporizeStart,
            after: onVaporizeAfter,
            before: onVaporizeBefore
          }
        }),
        condense = new Transition({
          id: 'condense',
          name: 'condense',
          from: [gas],
          to: liquid,
          methods: {
            start: onCondenseStart,
            after: onCondenseAfter,
            before: onCondenseBefore
          }
        }),
        freeze = new Transition({
          id: 'freeze',
          name: 'freeze',
          from: [liquid],
          to: solid,
          methods: {
            start: onFreezeStart,
            after: onFreezeAfter,
            before: onFreezeBefore
          }
        });
    
    let fsm = new FSM({
      id: "fsmId",
      name: "fsmName",
      entity: substance,
      states: [solid, liquid, gas],
      transitions: [melt, vaporize, condense, freeze]
    });
    
    let clock = sinon.useFakeTimers(),
        resetHistory = () => {
          onSolidEnter.resetHistory(),
          onSolidLeave.resetHistory(),
          onSolidEntered.resetHistory(),
          onSolidLeft.resetHistory(),
          onSolidReached.resetHistory(),
          onLiquidEnter.resetHistory(),
          onLiquidLeave.resetHistory(),
          onLiquidEntered.resetHistory(),
          onLiquidLeft.resetHistory(),
          onLiquidReached.resetHistory(),
          onGasEnter.resetHistory(),
          onGasLeave.resetHistory(),
          onGasEntered.resetHistory(),
          onGasLeft.resetHistory(),
          onGasReached.resetHistory(),
          onMeltStart.resetHistory(),
          onMeltBefore.resetHistory(),
          onMeltAfter.resetHistory(),
          onVaporizeStart.resetHistory(),
          onVaporizeBefore.resetHistory(),
          onVaporizeAfter.resetHistory(),
          onCondenseStart.resetHistory(),
          onCondenseBefore.resetHistory(),
          onCondenseAfter.resetHistory(),
          onFreezeStart.resetHistory(),
          onFreezeBefore.resetHistory(),
          onFreezeAfter.resetHistory();
        };

    fsm.melt({action: 'melting'});
    clock.tick(1000);
    assert.notOk(onSolidEnter.called);
    assert.notOk(onSolidEntered.called);
    assert.notOk(onSolidReached.called);
    assert.ok(onSolidLeave.called);
    assert.ok(onSolidLeft.called);
    assert.ok(onMeltBefore.called);
    assert.ok(onMeltStart.called);
    assert.ok(onMeltAfter.called);
    assert.ok(onLiquidEnter.called);
    assert.ok(onLiquidEntered.called);
    assert.ok(onLiquidReached.called);
    assert.notOk(onLiquidLeave.called);
    assert.notOk(onLiquidLeft.called);
    assert.deepEqual(fsm.getEntityState(), liquid);
    
    resetHistory();
    fsm.vaporize({action: 'vaporizing'});
    clock.tick(1000);
    assert.notOk(onLiquidEnter.called);
    assert.notOk(onLiquidEntered.called);
    assert.notOk(onLiquidReached.called);
    assert.ok(onLiquidLeave.called);
    assert.ok(onLiquidLeft.called);
    assert.ok(onVaporizeBefore.called);
    assert.ok(onVaporizeStart.called);
    assert.ok(onVaporizeAfter.called);
    assert.ok(onGasEnter.called);
    assert.ok(onGasEntered.called);
    assert.ok(onGasReached.called);
    assert.notOk(onGasLeave.called);
    assert.notOk(onGasLeft.called);
    assert.deepEqual(fsm.getEntityState(), gas);

    resetHistory();
    fsm.condense({action: 'condensing'});
    clock.tick(1000);
    assert.notOk(onGasEnter.called);
    assert.notOk(onGasEntered.called);
    assert.notOk(onGasReached.called);
    assert.ok(onGasLeave.called);
    assert.ok(onGasLeft.called);
    assert.ok(onCondenseBefore.called);
    assert.ok(onCondenseStart.called);
    assert.ok(onCondenseAfter.called);
    assert.ok(onLiquidEnter.called);
    assert.ok(onLiquidEntered.called);
    assert.ok(onLiquidReached.called);
    assert.notOk(onLiquidLeave.called);
    assert.notOk(onLiquidLeft.called);
    assert.deepEqual(fsm.getEntityState(), liquid);

    resetHistory();
    fsm.freeze({action: 'freezing'});
    clock.tick(1000);
    assert.notOk(onLiquidEnter.called);
    assert.notOk(onLiquidEntered.called);
    assert.notOk(onLiquidReached.called);
    assert.ok(onLiquidLeave.called);
    assert.ok(onLiquidLeft.called);
    assert.ok(onFreezeBefore.called);
    assert.ok(onFreezeStart.called);
    assert.ok(onFreezeAfter.called);
    assert.ok(onSolidEnter.called);
    assert.ok(onSolidEntered.called);
    assert.ok(onSolidReached.called);
    assert.notOk(onSolidLeave.called);
    assert.notOk(onSolidLeft.called);
    assert.deepEqual(fsm.getEntityState(), solid);
  });
};