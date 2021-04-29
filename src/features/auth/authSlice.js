import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null,
    },
    reducers: {
        signInUser: (state = initialState, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.user.email
            };
        },
        signOutUser: (state=initialState, action) => {
            state.authenticated = false;
            state.currentUser = null;
        },
    }
});


export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                dispatch(signInUser({payload: user}))
            } else {
                dispatch(signOutUser())
            }
        })
    }
}

const {actions, reducer} = authSlice;
export const {signInUser, signOutUser} = actions;
export default reducer;