import firebase from '../config';

const db = firebase.firestore();

export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

export function getUserCollection(collectionName) {
    return db.collection('users').doc(firebase.auth().currentUser.uid).collection(collectionName);
}