import initialState from './initialState';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, SAVE_TASKS } from '../actions/actionTypes';
import _ from 'lodash';

export default function tasks(state = initialState, action) {

    switch (action.type) {

        case FETCH_TASKS:
            const allTasks = action.tasks ? action.tasks : [];
            return {
                tasks: allTasks,
                state
            }

        case ADD_TASK:
            const newTask = { title: 'NewTask', isNew: true };
            const currentTasks = _.cloneDeep(state);
            currentTasks.tasks.unshift(newTask);
            return {
                ...state,
                ...currentTasks
            };

        case EDIT_TASK:
            const oldTasks =  _.cloneDeep(state);
            const { title, index } = action;
            oldTasks.tasks[index].title = title;
            return {
                ...state,
                ...oldTasks
            }

        case SAVE_TASKS:
            const newTasks = action.tasks;
            return {
                ...state,
                tasks: newTasks
            }

        default:
            return state;
    }
}