import React from 'react';
import Task from '../../../src/Components/Task';
import PropTypes from 'prop-types';
import { mount, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-15.4';

configure({ adapter: new Adapter() });

describe('Task', () => {
    let wrapper;
    let props = {
        task: { title: 'test', isNew: true, index: 0 },
        index: 0,
        updateNewTaskTitle: jest.fn(),
        deleteSelectedTask: jest.fn(),
        editTitle: jest.fn()
    };

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('renders Task component', () => {
        wrapper = mount(<Task { ...props } />);
        expect(wrapper.length).toEqual(1);
    });

    it('renders input if task isNew is set to true and calls update title when title is changed', () => {
        wrapper = mount(<Task { ...props } />);
        const input = wrapper.find('.input-lg');
        expect(input.length).toEqual(1);
        input.simulate('change');
        expect(wrapper.props().updateNewTaskTitle).toBeCalled();
    });

    it('renders title if task isNew is set to false and calls edit title if title is clicked', () => {
        props = {
            task: { title: 'test', isNew: false, index: 1 },
            index: 0,
            updateNewTaskTitle: jest.fn(),
            deleteSelectedTask: jest.fn(),
            editTitle: jest.fn()
        };
        wrapper = mount(<Task { ...props } />);
        const h2 = wrapper.find('.taskTitle');
        expect(h2.length).toEqual(1);
        h2.simulate('click');
        expect(wrapper.props().editTitle).toBeCalled();
    });

    it('renders a trash icon and when it is clicked, deleteTitle is called', () => {
        wrapper = mount(<Task {...props} />);
        const deleteIcon = wrapper.find('.fa-trash-o');
        expect(deleteIcon.length).toEqual(1);
        deleteIcon.simulate('click');
        expect(wrapper.props().deleteSelectedTask).toBeCalled();
    });
})