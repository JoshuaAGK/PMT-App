import firebase from '../config';

const USER_COLLECTION = 'users';
const LAST_LOG_IN = 'lastLogIn';
const BALANCE = 'balance';
const PREMIUM = 'premium';
const STREAK = 'streak';

const db = firebase.firestore();

export function setUserProfileData(user) {
    return db.collection(USER_COLLECTION).doc(user.uid).set({
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
    return db.collection(USER_COLLECTION).doc(firebase.auth().currentUser.uid);
}

async function getUserProperty(prop) {
    let result = await getUserDocument().get().then(query => {
        return query.get(prop);
    });
    return result;
}

export async function getUserStreak() {
    return await getUserProperty(STREAK);
}

export async function incrementStreak() {
    let streak = await getUserStreak();
    let updateData = {};
    updateData[STREAK] = streak + 1;
    getUserDocument().update(updateData);
}

export async function resetStreak() {
    let updateData = {};
    updateData[STREAK] = 0;
    getUserDocument().update(updateData);
}

export async function getUserLastLogIn() {
    let lastLogIn = await getUserProperty(LAST_LOG_IN);
    if (lastLogIn) {
        return lastLogIn.toDate();
    }
    return new Date();
}

export async function updateLastLogIn() {
    let updateData = {};
    updateData[LAST_LOG_IN] = new Date();
    getUserDocument().update(updateData);
}

export async function getUserBalance() {
    return await getUserProperty(BALANCE);
}

export async function buyBalance(amount) {
    let balance = await getUserBalance();
    let updateData = {};
    updateData[BALANCE] = balance + amount;
    getUserDocument().update(updateData);
}

export async function getPremiumStatus() {
    return getUserProperty(PREMIUM);
}

export async function becomePremium() {
    let updateData = {};
    updateData[PREMIUM] = true;
    getUserDocument().update(updateData);
}