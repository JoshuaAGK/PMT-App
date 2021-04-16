import React from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import styles from './styles'
import { TouchableHighlight } from 'react-native-gesture-handler';

function dateString() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    
    var monthNum = date.getMonth()
    var year = date.getFullYear();
    
    var day = String(days[date.getDay()]);
    var monthDate = date.getDate();
    var month = String(months[monthNum]);

    var ordinal = "";
    const stDates = [1, 21, 31];
    const ndDates = [2, 22];
    const rdDates = [3, 23];


    if (stDates.includes(monthDate)) {
        ordinal = "st"
    } else if (ndDates.includes(monthDate)) {
        ordinal = "nd"
    } else if (rdDates.includes(monthDate)) {
        ordinal = "rd"
    } else {
        ordinal = "th"
    }
    
    return day + ", " + monthDate + ordinal + " " + month + " " + year;
}

function UpperContents(props) {

    const navigation = useNavigation();
    
    const containerType = props.content;

    if (containerType == "logout") {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{dateString()}</Text>
                <Pressable
                    style={styles.rightBox}
                    onPress={() => alert("Logged out")}
                >
                    <Text>Log out</Text>
                </Pressable>
            </View>
        )
    } else if (containerType == "none") {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{dateString()}</Text>
            </View>
        )
    } else if (containerType == "friends") {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{dateString()}</Text>
                <View style={styles.rightBox}><Text style={styles.rightInnerText}>Add Friends</Text></View>
            </View>
        )
    } else {
        return (
            <View style={styles.container}>
                <Text style={styles.dateText}>{dateString()}</Text>
                <Pressable
                    style={styles.rightBox}
                    onPress={() => navigation.navigate('Shop')}
                >
                    <Text>₩4.20</Text>
                </Pressable>
            </View>
        )
    }
    
};

export default UpperContents;