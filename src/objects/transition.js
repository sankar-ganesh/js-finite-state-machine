'use strict';

function Transition(transition) {
	let time = new Date().getTime();
	this.id = transition && transition.id || `fsm_transition_id_${time}`;
	this.name = transition && transition.name || `fsm_transition_name_${time}`;

	// Entity Id : This helps to identify the entity to which the transition belongs to
	this.entityId = transition && transition.entityId || null;

	// From State : This helps to identify the entity states from which the transition can possibly start
	this.from = transition && transition.from || [];
	
	// To State : This helps to identify the entity state to which the transition moves into
	this.to = transition && transition.to || null;

	// Initialise Methods
	this.methods = {};

	// Transition hooks
	this.setMethods(transition && transition.methods);

	return this;
}

Transition.prototype.getTransitionId = function() {
	return this.id;
};

Transition.prototype.setTransitionId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

Transition.prototype.getTransitionName = function() {
	return this.name;
};

Transition.prototype.setTransitionName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

Transition.prototype.getEntityId = function() {
	return this.entityId;
};

Transition.prototype.setEntityId = function(entityId) {
	if (entityId) {
		this.entityId = entityId;
	}
	return this;
};

Transition.prototype.getTransitionFrom = function() {
	return this.from;
};

Transition.prototype.setTransitionFrom = function(from) {
	if (from) {
		this.from = from;
	}
	return this;
};

Transition.prototype.addStates = function(states) {
	let stateType = states && states.constructor,
			isArray = stateType && stateType.name === "Array";

	if (isArray) {
		states.forEach(state => this.from.push(state));
	}

	return this;
};

Transition.prototype.getTransitionTo = function() {
	return this.to;
};

Transition.prototype.setTransitionTo = function(to) {
	if (to) {
		this.to = to;
	}
	return this;
};

Transition.prototype.getMethods = function() {
	return this.methods;
};

Transition.prototype.setMethodBefore = function(before) {
	if (before) {
		this.methods.before = before;
	}
	return this;
};

Transition.prototype.setMethodAfter = function(after) {
	if (after) {
		this.methods.after = after;
	}
	return this;
};

Transition.prototype.setMethodStart = function(start) {
	if (start) {
		this.methods.start = start;
	}
	return this;
};

Transition.prototype.setMethods = function(methods) {
	let transitionHooks = methods || {};
	this.setMethodBefore(transitionHooks.before || function() { return true; });
	this.setMethodAfter(transitionHooks.after || function() { return true; });
	this.setMethodStart(transitionHooks.start || function() { return true; });
	return this;
};

Transition.prototype.before = function(from, payload) {
	return this.methods.before.apply(this, arguments);
};

Transition.prototype.after = function(to, payload) {
	return this.methods.after.apply(this, arguments);
};

Transition.prototype.start = function(from, to, payload) {
	return this.methods.start.apply(this, arguments);
};

export default Transition;