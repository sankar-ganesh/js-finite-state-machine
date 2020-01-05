var assert = require('chai').assert;

import Entity from '../../../src/objects/entity';
import State from '../../../src/objects/state';

module.exports = function EntityTest() {
  it('check entity is of type object', function() {
  	let entity = new Entity();
    assert.equal(typeof entity, 'object');
  });

  it('check entity object is auto generated', function() {
  	let entity = new Entity();
    assert.include(entity.getEntityId(), 'fsm_entity_id_');
    assert.include(entity.getEntityName(), 'fsm_entity_name_');
    assert.equal(entity.getEntityState(), null);
  });

  it('check entity object is generated', function() {
    let state = new State({id: 'stateId', name: 'stateName'});
  	let entity = new Entity({
  		id: 'entityId',
  		name: 'entityName',
      state: state
  	});
    assert.equal(entity.getEntityId(), 'entityId');
    assert.equal(entity.getEntityName(), 'entityName');
    assert.deepEqual(entity.getEntityState(), state);
    assert.equal(entity.getEntityState().getEntityId(), 'entityId');
    assert.equal(entity.getEntityStateId(), 'stateId');
    assert.equal(entity.getEntityStateName(), 'stateName');
  });

  it('check entity object allows id update', function() {
    let state = new State({id: 'stateId', name: 'stateName'});
    let entity = new Entity({
  		id: 'entityId',
  		name: 'entityName',
      state: state
  	});
  	entity.setEntityId('eId');
    assert.equal(entity.getEntityId(), 'eId');
    entity.setEntityName('eName');
    assert.equal(entity.getEntityName(), 'eName');
    let newState = new State({id: 'sId', name: 'sName'});
    entity.setEntityState(newState);
    assert.deepEqual(entity.getEntityState(), newState);
    assert.equal(entity.getEntityState().getEntityId(), 'eId');
    assert.equal(entity.getEntityStateId(), 'sId');
    assert.equal(entity.getEntityStateName(), 'sName');
  });

  it('check entity object disallow update', function() {
    let state = new State({id: 'stateId', name: 'stateName'});
    let entity = new Entity({
  		id: 'entityId',
  		name: 'entityName',
      state: state
  	});
  	entity.setEntityId().setEntityName().setEntityState();
    assert.equal(entity.getEntityId(), 'entityId');
    assert.equal(entity.getEntityName(), 'entityName');
    assert.deepEqual(entity.getEntityState(), state);
    assert.equal(entity.getEntityState().getEntityId(), 'entityId');
    assert.equal(entity.getEntityStateId(), 'stateId');
    assert.equal(entity.getEntityStateName(), 'stateName');
  });
};