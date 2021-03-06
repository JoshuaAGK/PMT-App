import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, Text, TextInput, RefreshControl } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { UpperContents } from '../../components';
import GroupsList from '../../components/GroupsList';
import { addFriend, addFriendRequest, resetFriendRequestsList, resetFriendsList } from '../../src/features/friends/friendsSlice';
import { addGroup, resetGroupsList } from '../../src/features/groups/groupsSlice';
import { findGroupsByName, getGroups, joinGroup, findUser, getFriendRequests, getFriends, createGroup, } from '../../src/firebase/firestore/firestoreService';
import mainStyles from '../../styles/styles';

async function queryGroups(dispatch){
    dispatch(resetGroupsList());
    const groups = await getGroups();
    groups.forEach(group => {
        dispatch(addGroup(group));
    });
}

async function findGroup(name, dispatch, groupsSelector){
    findGroupsByName(name).then((groupsFound) => {
        if(groupsFound.length > 0){
            if(groupsSelector.groupsList.some(group => group.id == groupsFound[0].id)){
                alert('You are already in this group.');
                return;
            }
            Alert.alert(
                'Group found!',
                'Would you like to join '+groupsFound[0].name+'?',
                [
                    {
                        text: 'Yes',
                        style: 'default',
                        onPress: () => {
                            joinGroup(groupsFound[0].id);
                            dispatch(addGroup(groupsFound[0]));
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    }
                ]
            );
        }else{
            Alert.alert(
                'Group Does not exist yet!',
                'Would you like to create '+name+'?',
                [
                    {
                        text: 'Yes',
                        style: 'default',
                        onPress: async () => {
                            const result = await createGroup(name);
                            if(result === false){
                                alert('Failed to create group!');
                            }else{
                                dispatch(addGroup(result));
                            }
                        }
                    },
                    {
                        text: 'No',
                        style: 'cancel',
                    }
                ]
            );
        }
    });
}

export const Groups = (props) => {
    const dispatch = useDispatch();
    const groupsSelector = useSelector((state) => state.groups);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        queryGroups(dispatch);
    }, []);

    const onRefresh = React.useCallback(() => {
		setRefreshing(true);
        queryGroups(dispatch);
        setRefreshing(false);
    });

    const refreshFriendsLists = async () => {
      let friendsList = await getFriends();
      let friendRequestsList = await getFriendRequests();
      return [friendsList, friendRequestsList];
    };
  
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
          dispatch(addFriend(myfriend));
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
    });

    let searchGroupInput;

    return (
        <ScrollView
        keyboardShouldPersistTaps={'handled'}
        showsVerticalScrollIndicator={false}
        refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        style={mainStyles.mainPage}
      >
            <UpperContents content="none" />

            <Text style={mainStyles.bigText}>Find/Create a Group</Text>
            <TextInput
                style={[mainStyles.textInput, mainStyles.platformShadow]}
                placeholder="Group name"
                returnKeyType="search"
                clearButtonMode="while-editing"
                onSubmitEditing={async (event) => {
                    searchGroupInput.clear();
                    findGroup(event.nativeEvent.text, dispatch, groupsSelector);
                }}
                ref={(input) => {
                searchGroupInput = input;
                }}
            />

            
            <Text style={mainStyles.bigText}>My Groups</Text>
            <GroupsList nav={props.nav} loadGroupData={props.loadGroupData} />
        </ScrollView>
    );
};

export default Groups;