import * as types from './actionTypes';

export function getAllTasks() {
    return { type: types.FETCH_TASKS }
};

export function createNewTask() {
    return { type: types.ADD_TASK };
};