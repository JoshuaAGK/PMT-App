import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dateString } from '../../utils/StringUtils';
import styles from './styles';
import { signOutFirebase } from '../../src/firebase/firestore/firebaseService';
import { useSelector } from 'react-redux';
import { removePushNotificationToken } from '../../src/firebase/firestore/firestoreService';

function UpperContents(props) {
    const navigation = useNavigation();
    const auth = useSelector(state => state.auth);
    const containerType = props.content;

    let content = null;
    switch (containerType) {
        case 'logout':
            content = (
                <View>
                    <Pressable style={styles.rightBox} onPress={() => {
                        navigation.navigate("Settings");
                    }}>
                        <Text>Settings</Text>
                    </Pressable>
                    <Pressable style={styles.rightBox} onPress={async () => {
                        await logOut(navigation, auth);
                    }}>
                        <Text>Log out</Text>
                    </Pressable>
                </View>
            );
            break;
        case 'friends':
            content = (
                <View style={styles.rightBox}>
                    <Text style={styles.rightInnerText}>Add Friends</Text>
                </View>
            );
            break;
        case 'currency':
            var currentBalance = auth.currentUser ? auth.currentUser.balance : '0';
            var streak = auth.currentUser ? auth.currentUser.streak : '0';
            content = (
                <View>
                    <Text>Streak: {streak}</Text>
                    <Pressable style={styles.rightBox} onPress={() => navigation.navigate('Shop')}>
                        <Text>₩{currentBalance}</Text>
                    </Pressable>
                </View>
            );
            break;
    }

    return (
        <View style={styles.container}>
            <View style={{alignSelf: 'center'}}>
                <Text style={styles.dateText}>{auth.currentUser ? auth.currentUser.displayName : null}</Text>
                <Text style={styles.dateText}>{dateString(new Date())}</Text>
            </View>
            {content}
        </View>
    );
}

async function logOut(navigation, authSelector) {
    if(authSelector.pushNotificationToken){
        await removePushNotificationToken(authSelector.pushNotificationToken);
    }
    await signOutFirebase();
    navigation.reset({index: 0, routes: [{name: 'Log In'}]});
}

export default UpperContents;