import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'

const InlineBigComponent = (props) => {
    const content = props.content
    const tbd = props.tbd
    const type = props.type

    if (tbd) {
        return (
            <View style={styles.tbd}>
                <Text>{content}</Text>
            </View>
        );
    } else if (type == "emotionSubmit") {
        return (
            <View style={styles.emote}>
                <Text style={styles.emoteIcon}>😢</Text>
                <Text style={styles.emoteIcon}>🙁</Text>
                <Text style={styles.emoteIcon}>😐</Text>
                <Text style={styles.emoteIcon}>🙂</Text>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <Text>{content}</Text>
            </View>
        );
    }
    
};

export default InlineBigComponent;