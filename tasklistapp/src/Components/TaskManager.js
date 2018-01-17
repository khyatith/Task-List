import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Task from './Task';

class TaskManager extends Component {

    state = {
        isDisabledSave: true,
        currentTasks: []
    };

    componentWillMount() {
        this.props.taskActions.getAllTasks();
        this.setState({ currentTasks: this.props.tasks });
    }

    componentWillReceiveProps(nextProps){
        this.setState({ currentTasks: nextProps.tasks });
    }

    //Create a new empty task
    createNewEmptyTask = () => {
        this.setState({ isDisabledSave: false });
        const oldTasks = this.state.currentTasks;
        const index = oldTasks.tasks.length ? oldTasks.tasks.length : 0;
        const newTask = { title: '', isNew: true, index: index};
        oldTasks.tasks.unshift(newTask);
        this.setState({ currentTasks: oldTasks });
    }

    //Saves all the tasks
    saveTasks = () => {
        const { tasks } = this.state.currentTasks;
        let hasEmptyTask = false;
        tasks.map(task => {
            if(task.title === '') {
                hasEmptyTask = true;
                return hasEmptyTask;
            } else {
                task.isNew = false;
                return task;
            }
        });
        if (hasEmptyTask) {
            this.props.taskActions.receiveNotifications('Cannot create an Empty Task', 'danger');
        } else {
            this.setState({ isDisabledSave: true, isEditTitle: false });
            this.props.taskActions.saveTasks(tasks);
        }
    }

    //Update the new task title
    updateNewTaskTitle = (title, index) => {
        this.props.taskActions.editTitle(title, index);
    }

    //Delete tasks
    deleteSelectedTask = (task) => {
        const { tasks } = this.state.currentTasks;
        const newTasks = tasks.filter(oldTask => oldTask.index !== task.index);
        this.props.taskActions.saveTasks(newTasks);
    }

    closeNotification = (e) => {
        e.preventDefault();
        this.props.taskActions.resetErrorNotification();
    }

    //Edit the title of the task when the task is already created
    editTitle = (index) => {
        const { tasks } = this.state.currentTasks;
        tasks.map(task => {
            if(task.index === index) {
                task.isNew = true;
            }
            return task;
        });

        this.setState({ isDisabledSave: false });
    }

    render() {
        const { notification, level } = this.props.tasks;
        const { isDisabledSave, currentTasks } = this.state;
        const alertClass = `alert alert-${level} alert-dismissable`;
        return (
            <div className="container layout">
                <div className="row header-row">
                    <div className="col-md-8">
                        <h2 className="headerTitle">Tasks</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-toolbar">
                            <button className="btn btn-secondary" type="button" onClick={ this.createNewEmptyTask }>Add Task</button>
                            <button className="btn btn-success" disabled={ isDisabledSave } onClick={ this.saveTasks }>Save</button>
                        </div>
                    </div>
                </div>
                {
                    notification &&
                    <div className={alertClass}>
                        <button type="button" className="close" data-dismiss="alert" aria-label="close" onClick={ this.closeNotification }>×</button>
                        <strong>{ notification }</strong>
                    </div>
                }
                {
                    currentTasks.tasks.map( (task) => {
                        const { index } = task;
                        return (
                            <div className="row" key={ index }>
                                <div className="col-md-12">
                                    <Task
                                        task={ task }
                                        index={ index }
                                        updateNewTaskTitle={ this.updateNewTaskTitle }
                                        newTask={ this.state.addNewTask }
                                        deleteSelectedTask={ this.deleteSelectedTask }
                                        editTitle={ this.editTitle }
                                    />
                                </div>
                            </div>
                        );
                    })
                }
            </div>
        );
    }
}

TaskManager.propTypes = {
    taskActions: PropTypes.object,
    tasks: PropTypes.object
};

function mapStateToProps(state) {
    return {
        tasks: state.tasks
    };
}

function mapDispatchToProps(dispatch) {
    return {
        taskActions: bindActionCreators(taskActions, dispatch)
    };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TaskManager);