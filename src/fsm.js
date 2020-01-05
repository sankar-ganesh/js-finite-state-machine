'use strict';

import LifeCycle from './objects/lifecycle';
import Entity from './objects/entity';

function FSM(fsm) {
	let time = new Date().getTime(),
			id = fsm && fsm.id,
			name = fsm && fsm.name;
	this.id = id || `fsm_id_${time}`;
	this.name = name || `fsm_name_${time}`;

	// Initialize The Entity & Create The LifeCycle
	let payload = {
				id: id? `${id}_entity` : null,
				name: name? `${name}_entity` : null
			};
	payload.entity = fsm && fsm.entity || new Entity(payload);
	payload.states = fsm && fsm.states || [];
	payload.transitions = fsm && fsm.transitions || [];
	this.lifecycle = new LifeCycle(payload);

	// Initialize Lifecycle
	payload.transitions.forEach(transition => {
		let name = transition && transition.getTransitionName();
		this[name] = (payload) => this.lifecycle.run(transition, payload);
	});

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

export default FSM;