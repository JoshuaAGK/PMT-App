import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dateString } from '../../utils/StringUtils';
import styles from './styles';
import { signOutFirebase } from '../../src/firebase/firestore/firebaseService';

function UpperContents(props) {
    const navigation = useNavigation();
    
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

async function logOut(navigation) {
    await signOutFirebase();
    navigation.navigate('Log In');
    navigation.reset({index: 0, routes: [{name: 'Log In'}]});
}

export default UpperContents;