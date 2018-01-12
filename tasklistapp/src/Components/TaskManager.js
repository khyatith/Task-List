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

    createNewTask = () => {
        this.setState({ isDisabledSave: false });
        this.props.taskActions.createNewTask();
    }

    saveTasks = () => {
        const { tasks } = this.props.tasks;
        tasks.map(task => {
            task.isNew = false;
            return task;
        });
        this.props.taskActions.saveTasks(tasks);
    }

    updateNewTaskTitle = (title, index) => {
        this.props.taskActions.editTitle(title, index);
    }

    deleteSelectedTask = (task, index) => {
        const { tasks } = this.props.tasks;
        tasks.splice(index, 1);
        this.props.taskActions.saveTasks(tasks);
    }

    render() {
        //TODO: 1. find out a way to show errors
        // 2. show an alert when the tasks are saved
        // 3. show an alert when the tasks are deleted
        // 4. Improve css
        // 5. Write Tests
        const { tasks } = this.props.tasks;
        return (
            <div className="container layout">
                <div className="row header-row">
                    <div className="col-md-8">
                        <h2>Tasks</h2>
                    </div>
                    <div className="col-md-4">
                        <div className="btn-toolbar">
                            <button className="btn btn-secondary" type="button" onClick={ this.createNewTask }>Add Task</button>
                            <button className="btn btn-success" disabled={ this.state.isDisabledSave } onClick={ this.saveTasks }>Save</button>
                        </div>
                    </div>
                </div>
                {
                    tasks.length !== 0 ?
                    tasks.map( (task, i) => {
                        return (
                            <div className="row" key={ i }>
                                <div className="col-md-12">
                                    <Task
                                        task={ task }
                                        index={ i }
                                        updateNewTaskTitle={ this.updateNewTaskTitle }
                                        newTask={ this.state.addNewTask }
                                        deleteSelectedTask={ this.deleteSelectedTask }
                                    />
                                </div>
                            </div>
                        );
                    })
                    :
                    <div className="alert alert-info">
                        There are no Tasks yet! Click on Add Task to create some tasks of your own
                    </div>
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