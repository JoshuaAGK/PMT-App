import firebase from '../config';
import { useEffect } from 'react';
import * as Constants from '../../../components/CustomiseAvatar/avatar';
import {
  sendFriendRequestNotification,
  sendMessageNotification,
} from '../../features/notifications/notifications';

const JOURNAL_COLLECTION = 'journal';
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
const SKINS = 'skins';
const SHIRTS = 'shirts';
const PUSHNOTIFTOKENS = 'pushNotificationTokens';

const DEFAULT = {};
DEFAULT[BALANCE] = 0;
DEFAULT[STREAK] = 0;
DEFAULT[LAST_LOG_IN] = 0;
DEFAULT[PREMIUM] = false;
DEFAULT[SKIN_TONE] = Constants.MID;
DEFAULT[SHIRT_COLOUR] = Constants.CRIMSON;
DEFAULT[SKINS] = [
  Constants.LIGHT,
  Constants.LIGHTER,
  Constants.MID,
  Constants.DARK,
  Constants.DARKER,
];
DEFAULT[SHIRTS] = [Constants.CRIMSON];

const db = firebase.firestore();

export function setUserProfileData(user) {
  let userData = {};
  userData[DISPLAY_NAME] = '';
  return db.collection(USER_COLLECTION).doc(user.uid).set({
    displayName: '',
    email: user.email,
    createdAt: firebase.firestore.FieldValue.serverTimestamp(),
    lastLogIn: DEFAULT[LAST_LOG_IN],
    balance: DEFAULT[BALANCE],
    premium: DEFAULT[PREMIUM],
    skinTone: DEFAULT[SKIN_TONE],
    shirtColour: DEFAULT[SHIRT_COLOUR],
    shirts: DEFAULT[SHIRTS],
    skins: DEFAULT[SKINS],
  });
}

export function getUserCollection(collectionName) {
  if(getUserDocument() === null) return null;
  return getUserDocument().collection(collectionName);
}

export function getUserDocument() {
  let userDocument;
  try{
    userDocument = db.collection(USER_COLLECTION).doc(firebase.auth().currentUser.uid);
  }catch(error) {
    userDocument = null;
  }
  return userDocument;
}

export async function getUserPropertyByDisplayName(displayName, prop) {
  let user = await db
    .collection(USER_COLLECTION)
    .where('displayName', '==', displayName)
    .get()
    .then((query) => {
      if (query.docs.length !== 1) {
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
  if(getUserDocument() === null) return;
  let query = await getUserDocument().get();
  let result = query.get(prop);
  if (result) {
    return result;
  }
  updateUserProperty(prop, DEFAULT[prop]);
  return DEFAULT[prop];
}

export async function updateUserProperty(prop, value) {
  if(getUserDocument() === null) return;
  let updateData = {};
  updateData[prop] = value;
  await getUserDocument().update(updateData);
}

export async function getUserStreak() {
  return await getUserProperty(STREAK);
}

export async function incrementStreak() {
  let streak = await getUserStreak();
  await updateUserProperty(STREAK, streak + 1);
}

export async function resetStreak(newStreak = 0) {
  await updateUserProperty(STREAK, newStreak);
}

export async function getUserLastLogIn() {
  let lastLogIn = await getUserProperty(LAST_LOG_IN);
  if (lastLogIn) {
    return lastLogIn.toDate();
  }
  return new Date();
}

export async function updateLastLogIn() {
  await updateUserProperty(LAST_LOG_IN, new Date());
}

export async function getUserBalance() {
  return await getUserProperty(BALANCE);
}

export async function incrementBalance(currentBalance, amount) {
  await updateUserProperty(BALANCE, currentBalance + amount);
}

export async function decrementBalance(currentBalance, amount) {
  await updateUserProperty(BALANCE, currentBalance - amount);
}

export async function getPremiumStatus() {
  return await getUserProperty(PREMIUM);
}

export async function becomePremium() {
  await updateUserProperty(PREMIUM, true);
}

export async function leavePremium() {
  await updateUserProperty(PREMIUM, false);
}

export async function getSkinTone() {
  return await getUserProperty(SKIN_TONE);
}

export async function setSkinTone(skinTone) {
  await updateUserProperty(SKIN_TONE, skinTone);
}

export async function getShirtColour() {
  return await getUserProperty(SHIRT_COLOUR);
}

export async function setShirtColour(colour) {
  await updateUserProperty(SHIRT_COLOUR, colour);
}

export async function getSkins() {
  return await getUserProperty(SKINS);
}

export async function getShirts() {
  return await getUserProperty(SHIRTS);
}

export async function addSkin(skin) {
  updateUserProperty(SKINS, firebase.firestore.FieldValue.arrayUnion(skin));
}

export async function addShirt(shirt) {
  updateUserProperty(SHIRTS, firebase.firestore.FieldValue.arrayUnion(shirt));
}

export async function setDisplayName(displayName) {
  updateUserProperty(DISPLAY_NAME, displayName);
}

export function getJournalDocument(id) {
  return getUserCollection(JOURNAL_COLLECTION).doc(id);
}

export async function updateJournalProperty(id, prop, value) {
  let updateData = {};
  updateData[prop] = value;
  await getJournalDocument(id).update(updateData);
}

export async function clearJournalEntries() {
  getUserCollection(JOURNAL_COLLECTION)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        getUserCollection(JOURNAL_COLLECTION).doc(doc.id).delete();
      });
    });
}

