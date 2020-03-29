'use strict';

import EventEmitter from './event_emitter';

function Lifecycle(lifecycle) {
	let time = new Date().getTime();
	this.id = lifecycle && lifecycle.id || `fsm_lifecycle_id_${time}`;
	this.name = lifecycle && lifecycle.name || `fsm_lifecycle_name_${time}`;

	// Entity Object
	this.entity = lifecycle && lifecycle.entity || null;

	// Entity States
	this.states = lifecycle && lifecycle.states || [];

	// Current Entity From State
	this.from = lifecycle && lifecycle.from || null;

	// Current Entity To State
	this.to = lifecycle && lifecycle.to || null;

	// Event Emitter
	this.eventEmitter = new EventEmitter();

	// Entity Transitions
	this.setTransitions(lifecycle && lifecycle.transitions || []);

	return this;
}

Lifecycle.prototype.getLifecycleId = function() {
	return this.id;
};

Lifecycle.prototype.setLifecycleId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

Lifecycle.prototype.getLifecycleName = function() {
	return this.name;
};

Lifecycle.prototype.setLifecycleName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

Lifecycle.prototype.getEntity = function() {
	return this.entity;
};

Lifecycle.prototype.setEntity = function(entity) {
	if (entity) {
		this.entity = entity;
	}
	return this;
};

Lifecycle.prototype.getEntityId = function() {
	return this.entity && this.entity.getEntityId();
};

Lifecycle.prototype.getEntityName = function() {
	return this.entity && this.entity.getEntityName();
};

Lifecycle.prototype.getEntityState = function() {
	let entity = this.getEntity();
	return entity && entity.getEntityState();
};

Lifecycle.prototype.setEntityState = function(state) {
	if (state) {
		let entity = this.getEntity();
		if (entity) {
			entity.setEntityState(state);
		}
	}
	return this;
};

Lifecycle.prototype.getEntityStateFrom = function() {
	return this.from;
};

Lifecycle.prototype.setEntityStateFrom = function(from) {
	if (from) {
		this.from = from;
	}
	return this;
};

Lifecycle.prototype.getEntityStateTo = function() {
	return this.to;
};

Lifecycle.prototype.setEntityStateTo = function(to) {
	if (to) {
		this.to = to;
	}
	return this;
};

Lifecycle.prototype.getStates = function() {
	return this.states;
};

Lifecycle.prototype.getStateById = function(stateId) {
	if (stateId) {
		return this.states.find(state => state.getStateId() === stateId);
	}
	return null;
};

Lifecycle.prototype.getStateByName = function(stateName) {
	if (stateName) {
		return this.states.find(state => state.getStateName() === stateName);
	}
	return null;
};

Lifecycle.prototype.setStates = function(states) {
	if (states) {
		this.states = states;
	}
	return this;
};

Lifecycle.prototype.getTransitions = function() {
	return this.transitions;
};

Lifecycle.prototype.setTransitions = function(transitions) {
	if (transitions) {
		this.transitions = transitions;
		this.transitions.forEach(transition => this.addTransition(transition));
	}
	return this;
};

Lifecycle.prototype.addTransition = function(transition) {
	let transitionName = transition && transition.getTransitionName();
	if (transitionName) {
		// TODO: Push the transition to transitions array here if not exists
		this[transitionName] = transition;
		return this;
	}
};

Lifecycle.prototype.hasTransition = function(transition) {
	let transitionName = transition? (typeof transition === "string")? transition : transition.getTransitionName() : null,
			selectedTransition = transitionName && this[transitionName];
	if (selectedTransition) {
		return true;
	}
	return false;
};

Lifecycle.prototype.run = function(transition, payload) {
	let transitionName = transition? (typeof transition === "string")? transition : transition.getTransitionName() : null,
			selectedTransition = transitionName && this[transitionName];
	if (selectedTransition) {
		let from = selectedTransition && selectedTransition.getTransitionFrom(),
				state = this.entity && this.entity.getEntityState();
		
		// Allow Transition For Valid From State
		if (state && from.includes(state)) {
			setTimeout(() => this.execute(selectedTransition, payload), 0);
		} else {
			// Allow Transition For Void From State
			if (from.length === 0) {
				setTimeout(() => this.execute(selectedTransition, payload), 0);
			}
		}
	}
};

Lifecycle.prototype.execute = function(transition, payload) {
	let fromState = this.getEntityState(),
			fromStateName = fromState && fromState.getStateName(),
			transitionTo = transition.getTransitionTo(),
			toStateName = transitionTo && transitionTo.getStateName(),
			toState = this.getStateByName(toStateName);

	// Start The Transition
	this.trigger(transition.getEvents().before.value, transition, payload);
	transition.before(fromState, toState, payload);

	// Ack The Current State
	if (fromState) {
		this.trigger(fromState.getEvents().leave.value, transition, payload);
		fromState.leave(fromState, this.entity, payload);
	}

	// Awake The Transition
	this.trigger(transition.getEvents().start.value, transition, payload);
	transition.start(fromState, toState, payload);

	// Swap The Current State
	this.setEntityState(toState || null);

	// Swap The State
	if (fromStateName && toStateName) {

		// Update Transition Properties
		// if (payload.props) {
		// 	toState.setProperties(payload.props);
		// }


		// Update The State Props
		this.setEntityStateFrom(fromState.getStateName());
		this.setEntityStateTo(toState.getStateName());

		// Mark The Current State As Complete
		this.trigger(fromState.getEvents().left.value, transition, payload);
		fromState.left(fromState, this.entity, payload);

		// Ack The New State
		this.trigger(toState.getEvents().enter.value, transition, payload);
		toState.enter(toState, this.entity, payload);
		
		this.trigger(toState.getEvents().reached.value, transition, payload);
		toState.reached(toState, this.entity, payload);

		this.trigger(toState.getEvents().entered.value, transition, payload);
		toState.entered(toState, this.entity, payload);
	}
	
	// End The Transition
	this.trigger(transition.getEvents().after.value, transition, payload);
	transition.after(fromState, toState, payload);
};

Lifecycle.prototype.trigger = function(type, transition, payload) {
	if (this.eventEmitter.isEnabled()) {
		this.eventEmitter.getCallback()(type, transition, payload);
	}
};

Lifecycle.prototype.setEventCallback = function(callback) {
	this.eventEmitter.setCallback(callback);
};

Lifecycle.prototype.resetEventCallback = function() {
	this.eventEmitter.clear();
};

Lifecycle.prototype.getEventEmitter = function() {
	return this.eventEmitter;
};

export default Lifecycle;