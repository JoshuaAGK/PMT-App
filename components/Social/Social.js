import React, { useState } from 'react';
import { Text, View, ScrollView, RefreshControl, TextInput, FlatList } from 'react-native';
import mainStyles from '../../styles/styles';
import socialStyles from './styles';
import UpperContents from '../UpperContents/UpperContents';
import FriendsList, { FriendRequestsList } from '../FriendsList';
import { addFriend, getFriendRequests, getFriends } from '../../src/firebase/firestore/firestoreService';
import { useDispatch, useSelector } from 'react-redux';
import { addFriend as addFriendStore, resetFriendsList, addFriendRequest, resetFriendRequestsList } from '../../src/features/friends/friendsSlice';


var listOfFriends = [
  { id: '0', text: 'Joe Bloggs' },
  { id: '1', text: 'Obi-Wan Kenobi' },
  { id: '2', text: 'Firstname Lastname' },
  { id: '3', text: 'This is just an example name' },
  { id: '4', text: 'Yeet' },
  { id: '5', text: 'Gernot Liebchen' },
];

async function addElement(friendName) {
  let friendRequest = await addFriend(friendName);
  if(friendRequest.success){
    alert('Friend request sent!');
    listOfFriends.push({ id: listOfFriends.lastIndex+1, text: friendName});
    
  }else{
    alert(friendRequest.message);
  }
}

const refreshFriendsLists = async () => {
  let friendsList = await getFriends();
  let friendRequestsList = await getFriendRequests();
  return [ friendsList, friendRequestsList ];
};

export const Social = (props) => {
  const dispatch = useDispatch();
  const friendsSelector = useSelector(state => state.friends);
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
  
  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      style={mainStyles.mainPage}
    >
      <UpperContents content="none" />
      <Text style={mainStyles.bigText}>Add Friend</Text>
      <TextInput
        style={mainStyles.textInput}
        placeholder="Friend's username"
        returnKeyType="search"
        clearButtonMode="while-editing"
        onSubmitEditing={async (event) => {
          await addElement(event.nativeEvent.text);
          onRefresh();
          this.textInput.clear();
        }}
        ref={input => {this.textInput = input;}}
      />

      <Text style={mainStyles.bigText}>My Friends</Text>
      <FriendsList listOfFriends={friendsSelector.friendsList} nav={props.nav} loadFriendData={props.loadFriendData} />
      
      <Text style={mainStyles.bigText}>Friend Requests</Text>
      <FriendRequestsList listOfFriendRequests={friendsSelector.friendRequestsList} dispatch={dispatch}/>
    </ScrollView>
  );
};

export default Social;
