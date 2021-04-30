import React from 'react';
import {Text, View, Pressable, ToastAndroid} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {dateString} from '../../utils/StringUtils';
import styles from './styles';
import {firebase} from '../../src/firebase/config';
import {signOutFirebase} from '../../src/firebase/firestore/firebaseService';

function UpperContents(props) {
    const navigation = useNavigation();

    const containerType = props.content;

    async function handleSignOut() {
        try {
            await signOutFirebase();
            navigation.navigate('Log In');
            navigation.reset({index: 0, routes: [{name: 'Log In'}]});
        } catch (e) {
            ToastAndroid.showWithGravityAndOffset(
                'An error occurred when signing out',
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        }
    }

    let content = null;
    switch (containerType) {
        case 'logout':
            content = (
                <Pressable style={styles.rightBox} onPress={handleSignOut}>
                    <Text>Log out</Text>
                </Pressable>
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
            content = (
                <Pressable style={styles.rightBox} onPress={() => navigation.navigate('Shop')}>
                    <Text>₩4.20</Text>
                </Pressable>
            );
            break;
    }

    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{dateString(new Date())}</Text>
            {content}
        </View>
    );
}


export default UpperContents;