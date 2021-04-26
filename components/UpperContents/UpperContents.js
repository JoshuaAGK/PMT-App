import React from 'react';
import { Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { dateString } from '../../utils/StringUtils';
import styles from './styles';
//import { database } from '../../src/firebase/config';
import database from 'react-native-firebase/database';

function UpperContents(props) {
    const navigation = useNavigation();
    
    const containerType = props.content;

    let content = null;
    switch (containerType) {
        case "logout":
            content = (
                <Pressable style={styles.rightBox} onPress={logOut}>
                    <Text>Log out</Text>
                </Pressable>
                );
            break;
        case "friends":
            content = (
                <View style={styles.rightBox}>
                    <Text style={styles.rightInnerText}>Add Friends</Text>
                </View>
                );
            break;
        case "currency":
            content = (
                <Pressable style={styles.rightBox} onPress={() => navigation.navigate('Shop')}>
                    <Text>₩4.20</Text>
                </Pressable>
            );
            break;
    }
    
    return (
        <View style={styles.container}>
            <Text style={styles.dateText}>{dateString()}</Text>
            {content}
        </View>
    );
};

function logOut() {
    let newUser = database().ref().child('users').push().key;
    console.log(newUser);
}

export default UpperContents;