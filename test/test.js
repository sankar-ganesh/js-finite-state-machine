const EntityTest = require('./src/objects/entity_test');
const EventTest = require('./src/objects/event_test');
const StateTest = require('./src/objects/state_test');
const TransitionTest = require('./src/objects/transition_test');
const LifecycleTest = require('./src/objects/lifecycle_test');
const FSMTest = require('./src/fsm_test');

describe('FSM JS Test', function() {
	describe('Entity Utils Test', EntityTest.bind(this));
	describe('Event Utils Test', EventTest.bind(this));
	describe('State Utils Test', StateTest.bind(this));
	describe('Transition Utils Test', TransitionTest.bind(this));
	describe('Lifecycle Utils Test', LifecycleTest.bind(this));
	describe('FSM Test', FSMTest.bind(this));
});