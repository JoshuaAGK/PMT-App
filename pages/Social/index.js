import React from 'react';
import {
  Text,
  ScrollView,
  RefreshControl,
  TextInput,
} from 'react-native';
import mainStyles from '../../styles/styles';
import UpperContents from '../../components/UpperContents';
import FriendsList, { FriendRequestsList } from '../../components/FriendsList';
import {
  addFriend,
  attachSubCollectionListenerAndDo,
  findUser,
  getFriendRequests,
  getFriends,
} from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFriend as addFriendStore,
  resetFriendsList,
  addFriendRequest,
  resetFriendRequestsList,
} from '../../src/features/friends/friendsSlice';

var listOfFriends = [];

async function addElement(friendName) {
	if (friendName === '') return;
	let friendRequest = await addFriend(friendName);
	if (friendRequest.success) {
		alert('Friend request sent!');
		listOfFriends.push({ id: listOfFriends.lastIndex + 1, text: friendName });
	} else {
		alert(friendRequest.message);
	}
}

const refreshFriendsLists = async () => {
  let friendsList = await getFriends();
  let friendRequestsList = await getFriendRequests();
  return [friendsList, friendRequestsList];
};

export const Social = (props) => {
	const dispatch = useDispatch();
	const friendsSelector = useSelector((state) => state.friends);
	const authSelector = useSelector((state) => state.auth);
	const [refreshing, setRefreshing] = React.useState(false);
	const onRefresh = React.useCallback(() => {
		setRefreshing(true);

		refreshFriendsLists().then((query) => {
			dispatch(resetFriendsList());
			query[0].forEach((friend) => {
				let myfriend = {};
				myfriend.id = friend.id;
				myfriend.status = friend.status;
				myfriend.unread = friend.unread ? friend.unread : 0;

				findUser(friend.id).then(doc => { 
					myfriend.displayName = doc.data().displayName;
					myfriend.skinTone = doc.data().skinTone;
					myfriend.shirtColour = doc.data().shirtColour;
					dispatch(addFriendStore(myfriend));
				});
				
			});

			dispatch(resetFriendRequestsList());
			query[1].forEach((friend) => {
				let pendingFriend = {};
				pendingFriend.id = friend.id;
				pendingFriend.status = friend.status;
				pendingFriend.unread = friend.unread ? friend.unread : 0;

				findUser(friend.id).then(doc => { 
					pendingFriend.displayName = doc.data().displayName;
					pendingFriend.skinTone = doc.data().skinTone;
					pendingFriend.shirtColour = doc.data().shirtColour;
					dispatch(addFriendRequest(pendingFriend));
				});
			});
			setRefreshing(false);
		});
	}, []);

	let addFriendInput;

	attachSubCollectionListenerAndDo(
		'friends',
		authSelector.currentUser?.uid,
		(collectionSnapshot) => {
		dispatch(resetFriendsList());
		collectionSnapshot.forEach(async (document) => {
			let friend = {};
			friend.id = document.id;
			friend.status = document.data().status;
			friend.unread = document.data().unread;

			let displayNameQuery = await findUser(document.id);
			friend.displayName = displayNameQuery.data().displayName;
			friend.skinTone = displayNameQuery.data().skinTone;
			friend.shirtColour = displayNameQuery.data().shirtColour;
			dispatch(addFriendStore(friend));
		});
		},
		[authSelector]
	)
    .then(() => {})
    .catch((error) => alert(error));

    attachSubCollectionListenerAndDo(
		'friend_requests',
		authSelector.currentUser?.uid,
		(collectionSnapshot) => {
		dispatch(resetFriendRequestsList());
		//if(collectionSnapshot.size === 0) return;
		collectionSnapshot.forEach(async (document) => {
			let friend = {};
			friend.id = document.id;
			friend.status = document.data().status;

			let displayNameQuery = await findUser(document.id);
			friend.displayName = displayNameQuery.data().displayName;
			friend.skinTone = displayNameQuery.data().skinTone;
			friend.shirtColour = displayNameQuery.data().shirtColour;
			dispatch(addFriendRequest(friend));
		});
		},
		[authSelector]
	)
    .then(() => {})
    .catch((error) => alert(error));

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      style={mainStyles.mainPage}
    >
      <UpperContents content="none" />
      <Text style={mainStyles.bigText}>Add Friend</Text>
      <TextInput
        style={[mainStyles.textInput, mainStyles.platformShadow]}
        placeholder="Friend's username"
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={async (event) => {
          addFriendInput.clear();
          await addElement(event.nativeEvent.text);
          onRefresh();
        }}
        ref={(input) => {
          addFriendInput = input;
        }}
      />

      <Text style={mainStyles.bigText}>My Friends</Text>
      <FriendsList
        listOfFriends={friendsSelector.friendsList}
        nav={props.nav}
        loadFriendData={props.loadFriendData}
      />

      <Text style={mainStyles.bigText}>Friend Requests</Text>
      <FriendRequestsList
        listOfFriendRequests={friendsSelector.friendRequestsList}
        dispatch={dispatch}
      />
    </ScrollView>
  );
};

export default Social;
