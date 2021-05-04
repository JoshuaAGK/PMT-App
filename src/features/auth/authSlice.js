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
                email: action.payload.email
            };
        },
        signOutUser: (state = initialState, action) => {
            state.authenticated = false;
            state.currentUser = null;
        },
    }
});

const { actions, reducer } = authSlice;
const { signInUser, signOutUser } = actions;

export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
            if(user) {
                let authObj = {
                    email: user.email
                };
                dispatch(signInUser(authObj))
            } else {
                dispatch(signOutUser())
            }
        })
    }
}

export { signInUser, signOutUser };
export default reducer;