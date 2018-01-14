import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Task from './Task';

class TaskManager extends Component {

    state = {
        isDisabledSave: true
    };

    componentWillMount() {
        this.props.taskActions.getAllTasks();
    }

    createNewEmptyTask = () => {
        this.setState({ isDisabledSave: false });
        const { tasks } = this.props.tasks;
        const index = tasks.length ? tasks.length : 0;
        this.props.taskActions.createNewEmptyTask(index);
    }

    saveTasks = () => {
        const { tasks } = this.props.tasks;
        let hasEmptyTask = false;
        tasks.map(task => {
            if(task.title == null) {
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
            this.setState({ isDisabledSave: true });
            this.props.taskActions.saveTasks(tasks);
        }
    }

    updateNewTaskTitle = (title, index) => {
        this.props.taskActions.editTitle(title, index);
    }

    deleteSelectedTask = (task) => {
        const { tasks } = this.props.tasks;
        const newTasks = tasks.filter(oldTask => oldTask.index !== task.index);
        this.props.taskActions.saveTasks(newTasks);
    }

    closeNotification = (e) => {
        e.preventDefault();
        this.props.taskActions.resetErrorNotification();
    }

    render() {
        //TODO:
        // 5. Write Tests
        const { tasks, notification, level } = this.props.tasks;
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
                            <button className="btn btn-success" disabled={ this.state.isDisabledSave } onClick={ this.saveTasks }>Save</button>
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
                    tasks.map( (task) => {
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