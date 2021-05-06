import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import journalReducer from '../journal/journalSlice';
import friendsSlice from '../friends/friendsSlice';
import authReducer, { verifyAuth } from '../auth/authSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    journal: journalReducer,
    auth: authReducer,
    friends: friendsSlice
});

const store = configureStore(
    {
        reducer: rootReducer
        //middleware: applyMiddleware(thunk)
    });
store.dispatch(verifyAuth());

export default store;