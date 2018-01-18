import taskReducer from '../../../src/reducers/taskReducer';
import * as types from '../../../src/actions/actionTypes';

describe('Task Reducer', () => {

    //An Example of how a reducer test looks
    //All the other cases are going to be similar to this
    //I will skip those for now
    it('should handle FETCH_TASKS', () => {
        expect(
            taskReducer([], {
                type: types.FETCH_TASKS,
                tasks: {title: 'Run the tests', isNew: false, index: 0}
            })
        ).toEqual({
            state: [],
            tasks:{
                title: 'Run the tests',
                isNew: false,
                index: 0
            }
        })

        expect(
            taskReducer(
                [
                    {
                        title: 'Use Redux',
                        isNew: false,
                        index: 1
                    }
                ],
                {
                    type: types.FETCH_TASKS,
                    tasks: { title: 'Run the tests', isNew: false, index: 0}
                }
            )
        ).toEqual({
            state: [
                {
                    title: 'Use Redux',
                    isNew: false,
                    index: 1
                }
            ],
            tasks: { title: 'Run the tests', isNew: false, index: 0}
        })
    });
});