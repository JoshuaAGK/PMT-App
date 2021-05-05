import { createSlice } from '@reduxjs/toolkit';

const journalSlice = createSlice({
    name: 'journal',
    initialState: {
        text: '',
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

const { actions, reducer } = journalSlice;
export const { setText, setMood } = actions;
export default reducer;