'use strict';

function State(state) {
	let time = new Date().getTime();
	this.id = state && state.id || `fsm_state_id_${time}`;
	this.name = state && state.name || `fsm_state_name_${time}`;

	// Entity Id : This helps to identify the entity to which the state belongs to
	this.entityId = state && state.entityId || null;

	// Initialize Methods
	this.methods = {};

	// State hooks
	this.setMethods(state && state.methods);

	return this;
}

State.prototype.getStateId = function() {
	return this.id;
};

State.prototype.setStateId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

State.prototype.getStateName = function() {
	return this.name;
};

State.prototype.setStateName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

State.prototype.getEntityId = function() {
	return this.entityId;
};

State.prototype.setEntityId = function(entityId) {
	if (entityId) {
		this.entityId = entityId;
	}
	return this;
};

State.prototype.getMethods = function() {
	return this.methods;
};

State.prototype.setMethodEnter = function(enter) {
	if (enter) {
		this.methods.enter = enter;
	}
	return this;
};

State.prototype.setMethodLeave = function(leave) {
	if (leave) {
		this.methods.leave = leave;
	}
	return this;
};

State.prototype.setMethodEntered = function(entered) {
	if (entered) {
		this.methods.entered = entered;
	}
	return this;
};

State.prototype.setMethodLeft = function(left) {
	if (left) {
		this.methods.left = left;
	}
	return this;
};

State.prototype.setMethodReached = function(reached) {
	if (reached) {
		this.methods.reached = reached;
	}
	return this;
};

State.prototype.setMethods = function(methods) {
	let stateHooks = methods || {};
	this.setMethodEnter(stateHooks.enter || function() { return true; });
	this.setMethodLeave(stateHooks.leave || function() { return true; });
	this.setMethodEntered(stateHooks.entered || function() { return true; });
	this.setMethodLeft(stateHooks.left || function() { return true; });
	this.setMethodReached(stateHooks.reached || function() { return true; });
	return this;
};

State.prototype.enter = function(from, payload) {
	return this.methods.enter.apply(this, arguments);
};

State.prototype.leave = function(to, payload) {
	return this.methods.leave.apply(this, arguments);
};

State.prototype.reached = function(to, payload) {
	return this.methods.reached.apply(this, arguments);
};

State.prototype.entered = function(from, payload) {
	return this.methods.entered.apply(this, arguments);
};

State.prototype.left = function(to, payload) {
	return this.methods.left.apply(this, arguments);
};

export default State;