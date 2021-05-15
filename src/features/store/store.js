import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import journalReducer from '../journal/journalSlice';
import friendsSlice from '../friends/friendsSlice';
import authReducer, { verifyAuth } from '../auth/authSlice';

const rootReducer = combineReducers({
    journal: journalReducer,
    auth: authReducer,
    friends: friendsSlice
});

const store = configureStore(
    {
        reducer: rootReducer
    });
store.dispatch(verifyAuth());

export default store;