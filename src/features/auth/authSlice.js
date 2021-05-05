import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase';
import { getUserBalance } from '../../firebase/firestore/firestoreService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null
    },
    reducers: {
        signInUser: (state = this.initialState, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.email,
                uid: action.payload.uid,
                balance: action.payload.balance
            };
        },
        signOutUser: (state = this.initialState, action) => {
            state.authenticated = false;
            state.currentUser = null;
        },
        addToBalance: (state = initialState, action) => {
            state.currentUser.balance += action.payload;
        },
        setBalance: (state = initialState, action) => {
            state.currentUser.balance = action.payload;
        },
        setPremium: (state = initialState, action) => {
            state.currentUser.premium = action.payload;
        }
    }
});

const { actions, reducer } = authSlice;
const { signInUser, signOutUser, setBalance, setPremium, addToBalance } = actions;

export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged( async (user) => {
            if(user) {
                let currentBalance = await getUserBalance();
                let authObj = {
                    uid: user.uid,
                    email: user.email,
                    balance: currentBalance.balance
                };
                dispatch(signInUser(authObj));
            } else {
                dispatch(signOutUser());
            }
        });
    };
}

export { signInUser, signOutUser, setBalance, setPremium, addToBalance };
export default reducer;