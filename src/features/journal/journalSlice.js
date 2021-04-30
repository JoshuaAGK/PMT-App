import { createSlice } from '@reduxjs/toolkit';

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        text: "",
        mood: -1
    },
    reducers: {
        setText: (state = initialState, action) => {
            state.text = action.payload;
        },
        setMood: (state = initialState, action) => {
            state.mood = action.payload
        }
    }
});

export function selectJournal(state) {
    return state.journal;
}

const { actions, reducer } = journalSlice;
export const { setText, setMood } = actions;
export default reducer;