import initialState from './initialState';
import { FETCH_TASKS, ADD_TASK } from '../actions/actionTypes';

export default function tasks(state = initialState, action) {

    switch (action.type) {

        case FETCH_TASKS:
            console.log('FETCH_STUFF Action')
            return action;

        case ADD_TASK:
            return {
                ...state,
                tasks: [...state.tasks, 'New Task']
            };

        default:
            return state;
    }
}