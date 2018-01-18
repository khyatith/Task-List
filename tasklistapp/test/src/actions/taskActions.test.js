import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import * as actions from '../../../src/actions/taskActions';
import * as types from '../../../src/actions/actionTypes';
import fetchMock from 'fetch-mock';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);

//All the other test cases will look almost similar
//I will skip those for now
describe('async actions', () => {

    afterEach(() => {
        fetchMock.reset();
        fetchMock.restore();
    });

    it('creates FETCH_TASKS when all tasks have been fetched', () => {

        fetchMock
            .getOnce('http://cfassignment.herokuapp.com/khyati/tasks', {method: 'GET', mode: 'cors'});

        const store = mockStore({ tasks: [] });
        return store.dispatch(actions.getAllTasks())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual('FETCH_TASKS');
            })
    });

    it('creates SAVE_TASKS when the tasks are saved', () => {

        const taskObj = { title: "Test", isNew: false, index: 0 };

        fetchMock
            .post('http://cfassignment.herokuapp.com/khyati/tasks',
                {
                    method: 'POST',
                    mode: 'cors',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(taskObj)
                }
            );

        const store = mockStore({ tasks: [] });
        return store.dispatch(actions.saveTasks())
            .then(() => {
                const actions = store.getActions();
                expect(actions[0].type).toEqual('SAVE_TASKS');
            })
    });

});