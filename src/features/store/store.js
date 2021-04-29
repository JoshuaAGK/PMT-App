import { configureStore } from '@reduxjs/toolkit';
import { createStore } from 'redux';
import { combineReducers } from 'redux';
import journalReducer from '../journal/journalSlice';

const rootReducer = combineReducers({
    journal: journalReducer
});

const store = configureStore({ reducer: rootReducer });

export default store;