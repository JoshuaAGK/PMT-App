import {SIGN_IN_USER, SIGN_OUT_USER} from './authConstant';
import firebase from 'firebase/app';


export function signInUser(user) {
    return {
        type: SIGN_IN_USER,
        payload: user.email
    }
}

export function signOutUser() {
    return {
        type: SIGN_OUT_USER
    }
}

export function verifyAuth() {
    return function (dispatch) {
        return firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dispatch(signInUser(user));
            } else {
                dispatch(signOutUser());
            }
        });
    };
}