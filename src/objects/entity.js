'use strict';

function Entity(entity) {
	let time = new Date().getTime();
	this.id = entity && entity.id || `fsm_entity_id_${time}`;
	this.name = entity && entity.name || `fsm_entity_name_${time}`;

	// Entity Current State
	let entityState = entity && entity.state || null;
	if (entityState) {
		entityState.setEntityId(this.id);
	}
	this.state = entityState;

	return this;
}

Entity.prototype.getEntityId = function() {
	return this.id;
};

Entity.prototype.setEntityId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

Entity.prototype.getEntityName = function() {
	return this.name;
};

Entity.prototype.setEntityName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

Entity.prototype.getEntityState = function() {
	return this.state;
};

Entity.prototype.setEntityState = function(state) {
	if (state) {
		state.setEntityId(this.id);
		this.state = state;
	}
	return this;
};

Entity.prototype.getEntityStateName = function() {
	return this.state && this.state.getStateName();
};

Entity.prototype.getEntityStateId = function() {
	return this.state && this.state.getStateId();
};

export default Entity;