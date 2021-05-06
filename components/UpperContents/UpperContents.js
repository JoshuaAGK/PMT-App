import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useAsync } from 'react-async';
import { useNavigation } from '@react-navigation/native';
import { dateString } from '../../utils/StringUtils';
import styles from './styles';
import { signOutFirebase } from '../../src/firebase/firestore/firebaseService';
import { useSelector } from 'react-redux';

function UpperContents(props) {
    const navigation = useNavigation();
    const auth = useSelector(state => state.auth);
    const containerType = props.content;

    let content = null;
    switch (containerType) {
        case 'logout':
            content = (
                <Pressable style={styles.rightBox} onPress={async () => { await logOut(navigation); }}>
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
            let currentBalance = auth.currentUser ? auth.currentUser.balance : '0';
            let streak = auth.currentUser ? auth.currentUser.streak : '0';
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
            <Text style={styles.dateText}>{dateString(new Date())}</Text>
            {content}
        </View>
    );
}

async function logOut(navigation) {
    await signOutFirebase();
    navigation.navigate('Log In');
    navigation.reset({index: 0, routes: [{name: 'Log In'}]});
}

export default UpperContents;