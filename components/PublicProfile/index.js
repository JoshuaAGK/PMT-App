import React from 'react';
import { ScrollView, View, Image, Pressable, Text } from 'react-native';
import mainStyles from '../../styles/styles';
import avatarStyles from '../CustomiseAvatar/styles';
import styles from './style';
import { SKIN_TONES, SHIRT_COLOURS } from '../CustomiseAvatar/avatar';
import { useSelector } from 'react-redux';


const PublicProfile = (props) => {
    const friendsSelector = useSelector((state) => state.friends);
    const friend = friendsSelector.friendsList.filter((friend) => friend.id === props.user.id);
    const isFriend = friend.length > 0;
    const isPending = friend.length > 0 ? friend[0].status == 'pending' : false;
    return(
        <ScrollView
        showsVerticalScrollIndicator={false}
        style={mainStyles.mainPage}>
            <View style={avatarStyles.avatarUpper}>
                <Avatar skinTone={props.user.skinTone} shirtColour={props.user.shirtColour} />
            </View>
            <Text style={styles.profileNameText}><Text>{props.user.displayName}</Text></Text>
            <View style={styles.container}>
            {isFriend && isPending &&
                    <Pressable
                        style={styles.button}
                        onPress={async () => {
                            //await removeFriend(dispatch, friendsSelector, friendName, navigation);
                        }}>
                            <Text style={styles.buttonText}>Friend request pending</Text>
                    </Pressable>
                }
                {isFriend && !isPending &&
                    <Pressable
                        style={styles.buttonRed}
                        onPress={async () => {
                            //await removeFriend(dispatch, friendsSelector, friendName, navigation);
                        }}>
                            <Text style={styles.buttonText}>Remove friend</Text>
                    </Pressable>
                }
                {!isFriend &&
                    <Pressable
                    style={styles.buttonGreen}
                    onPress={async () => {
                        //await removeFriend(dispatch, friendsSelector, friendName, navigation);
                    }}>
                        <Text style={styles.buttonText}>Add friend</Text>
                    </Pressable>
                }
            </View>
        </ScrollView>
    );
};

const Avatar = (props) => {
    if(!props.skinTone || !props.shirtColour) return (<Text>Loading...</Text>);
    return (
        <View style={avatarStyles.myAvatar}>
                <Image
                style={avatarStyles.myImage}
                source={SKIN_TONES[props.skinTone].image}
                />
                <Image
                style={avatarStyles.myImage}
                source={SHIRT_COLOURS[props.shirtColour].image}
                />
            </View>
    );
};

export default PublicProfile;