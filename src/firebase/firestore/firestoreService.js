import firebase from '../config';

const db = firebase.firestore();

export function setUserProfileData(user) {
    return db.collection('users').doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        balance: 0
    });
}

export function getUserCollection(collectionName) {
    return getUserDocument().collection(collectionName);
}

export function getUserDocument() {
    return db.collection('users').doc(firebase.auth().currentUser.uid);
}

export async function getUserBalance() {
    var balanceQuery = await getUserDocument().get().then(query => {
        return query.get('balance');
    });
    return {balance: balanceQuery};
}

export async function buyBalance(amount) {
    var data = await getUserBalance();
    getUserDocument().update({
        balance: data.balance+amount
    });
}

export async function getPremiumStatus() {
    var premiumQuery = await getUserDocument().get().then(query => {
        return query.get('premium');
    });
    return {premiumStatus: premiumQuery};
}

export async function becomePremium() {
    getUserDocument().update({
        premium: true
    });
}