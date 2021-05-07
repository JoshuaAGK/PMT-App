import React from 'react';
import { Text, View, ScrollView, Image, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import styles from './styles';
import avatarStyles from '../CustomiseAvatar/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFriend as removeFriendStore } from '../../src/features/friends/friendsSlice';
import { removeFriend as removeFriendFirestore } from '../../src/firebase/firestore/firestoreService';

var userSkintone = 0;
var userShirtcolour = 0;

const SKINTONES = [
  require('../../assets/avatar_images/skintones/skin-lighter.png'),
  require('../../assets/avatar_images/skintones/skin-light.png'),
  require('../../assets/avatar_images/skintones/skin-mid.png'),
  require('../../assets/avatar_images/skintones/skin-dark.png'),
  require('../../assets/avatar_images/skintones/skin-darker.png')
];

const SHIRTCOLOURS = [
  require('../../assets/avatar_images/shirtcolours/shirt-crimson.png'),
  require('../../assets/avatar_images/shirtcolours/shirt-forestgreen.png'),
  require('../../assets/avatar_images/shirtcolours/shirt-blue.png'),
  require('../../assets/avatar_images/shirtcolours/shirt-skyblue.png'),
  require('../../assets/avatar_images/shirtcolours/shirt-darkorange.png'),
];

async function removeFriend(dispatch, friendsSelector, friendName, nav){
    for (const friend in friendsSelector.friendsList) {
        if (Object.hasOwnProperty.call(friendsSelector.friendsList, friend)) {
            if(friendsSelector.friendsList[friend].displayName === friendName){
                dispatch(removeFriendStore(friendsSelector.friendsList[friend]));
                await removeFriendFirestore(friendsSelector.friendsList[friend].id);
                break;
            }
        }
    }
    nav.navigate('socialHomeScreen');

}

export const Profile = (props) => {
    const dispatch = useDispatch();
    const friendsSelector = useSelector(state => state.friends);
    let navigation = useNavigation();
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}>
            <View style={avatarStyles.avatarUpper}>
                <View style={avatarStyles.myAvatar}>
                    <Image
                    style={avatarStyles.myImage}
                    source={SKINTONES[userSkintone]}
                    />
                    <Image
                    style={avatarStyles.myImage}
                    source={SHIRTCOLOURS[userShirtcolour]}
                    />
                </View>
            </View>
            <Text style={styles.profileNameText}><Text>{props.friendName}</Text></Text>
            <View style={styles.container}>
                <Pressable
                    style={styles.button}
                    onPress={async () => {await removeFriend(dispatch, friendsSelector, props.friendName, navigation);}}>
                        <Text style={styles.buttonText}>Remove from friends list</Text>
                </Pressable>
            </View>
        </ScrollView>
    );
};

export default Profile;
