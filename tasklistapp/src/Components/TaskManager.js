import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as taskActions from '../actions/taskActions';
import PropTypes from 'prop-types';
import React, { Component } from 'react';
import Task from './Task';

class TaskManager extends Component {

    componentWillMount() {

    }

    createNewTask = () => {
        this.props.taskActions.createNewTask();
    }

    render() {
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
                            <button className="btn btn-success" disabled="disabled">Save</button>
                        </div>
                    </div>
                </div>
                {
                    tasks && tasks.map( (task, i) => {
                        return (
                            <div className="row" key={ i }>
                                <div className="col-md-12">
                                    <Task task={ task } />
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