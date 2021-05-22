import { configureStore } from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import journalReducer from '../journal/journalSlice';
import friendsSlice from '../friends/friendsSlice';
import groupsSlice from '../groups/groupsSlice';
import authReducer, { verifyAuth } from '../auth/authSlice';

const rootReducer = combineReducers({
    journal: journalReducer,
    auth: authReducer,
    friends: friendsSlice,
    groups: groupsSlice
});

const store = configureStore(
    {
        reducer: rootReducer
    });
store.dispatch(verifyAuth());

export default store;