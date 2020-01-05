import FSM from './src/fsm';
import Entity from './src/objects/entity';
import State from './src/objects/state';
import Transition from './src/objects/transition';

FSM.Entity = Entity;
FSM.State = State;
FSM.Transition = Transition;
window.FSM = FSM;
