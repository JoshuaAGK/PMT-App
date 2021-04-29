import { createSlice } from '@reduxjs/toolkit';

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        text: ""
    },
    reducers: {
        setText: (state = initialState, action) => {
            state.text = action.payload;
        }
    }
});

console.log(journalSlice);

export function selectJournal(state) {
    return state.journal;
}

const { actions, reducer } = journalSlice;
export const { setText } = actions;
export default reducer;