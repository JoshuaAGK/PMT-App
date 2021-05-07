import React, {useState} from 'react';
import {Text, View, ScrollView, RefreshControl, TextInput, FlatList} from 'react-native';
import mainStyles from '../../styles/styles';
import socialStyles from './styles';
import UpperContents from '../UpperContents/UpperContents';
import FriendsList, {FriendRequestsList} from '../FriendsList';
import {
    addFriend,
    attachListenerAndDo,
    findUser,
    getFriendRequests,
    getFriends
} from '../../src/firebase/firestore/firestoreService';
import {useDispatch, useSelector} from 'react-redux';
import {
    addFriend as addFriendStore,
    resetFriendsList,
    addFriendRequest,
    resetFriendRequestsList
} from '../../src/features/friends/friendsSlice';


var listOfFriends = [];

async function addElement(friendName) {
    let friendRequest = await addFriend(friendName);
    if (friendRequest.success) {
        alert('Friend request sent!');
        listOfFriends.push({id: listOfFriends.lastIndex + 1, text: friendName});

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
    const friendsSelector = useSelector(state => state.friends);
    const authSelector = useSelector(state => state.auth);
    const [refreshing, setRefreshing] = React.useState(false);
    const onRefresh = React.useCallback(() => {
        setRefreshing(true);

        refreshFriendsLists().then((query) => {

            dispatch(resetFriendsList());
            query[0].forEach((friend) => {
                dispatch(addFriendStore(friend));
            });

            dispatch(resetFriendRequestsList());
            query[1].forEach((friend) => {
                dispatch(addFriendRequest(friend));
            });

            setRefreshing(false);
        });
    }, []);

    let addFriendInput;


    if (authSelector.currentUser) {
        attachListenerAndDo('friends', authSelector.currentUser.uid, (collectionSnapshot) => {
          dispatch(resetFriendsList());
          collectionSnapshot.forEach(async (document) => {
            let friend = {};
            friend.id = document.id;
            friend.status = document.data().status;

            let displayNameQuery = await findUser(document.id);
            friend.displayName = displayNameQuery.data().displayName;
            dispatch(addFriendStore(friend));
          });
        })
        .then(() => {})
        .catch((error) => alert(error));

        attachListenerAndDo('friend_requests', authSelector.currentUser.uid, (collectionSnapshot) => {
          dispatch(resetFriendRequestsList());
          //if(collectionSnapshot.size === 0) return;
          collectionSnapshot.forEach(async (document) => {
            let friend = {};
            friend.id = document.id;
            friend.status = document.data().status;

            let displayNameQuery = await findUser(document.id);
            friend.displayName = displayNameQuery.data().displayName;
            dispatch(addFriendRequest(friend));
          });
        })
        .then(() => {})
        .catch((error) => alert(error));

    }


    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh}/>}
            style={mainStyles.mainPage}
        >
            <UpperContents content="none"/>
            <Text style={mainStyles.bigText}>Add Friend</Text>
            <TextInput
                style={mainStyles.textInput}
                placeholder="Friend's username"
                returnKeyType="search"
                clearButtonMode="while-editing"
                onSubmitEditing={async (event) => {
                    await addElement(event.nativeEvent.text);
                    addFriendInput.clear();
                    onRefresh();
                }}
                ref={input => {
                    addFriendInput = input;
                }}
            />

            <Text style={mainStyles.bigText}>My Friends</Text>
            <FriendsList listOfFriends={friendsSelector.friendsList} nav={props.nav}
                         loadFriendData={props.loadFriendData}/>

            <Text style={mainStyles.bigText}>Friend Requests</Text>
            <FriendRequestsList listOfFriendRequests={friendsSelector.friendRequestsList} dispatch={dispatch}/>
        </ScrollView>
    );
};

export default Social;
