import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task, index, updateNewTaskTitle, deleteSelectedTask }) => {

    const updateTitle = (e) => {
        e.preventDefault();
        updateNewTaskTitle(e.target.value, index);
    };

    const deleteTask = (e) => {
        e.preventDefault();
        deleteSelectedTask(task);
    }

    const { isNew, title } = task;
    return (
        <div className="card card-outline-secondary mb-3">
            <div className="card-block">
                <div className="row">
                    <div className="col-md-10">
                        {
                            isNew ?
                            <input className="form-control input-lg" type="text" placeholder="Enter Task Name" onChange={ updateTitle } autoFocus />
                            :
                            <h2 className="taskTitle">{ title }</h2>
                        }
                    </div>
                    <div className="col-md-2 trash-icon">
                        <i className="fa fa-trash-o fa-2x" aria-hidden="true" onClick={ deleteTask }></i>
                    </div>
                </div>
            </div>
        </div>
    );
}

Task.propTypes = {
	task: PropTypes.object.isRequired,
    index: PropTypes.number.isRequired,
    updateNewTaskTitle: PropTypes.func.isRequired,
    deleteSelectedTask: PropTypes.func.isRequired
};

export default Task;