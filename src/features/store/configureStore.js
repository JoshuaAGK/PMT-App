import {applyMiddleware, createStore} from '@reduxjs/toolkit';
import thunk from 'redux-thunk';
import {verifyAuth} from '../auth/authActions';
import rootReducer from './rootReducer';


function configureStore() {
    const store = createStore(
        rootReducer,
        applyMiddleware(thunk))
    store.dispatch(verifyAuth());
    return store
}

export default configureStore;