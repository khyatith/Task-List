import * as types from './actionTypes';

//calls the fetch tasks endpoint
export function getAllTasks() {
    return dispatch => {
        return fetch('http://cfassignment.herokuapp.com/khyati/tasks', {
            method: 'GET',
            mode: 'cors'
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            if(json.error) {
                throw json.error;
            }
            dispatch(receiveTasks(json))
        })
        .catch(error => {
            dispatch(receiveNotifications(error, 'danger'))
        });
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

export function receiveNotifications(message, level) {
    return {
        type: types.REPORT_NOTIFICATION,
        message,
        level
    };
}

//calls the save tasks endpoint
export function saveTasks(taskObj) {

    return dispatch => {
        return fetch('http://cfassignment.herokuapp.com/khyati/tasks', {
            method: 'POST',
            mode: 'cors',
            body: JSON.stringify({
                tasks: taskObj
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            return response.json();
        })
        .then(json => {
            if(json.error) {
                throw json.error;
            }
            dispatch(saveFinalTasks(json));
        })
        .catch(error => dispatch(receiveNotifications(error, 'danger')));
    }
};

export function saveFinalTasks(json) {
    return {
        type: types.SAVE_TASKS,
        tasks: json.tasks
    }
};

export function resetErrorNotification() {
    return {
        type: types.RESET_NOTIFICATION
    }
};

