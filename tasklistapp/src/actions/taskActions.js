import * as types from './actionTypes';

export function getAllTasks() {
    return dispatch => {
        return fetch('http://cfassignment.herokuapp.com/diana/tasks', {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => response.json())
        .then(json => dispatch(receiveTasks(json)));
    }
};

export function editTitle(title, index) {
    return {
        type: types.EDIT_TASK,
        title,
        index
    };
}

export function receiveTasks(json) {
    return {
        type: types.FETCH_TASKS,
        tasks: json.tasks
    };
}

export function createNewTask() {
    return { type: types.ADD_TASK };
};

export function saveTasks(taskObj) {

    return dispatch => {
        return fetch('http://cfassignment.herokuapp.com/diana/tasks', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                tasks: taskObj
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(json => dispatch(saveFinalTasks(json)));
    }
}

export function saveFinalTasks(json) {
    return {
        type: types.SAVE_TASKS,
        tasks: json.tasks
    }
}