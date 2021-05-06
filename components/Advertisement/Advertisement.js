import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import styles from './styles';

const advertBanner = require('../../assets/adverts/placeholder.gif');

const Advertisement = ({ type, content }) => {
  if (type == 'banner') {
    return (
      <View style={styles.banner}>
        <Image source={advertBanner} style={styles.fullImage} />
      </View>
    );
  } else {
    return (
      <View style={styles.normal}>
        <Image source={advertBanner} style={styles.image} />
      </View>
    );
  }
};

export default Advertisement;
