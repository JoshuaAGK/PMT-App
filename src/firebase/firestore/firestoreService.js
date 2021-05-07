import firebase from '../config';
import {useEffect} from 'react';
import { CRIMSON, MID } from '../../../components/CustomiseAvatar/avatar';

const USER_COLLECTION = 'users';
const DISPLAY_NAME = 'displayName';
const EMAIL = 'email';
const CREATED_AT = 'createdAt';
const LAST_LOG_IN = 'lastLogIn';
const BALANCE = 'balance';
const PREMIUM = 'premium';
const STREAK = 'streak';
export const SKIN_TONE = 'skinTone';
export const SHIRT_COLOUR = 'shirtColour';

const DEFAULT = {};
DEFAULT[BALANCE] = 0;
DEFAULT[PREMIUM] = false;
DEFAULT[SKIN_TONE] = MID;
DEFAULT[SHIRT_COLOUR] = CRIMSON;

const db = firebase.firestore();

export function setUserProfileData(user) {
    let userData = {};
    userData[DISPLAY_NAME] = user.displayName;
    return db.collection(USER_COLLECTION).doc(user.uid).set({
        displayName: user.displayName,
        email: user.email,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        balance: DEFAULT[BALANCE],
        premium: DEFAULT[PREMIUM],
        skinTone: DEFAULT[SKIN_TONE],
        shirtColour: DEFAULT[SHIRT_COLOUR]
    });
}

export function getUserCollection(collectionName) {
    return getUserDocument().collection(collectionName);
}

export function getUserDocument() {
    return db.collection(USER_COLLECTION).doc(firebase.auth().currentUser.uid);
}

export async function getUserPropertyByDisplayName(displayName, prop) {
    let user = await db.collection(USER_COLLECTION).where('displayName', '==', displayName).get().then(query => {
        if (query.docs.length != 1) {
            return null;
        }
        return query.docs[0].data();
    });
    let result = user[prop];
    if (!result) {
        return DEFAULT[prop];
    }
    return result;
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
    let userQuery = getUserByDisplayName(friendName);
    let userID;
    if (userQuery.size === 1) {
        userQuery.forEach(doc => userID = doc.id);
    }
    if (userID === firebase.auth().currentUser.uid) return {
        success: false,
        message: 'You cannot add yourself as a friend'
    };
    if (userID) {
        await getUserCollection('friends').doc(userID).set({status: 'pending'});
        await db.collection(USER_COLLECTION).doc(userID).collection('friend_requests')
            .doc(firebase.auth().currentUser.uid).set({status: 'pending'});
        return {success: true};
    } else {
        return {success: false, message: 'User does not exist'};
    }
}

export async function getFriends() {
    let friendsList = [];
    let friendsQuery = await getUserCollection('friends').get();
    friendsQuery.forEach((doc) => {
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

export async function getFriendRequests() {
    let friendRequestsList = [];
    let friendRequestsQuery = await getUserCollection('friend_requests').get();
    friendRequestsQuery.forEach((doc) => {
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

export async function acceptFriendRequest(friendID) {
    await getUserCollection('friends').doc(friendID).set({status: 'accepted'});
    await getUserCollection('friend_requests').doc(friendID).delete();
    await db.collection(USER_COLLECTION).doc(friendID).collection('friends')
        .doc(firebase.auth().currentUser.uid).set({status: 'accepted'});
}

export async function declineFriendRequest(friendID){
    await getUserCollection('friends').doc(friendID).delete();
    await db.collection(USER_COLLECTION).doc(friendID).collection('friends')
        .doc(firebase.auth().currentUser.uid).delete();
}

export async function removeFriend(friendID){
    await getUserCollection('friends').doc(friendID).delete();
    await db.collection(USER_COLLECTION).doc(friendID).collection('friends')
        .doc(firebase.auth().currentUser.uid).delete();
}

export async function attachListenerAndDo(collectionName, userId, action) {
    useEffect(() => {
        const subscriber = db
            .collection('users')
            .doc(userId)
            .collection(collectionName)
            .onSnapshot(documentSnapshot => {
                console.log('User data: ', documentSnapshot.size);
                documentSnapshot.forEach((doc) => console.log(doc.data()))
                action()
            });

        // Stop listening for updates when no longer required
        return () => subscriber();
    }, [userId]);
}