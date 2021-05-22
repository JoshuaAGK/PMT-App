import {createSlice} from '@reduxjs/toolkit';

const groupsSlice = createSlice({
    name: 'groups',
    initialState: {
        groupsList: []
    },
    reducers: {
        addGroup: (state = this.initialState, action) => {
            state.groupsList.push(action.payload);
        },
        removeGroup: (state = this.initialState, action) => {
            let groupIndex = state.groupsList.indexOf(action.payload);
            state.groupsList.splice(groupIndex, 1);
        },
        resetGroupsList: (state = this.initialState) => {
            state.groupsList = [];
        },
    }
});

const { actions, reducer } = groupsSlice;
const { addGroup, removeGroup, resetGroupsList } = actions;

export { addGroup, removeGroup, resetGroupsList };
export default reducer;