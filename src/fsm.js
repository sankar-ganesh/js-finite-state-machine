'use strict';

import LifeCycle from './objects/lifecycle';
import Entity from './objects/entity';

function FSM(fsm) {
	let time = new Date().getTime(),
			id = fsm && fsm.id,
			name = fsm && fsm.name,
			callback = fsm && fsm.callback || null;
	this.id = id || `fsm_id_${time}`;
	this.name = name || `fsm_name_${time}`;

	// Initialize The Entity & Create The LifeCycle
	let payload = {
				id: id? `${id}_entity` : null,
				name: name? `${name}_entity` : null
			};
	payload.entity = fsm && fsm.entity || new Entity(payload);
	payload.states = fsm && fsm.states || [];
	
	// Identify the entity id
	let entityId = payload.entity.getEntityId();
	
	// Set EntityId for all states
	payload.states.forEach(state => state.setEntityId(entityId));
	
	payload.transitions = fsm && fsm.transitions || [];
	this.lifecycle = new LifeCycle(payload);

	// Initialize Lifecycle
	payload.transitions.forEach(transition => {
		// Set EntityId for all transitions
		transition.setEntityId(entityId);
		let name = transition && transition.getTransitionName();
		this[name] = (payload) => this.lifecycle.run(transition, payload);
	});

	// Initialize Event Emitter
	this.lifecycle.setEventCallback(callback);

	return this; 
}

FSM.prototype.getFSMId = function() {
	return this.id;
};

FSM.prototype.setFSMId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

FSM.prototype.getFSMName = function() {
	return this.name;
};

FSM.prototype.setFSMName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

FSM.prototype.getEntity = function() {
	return this.lifecycle.getEntity();
};

FSM.prototype.getEntityId = function() {
	return this.lifecycle.getEntityId();
};

FSM.prototype.getEntityName = function() {
	return this.lifecycle.getEntityName();
};

FSM.prototype.setEntityState = function(state) {
	this.lifecycle.setEntityState(state);
};

FSM.prototype.getEntityState = function() {
	return this.lifecycle.getEntityState();
};

FSM.prototype.setStates = function(states) {
	this.lifecycle.setStates(states);
};

FSM.prototype.getStates = function() {
	return this.lifecycle.getStates();
};

FSM.prototype.setTransitions = function(transitions) {
	this.lifecycle.setTransitions(transitions);
};

FSM.prototype.getTransitions = function() {
	return this.lifecycle.getTransitions();
};

FSM.prototype.setEventCallback = function(callback) {
	this.lifecycle.setEventCallback(callback);
};

FSM.prototype.resetEventCallback = function() {
	this.lifecycle.resetEventCallback();
};

FSM.prototype.getEventEmitter = function() {
	return this.lifecycle.getEventEmitter();
};

export default FSM;