import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

const Advertisement = ({ type, content }) => {
  if (type == 'banner') {
    return (
      <View style={styles.banner}>
        <Text>{content}</Text>
      </View>
    );
  } else {
    return (
      <View style={styles.normal}>
        <Text>{content}</Text>
      </View>
    );
  }
};

export default Advertisement;
