import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'

const AlarmItem = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.textNormal}>Every day</Text>
            <Text style={styles.textRight}>Edit alarm</Text>
            <Text style={styles.textBig}>07:30 am</Text>
            <Text style={styles.textNormal}>Tomorrow's alarm: Lorem - Ipsum</Text>
            <Text style={styles.textNormal}>Music set by user: jbloggs123</Text>
        </View>
    )
};

export default AlarmItem;