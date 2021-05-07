import firebase from '../config';

const USER_COLLECTION = 'users';
const DISPLAY_NAME = 'displayName';
const EMAIL = 'email';
const CREATED_AT = 'createdAt';
const LAST_LOG_IN = 'lastLogIn';
const BALANCE = 'balance';
const PREMIUM = 'premium';
const STREAK = 'streak';
const SKIN_TONE = 'skinTone';
const SHIRT_COLOUR = 'shirtColour';

const DEFAULT = {};
DEFAULT[BALANCE] = 0;
DEFAULT[PREMIUM] = false;
DEFAULT[SKIN_TONE] = 'mid';
DEFAULT[SHIRT_COLOUR] = 'crimson';

const db = firebase.firestore();

export function setUserProfileData(user) {
    let userData = {};
    userData[DISPLAY_NAME] = user.displayName;
    return db.collection(USER_COLLECTION).doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        balance: 0,
        premium: false,

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
    if (result) {
        return result;
    }
    return DEFAULT[prop];
}

async function updateUserProperty(prop, value) {
    let updateData = {};
    updateData[prop] = value;
    getUserDocument().update(updateData);
}

export async function getUserStreak() {
    return await getUserProperty(STREAK);
}

export async function incrementStreak() {
    let streak = await getUserStreak();
    updateUserProperty(STREAK, streak + 1);
}

export async function resetStreak() {
    updateUserProperty(STREAK, 0);
}

export async function getUserLastLogIn() {
    let lastLogIn = await getUserProperty(LAST_LOG_IN);
    if (lastLogIn) {
        return lastLogIn.toDate();
    }
    return new Date();
}

export async function updateLastLogIn() {
    updateUserProperty(LAST_LOG_IN, new Date());
}

export async function getUserBalance() {
    return await getUserProperty(BALANCE);
}

export async function incrementBalance(currentBalance, amount) {
    updateUserProperty(BALANCE, currentBalance + amount);
}

export async function decrementBalance(currentBalance, amount) {
    updateUserProperty(BALANCE, currentBalance - amount);
}

export async function getPremiumStatus() {
    return await getUserProperty(PREMIUM);
}

export async function becomePremium() {
    updateUserProperty(PREMIUM, true);
}

export async function leavePremium() {
    updateUserProperty(PREMIUM, false);
}

export async function getSkinTone() {
    return await getUserProperty(SKIN_TONE);
}

export async function setSkinTone(skinTone) {
    updateUserProperty(SKIN_TONE, skinTone);
}

export async function getShirtColour() {
    return await getUserProperty(SHIRT_COLOUR);
}

export async function setShirtColour(colour) {
    updateUserProperty(SHIRT_COLOUR, colour);
}

export async function addFriend(friendName) {
    let userQuery = await db.collection(USER_COLLECTION).where('displayName', '==', friendName).get();
    let userID;
    if (userQuery.size == 1) {
        userQuery.forEach(doc => userID = doc.id);
    }
    if(userID === firebase.auth().currentUser.uid) return { success: false, message: 'You cannot add yourself as a friend'};
    if(userID){
        getUserCollection('friends').doc(userID).set({status: 'pending'});
        db.collection(USER_COLLECTION).doc(userID).collection('friend_requests')
        .doc(firebase.auth().currentUser.uid).set({status: 'pending'});
        return { success: true };
    }else{
        return { success: false, message: 'User does not exist'};
    }
}

export async function getFriends(){
    let friendsList = [];
    let friendsQuery = await getUserCollection('friends').get();
    friendsQuery.forEach( (doc) => {
        friendsList.push({
            id: doc.id,
            status: doc.data().status
        });
    });

    for (const friend in friendsList) {
        if (Object.hasOwnProperty.call(friendsList, friend)) {
            let displayNameQuery = await db.collection(USER_COLLECTION).doc(friendsList[friend].id).get();
            friendsList[friend].displayName = displayNameQuery.data().displayName;
        }
    }

    return friendsList;
}

export async function getFriendRequests(){
    let friendRequestsList = [];
    let friendRequestsQuery = await getUserCollection('friend_requests').get();
    friendRequestsQuery.forEach( (doc) => {
        friendRequestsList.push({
            id: doc.id,
            status: doc.data().status
        });
    });

    for (const friend in friendRequestsList) {
        if (Object.hasOwnProperty.call(friendRequestsList, friend)) {
            let displayNameQuery = await db.collection(USER_COLLECTION).doc(friendRequestsList[friend].id).get();
            friendRequestsList[friend].displayName = displayNameQuery.data().displayName;
        }
    }

    return friendRequestsList;
}

export async function acceptFriendRequest(friendID){
    getUserCollection('friends').doc(friendID).set({status: 'accepted'});
    getUserCollection('friend_requests').doc(friendID).delete();
    db.collection(USER_COLLECTION).doc(friendID).collection('friends')
    .doc(firebase.auth().currentUser.uid).set({status: 'accepted'});
}

export async function removeFriend(friendID){
    getUserCollection('friends').doc(friendID).delete();
    db.collection(USER_COLLECTION).doc(friendID).collection('friends')
    .doc(firebase.auth().currentUser.uid).delete();
}