export async function updateMessage(conversationId, messageId, newMessage) {
  firebase
    .database()
    .ref(`conversations/${conversationId}/${messageId}`)
    .set(newMessage);
}

export async function deleteMessage(conversationId, messageId) {
  firebase
    .database()
    .ref(`conversations/${conversationId}/${messageId}`)
    .remove();
}

export async function clearChatMessages() {
  // TODO: Implement clearing chat messages
  let userId = firebase.auth().currentUser.uid;
  let conversationsRef = firebase.database().ref('conversations');
  conversationsRef.once(
    'value',
    function (snapshot) {
      let snapshotVal = snapshot.val();
      let conversationKeys = Object.keys(snapshotVal);
      for (const conversationKey of conversationKeys) {
        if (conversationKey.includes(userId)) {
          let conversation = snapshotVal[conversationKey];
          let conversationEntries = Object.entries(conversation);
          for (const conversationEntry of conversationEntries) {
            let messageId = conversationEntry[0];
            let message = conversationEntry[1];
            if (message.sender === userId) {
              firebase
                .database()
                .ref(`conversations/${conversationKey}/${messageId}`)
                .remove();
            }
          }
        }
      }
    },
    function (error) {
      console.log('Error: ' + error.code);
    }
  );
}

export async function addPushNotificationToken(token) {
  updateUserProperty(
    PUSHNOTIFTOKENS,
    firebase.firestore.FieldValue.arrayUnion(token)
  );
}

export async function removePushNotificationToken(token) {
  await updateUserProperty(
    PUSHNOTIFTOKENS,
    firebase.firestore.FieldValue.arrayRemove(token)
  );
}

export async function findUser(userID) {
  return await db.collection(USER_COLLECTION).doc(userID).get();
}

export async function addFriend(friendName) {
  let userQuery = await db
    .collection(USER_COLLECTION)
    .where('displayName', '==', friendName)
    .get();
  let userID;
  if (userQuery.size === 1) {
    userQuery.forEach((doc) => (userID = doc.id));
  }
  if (userID === firebase.auth().currentUser.uid)
    return {
      success: false,
      message: 'You cannot add yourself as a friend',
    };
  let myFriend = await getUserCollection('friends').doc(userID).get();
  if (myFriend.exists) {
    return { success: false, message: 'User is already your friend' };
  }
  let pendingRequest = await getUserCollection('friend_requests')
    .doc(userID)
    .get();
  if (pendingRequest.exists) {
    return {
      success: false,
      message: 'The user has already sent you a friend request.',
    };
  }
  if (userID) {
    await getUserCollection('friends').doc(userID).set({ status: 'pending' });
    await db
      .collection(USER_COLLECTION)
      .doc(userID)
      .collection('friend_requests')
      .doc(firebase.auth().currentUser.uid)
      .set({ status: 'pending' });
    await userQuery.forEach(async (doc) => {
      await doc.data().pushNotificationTokens.forEach(async (token) => {
        await sendFriendRequestNotification(token);
      });
    });
    return { success: true };
  } else {
    return { success: false, message: 'User does not exist' };
  }
}

