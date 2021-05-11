import React from 'react';
import { StyleSheet, Text, View, Pressable, Image } from 'react-native';
import styles from './styles';
import mainStyles from '../../styles/styles';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { acceptFriendRequest, declineFriendRequest } from '../../src/firebase/firestore/firestoreService';
import { useDispatch } from 'react-redux';
import { addFriend, removeFriendRequest } from '../../src/features/friends/friendsSlice';
import avatarStyles from '../CustomiseAvatar/styles';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';

const FriendsList = (props) => {
	return (
		<View style={[styles.bigContainer, mainStyles.platformShadow]}>
			{props.listOfFriends.length > 0 && props.listOfFriends.map((friend, index) => {
				const friendPending = friend.status === 'pending' ? '(pending)' : null;
				let unreadMessages = friend.unread ? `(${friend.unread})`: null;
				return (
					<Pressable key={index}
						onPress={() => {
							if (friendPending) return;
							props.nav.navigate('socialChatScreen');
							props.loadFriendData(friend);
						}}
					>
					<Friend
						name={friend.displayName}
						pending={friendPending}
						unread={unreadMessages}
						skinTone={friend.skinTone}
						shirtColour={friend.shirtColour}
						last={props.listOfFriends.length-1 === index}
					/>
					</Pressable>
				);
			})
			}
			{props.listOfFriends.length == 0 && 
				<Text style={styles.friendContainer}>You have not added any friends yet.</Text>
			}
		</View>
	);
};

export const Friend = (props) => {
	const unreadMessages = props.unread;
	const newMessages = typeof(unreadMessages) === 'string' && unreadMessages !== '0';
	let avatarContent;
	if( props.skinTone && props.shirtColour){
		const skinTone = props.skinTone;
		const shirtColour = props.shirtColour;
		avatarContent = ( <View style={[avatarStyles.myAvatar,{width: 50, marginEnd: 15}]}>
			<Image
			style={[avatarStyles.myImage, {height: 50, width: 50, resizeMode: 'stretch'}]}
			source={SKIN_TONES[skinTone].image}
			/>
			<Image
			style={[avatarStyles.myImage, {height: 50, width: 50, resizeMode: 'stretch'}]}
			source={SHIRT_COLOURS[shirtColour].image}
			/>
		</View>);
	}
	return (
		<View style={[
			styles.friendContainer,
			props.last ? styles.lastFriendView : null,
			props.pending ? {backgroundColor: '#e0e0e0'} : null]}>
			{avatarContent}
			<Text style={[
				styles.friendName,
				newMessages ? {fontWeight: 'bold'} : null,
				props.pending ? styles.friendPending : null]}>{props.name}</Text>
			{ newMessages &&
				<Text style={styles.unreadMessages}>{unreadMessages}</Text>
			}
		</View>
	);
};

export const FriendRequestsList = (props) => {
  return (
    <View style={[styles.bigContainer, mainStyles.platformShadow, mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason]}>
      {props.listOfFriendRequests.length > 0 && props.listOfFriendRequests.map((friend, index) => {
        return (
			<FriendRequest
				key={index}
				name={friend.displayName}
				skinTone={friend.skinTone}
				shirtColour={friend.shirtColour}
				friendObject={friend}
				dispatch={props.dispatch}
			/>
        );
      })
      }
      {props.listOfFriendRequests.length == 0 && 
        <Text style={styles.friendContainer}>You have no pending friend requests.</Text>
      }
    </View>
  );
};

export const FriendRequest = (props) => {
	const friend = props.friendObject;
	let avatarContent;
	if( props.skinTone && props.shirtColour){
		const skinTone = props.skinTone;
		const shirtColour = props.shirtColour;
		avatarContent = ( <View style={[avatarStyles.myAvatar,{width: 50, marginEnd: 15}]}>
			<Image
			style={[avatarStyles.myImage, {height: 50, width: 50, resizeMode: 'stretch'}]}
			source={SKIN_TONES[skinTone].image}
			/>
			<Image
			style={[avatarStyles.myImage, {height: 50, width: 50, resizeMode: 'stretch'}]}
			source={SHIRT_COLOURS[shirtColour].image}
			/>
		</View>);
	}

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
		<View style={[
			styles.friendContainer,
			props.last ? styles.lastFriendView : null]}>
			{avatarContent}
			<Text style={[
				styles.friendName]}>{props.name}</Text>
			<View style={styles.friendRequestButtonsContainer}>
				<Pressable
				style={[mainStyles.button, styles.friendRequestButton]}
				onPress={() => {acceptFriend(friend);}}>
				<Text style={{paddingHorizontal: 10}}>Accept</Text>
				</Pressable>
				<Pressable
				style={[mainStyles.button, styles.friendRequestButton, styles.declineButton]}
				onPress={() => {declineFriend(friend);}}>
				<Text style={{paddingHorizontal: 10}}>Decline</Text>
				</Pressable>
			</View>
		</View>
	);
};


export default FriendsList;
