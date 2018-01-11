import React from 'react';
import PropTypes from 'prop-types';

const Task = ({ task }) => {

    return (
        <div className="card card-outline-secondary mb-3">
          <div className="card-block">
            This is some text within a card body.
          </div>
        </div>
    );
}

Task.propTypes = {
	task: PropTypes.string
};

export default Task;