export async function getFriends() {
  if(getUserCollection('friends') === null) return [];
  let friendsList = [];
  let friendsQuery = await getUserCollection('friends').get();
  friendsQuery.forEach((doc) => {
    friendsList.push({
      id: doc.id,
      status: doc.data().status,
      unread: doc.data().unread,
    });
  });

  for (const friend in friendsList) {
    if (Object.hasOwnProperty.call(friendsList, friend)) {
      let displayNameQuery = await db
        .collection(USER_COLLECTION)
        .doc(friendsList[friend].id)
        .get();
      friendsList[friend].displayName = displayNameQuery.data().displayName;
    }
  }

  return friendsList;
}

export async function getFriendRequests() {
  if(getUserCollection('friends') === null) return [];
  let friendRequestsList = [];
  let friendRequestsQuery = await getUserCollection('friend_requests').get();
  friendRequestsQuery.forEach((doc) => {
    friendRequestsList.push({
      id: doc.id,
      status: doc.data().status,
      unread: doc.data().unread,
    });
  });

  for (const friend in friendRequestsList) {
    if (Object.hasOwnProperty.call(friendRequestsList, friend)) {
      let displayNameQuery = await db
        .collection(USER_COLLECTION)
        .doc(friendRequestsList[friend].id)
        .get();
      friendRequestsList[friend].displayName =
        displayNameQuery.data().displayName;
    }
  }

  return friendRequestsList;
}

export async function acceptFriendRequest(friendID) {
  await getUserCollection('friends').doc(friendID).set({ status: 'accepted' });
  await getUserCollection('friend_requests').doc(friendID).delete();
  await db
    .collection(USER_COLLECTION)
    .doc(friendID)
    .collection('friends')
    .doc(firebase.auth().currentUser.uid)
    .update({ status: 'accepted' });
}

export async function declineFriendRequest(friendID) {
  await getUserCollection('friends').doc(friendID).delete();
  await db
    .collection(USER_COLLECTION)
    .doc(friendID)
    .collection('friends')
    .doc(firebase.auth().currentUser.uid)
    .delete();
}

export async function removeFriend(friendID) {
  await getUserCollection('friends').doc(friendID).delete();
  await db
    .collection(USER_COLLECTION)
    .doc(friendID)
    .collection('friends')
    .doc(firebase.auth().currentUser.uid)
    .delete();
}

