var assert = require('chai').assert;

import Event from '../../../src/objects/event';

module.exports = function EventTest() {
  it('check event is of type object', function() {
  	let event = new Event();
    assert.equal(typeof event, 'object');
  });

  it('check event id and name are auto generated', function() {
  	let event = new Event();
    assert.include(event.getEventId(), 'fsm_event_id_');
    assert.include(event.getEventName(), 'fsm_event_name_');
  });

  it('check event object is generated', function() {
  	let event = new Event({
  		id: 'eventId',
  		name: 'eventName',
      entityId: 'entityId',
      type: 'eventType',
      payload: {
        eventType: 'create'
      }
  	});
    assert.equal(event.getEventId(), 'eventId');
    assert.equal(event.getEventName(), 'eventName');
    assert.equal(event.getEntityId(), 'entityId');
    assert.equal(event.getEventType(), 'eventType');
    assert.equal(event.getPayload().eventType, 'create');
  });

  it('check event object allows update', function() {
    let event = new Event({
  		id: 'eventId',
  		name: 'eventName',
      entityId: 'entityId',
      type: 'eventType'
  	});
  	event.setEventId('eId');
    assert.equal(event.getEventId(), 'eId');
    event.setEventName('eName');
    assert.equal(event.getEventName(), 'eName');
    event.setEntityId('entId');
    assert.equal(event.getEntityId(), 'entId');
    event.setEventType('create');
    assert.equal(event.getEventType(), 'create');
    event.setPayload({
      eventType: 'create'
    });
    assert.equal(event.getPayload().eventType, 'create');
  });

  it('check event object allows function chaining and disallows update ', function() {
    let event = new Event({
  		id: 'eventId',
  		name: 'eventName',
      entityId: 'entityId',
      type: 'eventType',
      payload: {
        eventType: 'create'
      }
  	});
  	event.setEventId().setEventName().setEntityId().setEventType().setPayload();
    assert.equal(event.getEventId(), 'eventId');
    assert.equal(event.getEventName(), 'eventName');
    assert.equal(event.getEntityId(), 'entityId');
    assert.equal(event.getEventType(), 'eventType');
    assert.equal(event.getPayload().eventType, 'create');
  });
};