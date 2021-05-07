import React, { useEffect, useState } from 'react';
import { Text, View, ScrollView, Image, Pressable } from 'react-native';
import mainStyles from '../../styles/styles';
import styles from './styles';
import avatarStyles from '../CustomiseAvatar/styles';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { removeFriend as removeFriendStore } from '../../src/features/friends/friendsSlice';
import { SKIN_TONE, SHIRT_COLOUR, getUserPropertyByDisplayName, removeFriend as removeFriendFirestore } from '../../src/firebase/firestore/firestoreService';

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
    const [skinTone, setSkinTone] = useState();
    const [shirtColour, setShirtColour] = useState();

    useEffect(() => {
        getUserPropertyByDisplayName(props.friendName, SKIN_TONE).then((skinTone) => {
            console.log("SET SKIN TONE: " + skinTone);
            setSkinTone(skinTone);
        });
    }, [setSkinTone]);
    useEffect(() => {
        getUserPropertyByDisplayName(props.friendName, SHIRT_COLOUR).then((shirtColour) => {
            console.log("SET SHIRT COLOUR: " + shirtColour);
            setShirtColour(shirtColour);
        });
    }, [setShirtColour]);

    let avatarContent;

    console.log("SKIN TONE: " + skinTone + " SHIRT COLOUR: " + shirtColour);
    if (!skinTone || !shirtColour) {
        avatarContent = (
            <Text>Loading...</Text>
        );
    } else {
        avatarContent = (
            <View style={avatarStyles.myAvatar}>
                <Image
                style={avatarStyles.myImage}
                source={SKIN_TONES[skinTone].image}
                />
                <Image
                style={avatarStyles.myImage}
                source={SHIRT_COLOURS[shirtColour].image}
                />
            </View>
        );
    }

    const dispatch = useDispatch();
    const friendsSelector = useSelector(state => state.friends);
    let navigation = useNavigation();
    return (
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}>
            <View style={avatarStyles.avatarUpper}>
                {avatarContent}
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