export async function attachListenerAndDo(userId, action, deps) {
  useEffect(() => {
    if (!userId) return;

    const subscriber = db
      .collection('users')
      .doc(userId)
      .onSnapshot(async (documentSnapshot) => {
        await action(documentSnapshot);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, deps);
}

export async function attachSubCollectionListenerAndDo(
  collectionName,
  userId,
  action,
  deps
) {
  useEffect(() => {
    if (!userId) return;

    const subscriber = db
      .collection('users')
      .doc(userId)
      .collection(collectionName)
      .onSnapshot(async (documentSnapshot) => {
        await action(documentSnapshot);
      });

    // Stop listening for updates when no longer required
    return () => subscriber();
  }, deps);
}

export async function attachMessageListenerAndDo(
  userId1,
  userId2,
  action,
  deps
) {
  useEffect(() => {
    if (!userId1) return;
    if (!userId2) return;

    let conversationID;
    if (userId1 < userId2) conversationID = userId1 + ':' + userId2;
    else conversationID = userId2 + ':' + userId1;

    const subscriber = firebase
      .database()
      .ref('/conversations/' + conversationID)
      .on('child_added', async (snapshot) => {
        await action(snapshot);
      });

    // Stop listening for updates when no longer required
    return () =>
      firebase
        .database()
        .ref('/conversations/' + conversationID)
        .off('child_added', subscriber);
  }, deps);
}

export async function sendMessage(userId, message) {
  let conversationID;
  const myUserId = firebase.auth().currentUser.uid;

  if (myUserId < userId) conversationID = myUserId + ':' + userId;
  else conversationID = userId + ':' + myUserId;

  const currentTime = new Date().getTime();

  let conversationObject = {
    time: currentTime,
    sender: myUserId,
    contents: message,
  };
  let userDocument = await db.collection(USER_COLLECTION).doc(userId).get();
  await userDocument.data().pushNotificationTokens.forEach(async (token) => {
    await sendMessageNotification(
      token,
      firebase.auth().currentUser.displayName
    );
  });

  await db
    .collection(USER_COLLECTION)
    .doc(userId)
    .collection('friends')
    .doc(myUserId)
    .update({ unread: firebase.firestore.FieldValue.increment(1) });
  await firebase
    .database()
    .ref('/conversations/' + conversationID)
    .push(conversationObject);
}

export async function resetUnreadMessages(friendID) {
  await getUserDocument()
    .collection('friends')
    .doc(friendID)
    .update({ unread: 0 });
}

export async function getGroups() {
  let groupsList = [];
  const groupsQuery = await db
    .collection('groups')
    .where('members', 'array-contains', firebase.auth().currentUser.uid)
    .get();
  groupsQuery.forEach((doc) => {
    groupsList.push({
      id: doc.id,
      owner: doc.data().owner,
      name: doc.data().name,
      members: doc.data().members
    });
  });

  return groupsList;
}

export async function getGroupDetails(groupId) {
  const groupDoc = await db.collection('groups').doc(groupId).get();
  return {
    id: groupDoc.id,
    owner: groupDoc.data().owner,
    name: groupDoc.data().name,
    members: groupDoc.data().members
  };
}

export async function findGroupsByName(groupName) {
  const groupDocs = await db
    .collection('groups')
    .where('name', '==', groupName)
    .get();
  let groupsList = [];
  groupDocs.forEach((documentSnapshot) => {
    groupsList.push({
      id: documentSnapshot.id,
      owner: documentSnapshot.data().owner,
      name: documentSnapshot.data().name,
      members: documentSnapshot.data().members
    });
  });

  return groupsList;
}

export async function joinGroup(groupId) {
  const updateObject = {
    members: firebase.firestore.FieldValue.arrayUnion(
      firebase.auth().currentUser.uid
    ),
  };
  await db.collection('groups').doc(groupId).update(updateObject);
}

export async function createGroup(name) {
  const existingGroups = await db.collection('groups').where('name', '==', name).get();
  if(existingGroups.size > 0) return false;
  const groupObject = {
    name: name,
    members: [firebase.auth().currentUser.uid],
    owner: firebase.auth().currentUser.uid
  };
  const newGroup = await db.collection('groups').add(groupObject);
  groupObject.id = newGroup.id;
  return groupObject;
}

export async function leaveGroup(groupId) {
  const updateObject = {
    members: firebase.firestore.FieldValue.arrayRemove(
      firebase.auth().currentUser.uid
    ),
  };
  await db.collection('groups').doc(groupId).update(updateObject);
  const currentMembers = await db.collection('groups').doc(groupId).get();
  if(currentMembers.data().members.length === 0) await db.collection('groups').doc(groupId).delete();
}

export async function sendGroupMessage(groupId, message) {
  const myUserId = firebase.auth().currentUser.uid;
  const currentTime = new Date().getTime();

  let conversationObject = {
    time: currentTime,
    sender: myUserId,
    contents: message,
  };

  //await db.collection(USER_COLLECTION).doc(userId).collection('groups').doc(myUserId).update({ unread: firebase.firestore.FieldValue.increment(1)});
  await firebase
    .database()
    .ref('/group_messages/' + groupId)
    .push(conversationObject);
}

export async function attachGroupMessageListenerAndDo(groupId, action, deps) {
  useEffect(() => {
    if (!groupId) return;

    const subscriber = firebase
      .database()
      .ref('/group_messages/' + groupId)
      .on('child_added', async (snapshot) => {
        await action(snapshot);
      });

    // Stop listening for updates when no longer required
    return () =>
      firebase
        .database()
        .ref('/group_messages/' + groupId)
        .off('child_added', subscriber);
  }, deps);
}

export async function getAvatar(userId) {
  const userDoc = await db.collection(USER_COLLECTION).doc(userId).get();
  if(userDoc.exists){
    const skinTone = userDoc.data().skinTone;
    const shirtColour = userDoc.data().shirtColour;
    return { skin: skinTone, shirt: shirtColour };
  }else{
    return null;
  }
}
