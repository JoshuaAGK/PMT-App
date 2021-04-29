import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import journalReducer from '../journal/journalSlice';
import authSlice, {verifyAuth} from '../auth/authSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    journal: journalReducer,
    auth: authSlice
});

const store = configureStore(
    {
        reducer: rootReducer,
        middleware: applyMiddleware(thunk)
    });
store.dispatch(verifyAuth());

export default store;