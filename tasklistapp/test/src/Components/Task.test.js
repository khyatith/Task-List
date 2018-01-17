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
        updateNewTaskTitle: function(){},
        deleteSelectedTask: function(){},
        editTitle: function(){}
    };

    beforeEach(() => {
        wrapper = mount(<Task { ...props } />);
    });

    afterEach(() => {
        wrapper && wrapper.unmount();
    });

    it('renders Task component', () => {
        expect(wrapper.length).toEqual(1);
    });

    it('renders input if task isNew is set to true', () => {
        const input = wrapper.find('.input-lg');
        expect(input.length).toEqual(1);
        const updateTitle = jest.fn();
        input.simulate('Change');
        expect(updateTitle).toBeCalled();
    });
})