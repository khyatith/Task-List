import initialState from './initialState';
import {FETCH_TASKS, ADD_TASK} from '../actions/actionTypes';

export default function stuff(state = initialState.tasks, action) {
  let newState;
  switch (action.type) {
    case FETCH_TASKS:
      console.log('FETCH_STUFF Action')
      return action;
    case ADD_TASK:
      newState = action.stuff;
      console.log('RECEIVE_STUFF Action')
      return newState;
    default:
      return state;
  }
}