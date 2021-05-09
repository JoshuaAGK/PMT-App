import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import styles from './styles';
import mainStyles from '../../styles/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { acceptFriendRequest, declineFriendRequest } from '../../src/firebase/firestore/firestoreService';
import { useDispatch } from 'react-redux';
import { addFriend, removeFriendRequest } from '../../src/features/friends/friendsSlice';

const FriendsList = (props) => {
  return (
    <View style={[styles.bigContainer, mainStyles.platformShadow]}>
      {props.listOfFriends.length > 0 && props.listOfFriends.map((friend, index) => {
        return (
          <Pressable key={index}
          onPress={() => {
            props.nav.navigate('socialChatScreen');
            props.loadFriendData(friend);
          }}
        >
          <Text style={[styles.friend, friend.status === 'pending' ? styles.friendPending : null]}>{friend.displayName} {friend.status === 'pending' ? '(pending)' : null}</Text>
        </Pressable>
        );
      })
      }
      {props.listOfFriends.length == 0 && 
        <Text style={styles.friend}>You have no friends.</Text>
      }
    </View>
  );
};

export const FriendRequestsList = (props) => {

  const acceptFriend = (friend) => {
    acceptFriendRequest(friend.id);
    props.dispatch(removeFriendRequest(friend));
    let newFriend = {...friend};
    newFriend.status = 'accepted';
    props.dispatch(addFriend(newFriend));
  };

  const declineFriend = (friend) => {
    declineFriendRequest(friend.id);
    props.dispatch(removeFriendRequest(friend));
  };
  return (
    <View style={[styles.bigContainer, mainStyles.platformShadow, mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason]}>
      {props.listOfFriendRequests.length > 0 && props.listOfFriendRequests.map((friend, index) => {
        return (
          <View
            key={index}
            style={styles.friendRequestRow}>
            <Text style={styles.friend}>{friend.displayName}</Text>
            <Pressable
            style={[mainStyles.button, styles.friendRequestButton]}
            onPress={() => {acceptFriend(friend);}}>
              <Text>Accept</Text>
            </Pressable>
            <Pressable
            style={[mainStyles.button, styles.friendRequestButton, styles.declineButton]}
            onPress={() => {declineFriend(friend);}}>
              <Text>Decline</Text>
            </Pressable>
          </View>
        );
      })
      }
      {props.listOfFriendRequests.length == 0 && 
        <Text style={styles.friend}>You have no pending friend requests.</Text>
      }
    </View>
  );
};


export default FriendsList;

{/*

// import * as React from 'react';
// import { Button, View, Text } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';

// function HomeScreen({ navigation }) {
//   return (
//     <View style={{ height: 100, width: '100%', backgroundColor: 'red' }}>
//       <Text>Home Screen</Text>
//       <Button
//         title="Go to Details"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// function DetailsScreen({ navigation }) {
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <Text>Details Screen</Text>
//       <Button
//         title="Go to Details... again"
//         onPress={() => navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

// const Stack = createStackNavigator();

// function App() {
//   return (
//       <Stack.Navigator initialRouteName="Home">
//         <Stack.Screen name="Home" component={HomeScreen} />
//         <Stack.Screen name="Details" component={DetailsScreen} />
//       </Stack.Navigator>
//   );
// }

// export default App;
*/}