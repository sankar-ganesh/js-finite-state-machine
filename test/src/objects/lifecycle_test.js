var assert = require('chai').assert;
var sinon = require('sinon');

import Lifecycle from '../../../src/objects/lifecycle';
import Transition from '../../../src/objects/transition';
import State from '../../../src/objects/state';
import Entity from '../../../src/objects/entity';

module.exports = function LifecycleTest() {
  it('check lifecycle is of type object', function() {
  	let lifecycle = new Lifecycle();
    assert.equal(typeof lifecycle, 'object');
  });

  it('check lifecycle object is auto generated', function() {
  	let lifecycle = new Lifecycle();
    assert.include(lifecycle.getLifecycleId(), 'fsm_lifecycle_id_');
    assert.include(lifecycle.getLifecycleName(), 'fsm_lifecycle_name_');
    assert.equal(lifecycle.getEntity(), null);
    assert.equal(lifecycle.getEntityId(), null);
    assert.equal(lifecycle.getEntityName(), null);
    assert.equal(lifecycle.getEntityState(), null);
    assert.equal(lifecycle.getEntityStateFrom(), null);
    assert.equal(lifecycle.getEntityStateTo(), null);
    assert.equal(lifecycle.getStateById(), null);
    assert.equal(lifecycle.getStateByName(), null);
    assert.deepEqual(lifecycle.getStates(), []);
    assert.deepEqual(lifecycle.getTransitions(), []);
    assert.equal(lifecycle.hasTransition(), false);
  });

  it('check lifecycle object is generated', function() {
    let entity = new Entity({id: 'entityId'}),
        fromState = new State({id: 'fromStateId'}),
        toState = new State({id: 'toStateId'}),
        state = new State({id: 'stateId', name: 'stateName'}),
        transition = new Transition({id: 'transitionId'});
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
      entity: entity,
      states: [state],
      from: fromState,
      to: toState,
      transitions: [transition]
    });
    assert.equal(lifecycle.getLifecycleId(), 'lifecycleId');
    assert.equal(lifecycle.getLifecycleName(), 'lifecycleName');
    assert.deepEqual(lifecycle.getEntity(), entity);
    assert.equal(lifecycle.getEntityId(), entity.getEntityId());
    assert.equal(lifecycle.getEntityName(), entity.getEntityName());
    assert.equal(lifecycle.getEntityState(), entity.getEntityState());
    assert.deepEqual(lifecycle.getEntityStateFrom(), fromState);
    assert.deepEqual(lifecycle.getEntityStateTo(), toState);
    assert.deepEqual(lifecycle.getStates(), [state]);
    assert.deepEqual(lifecycle.getStateById(state.getStateId()), state);
    assert.deepEqual(lifecycle.getStateByName(state.getStateName()), state);
    assert.deepEqual(lifecycle.getTransitions(), [transition]);
    assert.equal(lifecycle.getStates()[0].getStateId(), state.getStateId());
    assert.equal(lifecycle.getTransitions()[0].getTransitionId(), transition.getTransitionId());
    assert.equal(lifecycle.hasTransition(transition.getTransitionName()), true);
  });

  it('check lifecycle object allows update', function() {
    let state = new State({id: 'stateId'}),
        entity = new Entity({id: 'entityId', state: state}),
        transition = new Transition({id: 'transitionId'});
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
      entity: entity,
      states: [state],
      from: state,
      to: state,
      transitions: [transition]
    });
  	lifecycle.setLifecycleId('lcId');
    assert.equal(lifecycle.getLifecycleId(), 'lcId');
    lifecycle.setLifecycleName('lcName');
    assert.equal(lifecycle.getLifecycleName(), 'lcName');

    let newEntity = new Entity({id: 'entId'});
    lifecycle.setEntity(newEntity);
    assert.deepEqual(lifecycle.getEntity(), newEntity);
    assert.equal(lifecycle.getEntityId(), 'entId');

    let newState = new State({id: 'stId'});
    lifecycle.setStates([newState]);
    assert.deepEqual(lifecycle.getStates(), [newState]);
    assert.equal(lifecycle.getStates()[0].getStateId(), newState.getStateId());

    lifecycle.setEntityState(newState);
    assert.deepEqual(lifecycle.getEntityState(), newState);

    let newFromState = new State({id: 'fromStateId'});
    lifecycle.setEntityStateFrom(newFromState);
    assert.deepEqual(lifecycle.getEntityStateFrom(), newFromState);

    let toFromState = new State({id: 'toStateId'});
    lifecycle.setEntityStateTo(toFromState);
    assert.deepEqual(lifecycle.getEntityStateTo(), toFromState);

    let newTransition = new Transition({id: 'trnId'});
    lifecycle.setTransitions([newTransition]);
    assert.equal(lifecycle.getTransitions()[0].getTransitionId(), newTransition.getTransitionId());
  });

  it('check lifecycle object disallow update', function() {
    let fromState = new State({id: 'fromStateId'}),
        toState = new State({id: 'toStateId'}),
        state = new State({id: 'stateId'}),
        entity = new Entity({id: 'entityId', name: 'entityName', state: state}),
        transition = new Transition({id: 'transitionId', name: 'transitionName'});
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
      entity: entity,
      states: [state],
      from: fromState,
      to: toState,
      transitions: [transition]
    });
  	lifecycle.setLifecycleId().setLifecycleName().setEntity()
    .setStates().setEntityStateFrom().setEntityStateTo().setTransitions();
    assert.equal(lifecycle.getLifecycleId(), 'lifecycleId');
    assert.equal(lifecycle.getLifecycleName(), 'lifecycleName');
    assert.deepEqual(lifecycle.getEntity(), entity);
    assert.equal(lifecycle.getEntityId(), entity.getEntityId());
    assert.equal(lifecycle.getEntityName(), entity.getEntityName());
    assert.deepEqual(lifecycle.getStates(), [state]);
    assert.deepEqual(lifecycle.getEntityState(), state);
    assert.deepEqual(lifecycle.getEntityStateFrom(), fromState);
    assert.deepEqual(lifecycle.getEntityStateTo(), toState);
    assert.equal(lifecycle.getTransitions()[0].getTransitionId(), transition.getTransitionId());
    assert.equal(lifecycle.hasTransition('transitionName'), true);
    assert.equal(lifecycle.hasTransition(), false);
    assert.equal(lifecycle.hasTransition(transition), true);
  });

  it('check lifecycle object for non-entity state addition', function() {
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName'
    }),
      state = new State({id: 'stateId'});
    lifecycle.setEntityState(state);
    assert.equal(lifecycle.getEntityState(), undefined);
  });

  it('check lifecycle object for entity state disallow addition', function() {
    let entity = new Entity({id: 'entityId'}),
        lifecycle = new Lifecycle({
          id: 'lifecycleId',
          name: 'lifecycleName',
          entity: entity
        });
    lifecycle.setEntityState();
    assert.equal(lifecycle.getEntityState(), undefined);
  });

  it('check lifecycle object for empty transition addition', function() {
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName'
    });
    assert.equal(lifecycle.addTransition(), undefined);
    assert.notEqual(lifecycle.addTransition(new Transition()), undefined);
  });

  it('check lifecycle object for has transition', function() {
    let transition = new Transition({id: 'transitionId', name: 'transitionName'});
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName'
    });
    assert.equal(lifecycle.hasTransition(), false);
    lifecycle.addTransition(transition);
    assert.equal(lifecycle.hasTransition('transitionName'), true);
    assert.equal(lifecycle.hasTransition(transition), true);
    assert.equal(lifecycle.hasTransition('transitionName1'), false);
    assert.equal(lifecycle.hasTransition(new Transition()), false);
  });

  it('check lifecycle run method', function() {
    let solid = new State({id: 'solid', name: 'solid'}),
        liquid = new State({id: 'liquid', name: 'liquid'}),
        gas = new State({id: 'gas', name: 'gas'}),
        substance = new Entity({id: 'substance', name: 'substance'}),
        onInitialized = sinon.fake(),
        onMelted = sinon.fake(),
        onVaporized = sinon.fake(),
        onCondensed = sinon.fake(),
        onFreezed = sinon.fake(),
        init = new Transition({
          id: 'init',
          name: 'init',
          from: [],
          to: solid,
          methods: {
            start: onInitialized
          }
        }),
        melt = new Transition({
          id: 'melt',
          name: 'melt',
          from: [solid],
          to: liquid,
          methods: {
            start: onMelted
          }
        }),
        vaporize = new Transition({
          id: 'vaporize',
          name: 'vaporize',
          from: [liquid],
          to: gas,
          methods: {
            start: onVaporized
          }
        }),
        condense = new Transition({
          id: 'condense',
          name: 'condense',
          from: [gas],
          to: liquid,
          methods: {
            start: onCondensed
          }
        }),
        freeze = new Transition({
          id: 'freeze',
          name: 'freeze',
          from: [liquid],
          to: solid,
          methods: {
            start: onFreezed
          }
        });
    
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
      states: [solid, liquid, gas],
      entity: substance,
      transitions: [init, melt, vaporize, condense, freeze]
    });
    
    let clock = sinon.useFakeTimers(),
        resetHistory = () => {
          onMelted.resetHistory();
          onVaporized.resetHistory();
          onCondensed.resetHistory();
          onFreezed.resetHistory();
        };

    lifecycle.run(init, {action: 'initializing'});
    assert.notOk(onInitialized.called);
    clock.tick(1000);
    assert.ok(onInitialized.called);
    resetHistory();
    lifecycle.run(melt, {action: 'melting'});
    assert.notOk(onMelted.called);
    assert.notOk(onVaporized.called);
    assert.notOk(onCondensed.called);
    assert.notOk(onFreezed.called);
    clock.tick(1000);
    assert.ok(onMelted.called);
    assert.notOk(onVaporized.called);
    assert.notOk(onCondensed.called);
    assert.notOk(onFreezed.called);
    resetHistory();
    lifecycle.run(vaporize, {action: 'vaporizing'});
    clock.tick(1000);
    assert.ok(onVaporized.called);
    assert.notOk(onMelted.called);
    assert.notOk(onCondensed.called);
    assert.notOk(onFreezed.called);
    resetHistory();
    lifecycle.run(condense, {action: 'condensing'});
    clock.tick(1000);
    assert.ok(onCondensed.called);
    assert.notOk(onMelted.called);
    assert.notOk(onVaporized.called);
    assert.notOk(onFreezed.called);
    resetHistory();
    lifecycle.run(freeze, {action: 'freezing'});
    clock.tick(1000);
    assert.ok(onFreezed.called);
    assert.notOk(onMelted.called);
    assert.notOk(onVaporized.called);
    assert.notOk(onCondensed.called);
    resetHistory();
    lifecycle.run(vaporize, {action: 'vaporizing'});
    clock.tick(1000);
    assert.notOk(onVaporized.called);
    lifecycle.run(condense, {action: 'condensing'});
    clock.tick(1000);
    assert.notOk(onCondensed.called);
    lifecycle.run(freeze, {action: 'freezing'});
    clock.tick(1000);
    assert.notOk(onFreezed.called);
    lifecycle.run(melt, {action: 'melting'});
    clock.tick(1000);
    assert.ok(onMelted.called);
  });

  it('check lifecycle run errors', function() {
    let substance = new Entity({id: 'substance', name: 'substance'}),
        onReset = sinon.fake(),
        onInitialized = sinon.fake(),
        init = new Transition({
          id: 'init',
          name: 'init',
          from: [],
          methods: {
            start: onInitialized
          }
        }),
        reset = new Transition({
          id: 'reset',
          name: 'reset',
          methods: {
            start: onReset
          }
        });
    
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
      entity: substance,
      transitions: [init, reset]
    });
    
    let clock = sinon.useFakeTimers();

    lifecycle.run(init, {action: 'initializing'});
    assert.notOk(onInitialized.called);
    clock.tick(1000);
    assert.ok(onInitialized.called);
    assert.equal(lifecycle.getEntityState(), null);
    lifecycle.run();
    assert.notOk(onReset.called);
    lifecycle.run('reset');
    clock.tick(1000);
    assert.ok(onReset.called);
  });

  it('check lifecycle run all callbacks a) state b) transitions', function() {
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
    
    let lifecycle = new Lifecycle({
      id: 'lifecycleId',
      name: 'lifecycleName',
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

    lifecycle.run(melt, {action: 'melting'});
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
    assert.deepEqual(lifecycle.getEntityState(), liquid);
    
    resetHistory();
    lifecycle.run(vaporize, {action: 'vaporizing'});
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
    assert.deepEqual(lifecycle.getEntityState(), gas);

    resetHistory();
    lifecycle.run(condense, {action: 'condensing'});
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
    assert.deepEqual(lifecycle.getEntityState(), liquid);

    resetHistory();
    lifecycle.run(freeze, {action: 'freezing'});
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
    assert.deepEqual(lifecycle.getEntityState(), solid);
  });
};