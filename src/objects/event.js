'use strict';

function Event(event) {
	let time = new Date().getTime();
	this.id = event && event.id || `fsm_event_id_${time}`;
	this.name = event && event.name || `fsm_event_name_${time}`;

	// Entity Id : This helps to identify the entity to which the event belongs to
	this.entityId = event && event.entityId || null;

	// Event Type : This enables the entity to identify the transition
	this.type = event && event.type || null;

	// Event Payload : This enables the entity to offer data for the identified transition
	this.payload = event && event.payload || {};
	return this;
}

Event.prototype.getEventId = function() {
	return this.id;
};

Event.prototype.setEventId = function(id) {
	if (id) {
		this.id = id;
	}
	return this;
};

Event.prototype.getEventName = function() {
	return this.name;
};

Event.prototype.setEventName = function(name) {
	if (name) {
		this.name = name;
	}
	return this;
};

Event.prototype.getEntityId = function() {
	return this.entityId;
};

Event.prototype.setEntityId = function(entityId) {
	if (entityId) {
		this.entityId = entityId;
	}
	return this;
};

Event.prototype.getEventType = function() {
	return this.type;
};

Event.prototype.setEventType = function(type) {
	if (type) {
		this.type = type;
	}
	return this;
};

Event.prototype.getPayload = function() {
	return this.payload;
};

Event.prototype.setPayload = function(payload) {
	if (payload) {
		this.payload = payload;
	}
	return this;
};

export default Event;