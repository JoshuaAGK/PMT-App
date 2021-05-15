import {createSlice} from '@reduxjs/toolkit';
import firebase from 'firebase';
import {
    updateLastLogIn,
    resetStreak,
    incrementStreak,
    getUserDocument,
    incrementBalance,
} from '../../firebase/firestore/firestoreService';
import Points from '../points/points';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        authenticated: false,
        currentUser: null,
        pushNotificationToken: null
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
                shirtColour: action.payload.shirtColour,
                displayName: action.payload.displayName
            };

            let today = new Date();
            let month = today.getMonth();
            let year = today.getFullYear();
            let day = today.getDate();

            let lastLogIn = new Date(state.currentUser.lastLogIn);
            let lastLogInMonth = lastLogIn.getMonth();
            let lastLogInYear = lastLogIn.getFullYear();
            let lastLogInDay = lastLogIn.getDate();

            if (month === lastLogInMonth && year === lastLogInYear && (day - lastLogInDay) === 1) {
                state.currentUser.streak = state.currentUser.streak + 1;

                if (state.currentUser.streak >= 7) {
                    state.currentUser.streak = 1;
                    resetStreak(1);
                    alert(`You've logged in for 7 consecutive days! +${Points.FULL_STREAK} steps!`);
                    addToBalance(Points.FULL_STREAK);
                    incrementBalance(state.currentUser.balance, Points.FULL_STREAK);
                } else if (state.currentUser.streak > 1) {
                    alert(`You've logged in for ${state.currentUser.streak} days straight! +${Points.STREAK_BONUS} steps!`);
                    addToBalance(Points.STREAK_BONUS);
                    incrementBalance(state.currentUser.balance, Points.STREAK_BONUS);
                } else {
                    incrementStreak();
                }
            } else {
                if (state.currentUser.streak >= 1) {
                    alert('You lost your streak.');
                }

                state.currentUser.streak = 0;
                resetStreak();
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
        },
        setPushNotificationToken: (state = this.initialState, action) => {
            state.pushNotificationToken = action.payload;
        }
    }
});

const { actions, reducer } = authSlice;
const { signInUser, signOutUser, setBalance, setPremium, addToBalance, removeFromBalance, setPushNotificationToken } = actions;

export function verifyAuth() {
    return function(dispatch) {
        return firebase.auth().onAuthStateChanged( async (user) => {
            if(user) {
                const currentUser = await getUserDocument().get();
                const currentUserData = currentUser.data();

                let lastLogIn;
                if (!currentUserData.lastLogIn) {
                    lastLogIn = new Date();
                } else {
                    lastLogIn = currentUserData.lastLogIn.toDate();
                }

                let authObj = {
                    uid: user.uid,
                    email: user.email,
                    displayName: currentUserData.displayName,
                    balance: currentUserData.balance,
                    lastLogIn: lastLogIn.getTime(),
                    streak: currentUserData.streak,
                    premium: currentUserData.premium,
                    skinTone: currentUserData.skinTone,
                    shirtColour: currentUserData.shirtColour,
                };
                dispatch(signInUser(authObj));
            } else {
                dispatch(signOutUser());
            }
        });
    };
}

export { signInUser, signOutUser, setBalance, setPremium, addToBalance, removeFromBalance, setPushNotificationToken };
export default reducer;