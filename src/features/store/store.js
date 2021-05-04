import {applyMiddleware, configureStore} from '@reduxjs/toolkit';
import {combineReducers} from 'redux';
import journalReducer from '../journal/journalSlice';
import authReducer, { verifyAuth } from '../auth/authSlice';
import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    journal: journalReducer,
    auth: authReducer
});

const store = configureStore(
    {
        reducer: rootReducer
        //middleware: applyMiddleware(thunk)
    });
store.dispatch(verifyAuth());

export default store;