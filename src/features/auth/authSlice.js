import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null,
        premium: false,
        balance: 0
    },
    reducers: {
        signInUser: (state = initialState, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.email,
                uid: action.payload.uid
            };
        },
        signOutUser: (state = initialState, action) => {
            state.authenticated = false;
            state.currentUser = null;
        },
        setBalance: (state = initialState, action) => {
            state.balance = action.payload;
        },
        setPremium: (state = initialState, action) => {
            state.premium = action.payload;
        }
    }
});

const { actions, reducer } = authSlice;
const { signInUser, signOutUser, setBalance, setPremium } = actions;

export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
            //console.log(user);
            if(user) {
                let authObj = {
                    uid: user.uid,
                    email: user.email
                };
                dispatch(signInUser(authObj))
            } else {
                dispatch(signOutUser())
            }
        })
    }
}

export { signInUser, signOutUser, setBalance, setPremium };
export default reducer;