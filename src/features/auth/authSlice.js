import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase';
import { getUserBalance, updateLastLogIn, getUserLastLogIn, resetStreak, getUserStreak, incrementStreak, getPremiumStatus, getSkinTone, getShirtColour } from '../../firebase/firestore/firestoreService';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null,
    },
    reducers: {
        signInUser: (state = this.initialState, action) => {
            state.authenticated = true;
            state.currentUser = {
                email: action.payload.email,
                uid: action.payload.uid,
                balance: action.payload.balance,
                lastLogIn: action.payload.lastLogIn,
                streak: action.payload.streak,
                premium: action.payload.premium,
                skinTone: action.payload.skinTone,
                shirtColour: action.payload.shirtColour
            };

            let today = new Date().getTime();
            let lastLogIn = new Date(state.currentUser.lastLogIn);
            let streakEnd = lastLogIn;
            if (today > streakEnd) {
                state.currentUser.streak = 0;
                resetStreak();
            } else {
                state.currentUser.streak = state.currentUser.streak + 1;
                incrementStreak();
            }

            updateLastLogIn();
        },
        signOutUser: (state = this.initialState, action) => {
            state.authenticated = false;
            state.currentUser = null;
        },
        addToBalance: (state = this.initialState, action) => {
            state.currentUser.balance += action.payload;
        },
        removeFromBalance: (state = this.initialState, action) => {
            state.currentUser.balance -= action.payload;
        },
        setBalance: (state = this.initialState, action) => {
            state.currentUser.balance = action.payload;
        },
        setPremium: (state = this.initialState, action) => {
            state.currentUser.premium = action.payload;
        },
        setSkinTone: (state = this.initialState, action) => {
            state.currentUser.skinTone = action.payload;
        },
        setShirtColour: (state = this.initialState, action) => {
            state.currentUser.shirtColour = action.payload;
        }
    }
});

const { actions, reducer } = authSlice;
const { signInUser, signOutUser, setBalance, setPremium, addToBalance, removeFromBalance } = actions;

export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged( async (user) => {
            if(user) {
                let currentBalance = await getUserBalance();
                let lastLogIn = await getUserLastLogIn();
                let streak = await getUserStreak();
                let premiumStatus = await getPremiumStatus();
                let skinTone = await getSkinTone();
                let shirtColour = await getShirtColour();
                let authObj = {
                    uid: user.uid,
                    email: user.email,
                    balance: currentBalance,
                    lastLogIn: lastLogIn.getTime(),
                    streak: streak,
                    premium: premiumStatus,
                    skinTone: skinTone,
                    shirtColour: shirtColour
                };
                dispatch(signInUser(authObj));
            } else {
                dispatch(signOutUser());
            }
        });
    };
}

export { signInUser, signOutUser, setBalance, setPremium, addToBalance, removeFromBalance };
export default reducer;