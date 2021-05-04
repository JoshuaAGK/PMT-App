import firebase from '../config';
import {setUserProfileData} from './firestoreService';

export async function signInWithEmail(creds) {
    return await firebase
        .auth()
        .signInWithEmailAndPassword(creds.email, creds.password);
}

export async function signOutFirebase() {
    return await firebase
        .auth()
        .signOut()
}

export async function registerInFirebase(creds) {
    // eslint-disable-next-line no-useless-catch
    try {
        const results = await firebase.auth().createUserWithEmailAndPassword(creds.email, creds.password);
        await results.user.updateProfile({
            displayName: creds.displayName,
        });
        return await setUserProfileData(results.user);
    } catch (e) {
        throw e;
    }
}