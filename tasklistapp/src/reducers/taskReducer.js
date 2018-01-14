import initialState from './initialState';
import { FETCH_TASKS, ADD_TASK, EDIT_TASK, SAVE_TASKS, REPORT_NOTIFICATION, RESET_NOTIFICATION } from '../actions/actionTypes';
import _ from 'lodash';

export default function tasks(state = initialState, action) {

    switch (action.type) {

        case FETCH_TASKS:
            const allTasks = action.tasks;
            return {
                tasks: allTasks,
                state
            }

        case ADD_TASK:
            const i = action.index;
            const newTask = { title: null, isNew: true, index: i};
            const currentTasks = _.cloneDeep(state);
            currentTasks.tasks.unshift(newTask);
            return {
                ...state,
                ...currentTasks
            };

        case EDIT_TASK:
            const oldTasks =  _.cloneDeep(state);
            const { title, index } = action;
            const targetTask = oldTasks.tasks.find(task => task.index === index);
            targetTask.title = title;
            return {
                ...state,
                ...oldTasks
            }

        case SAVE_TASKS:
            const newTasks = action.tasks;
            return {
                ...state,
                tasks: newTasks,
                notification: 'Tasks Saved Successfully',
                level: 'success'
            }

        case REPORT_NOTIFICATION:
            const { message, level } = action;
            return {
                ...state,
                notification: message,
                level: level
            };

        case RESET_NOTIFICATION:
            return {
                ...state,
                notification: '',
                level: ''
            }

        default:
            return state;
    }
}