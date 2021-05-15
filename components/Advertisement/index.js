import React from 'react';
import { Image, View } from 'react-native';
import styles from './styles';
import mainStyles from '../../styles/styles';

const advertBanner = require('../../assets/adverts/placeholder.gif');

const Advertisement = ({ type }) => {
  if (type == 'banner') {
    return (
      <View style={styles.advertisement}>
        <Image source={advertBanner} style={styles.image} />
      </View>
    );
  } else {
    return (
      <View style={[styles.advertisement, styles.inline, mainStyles.platformShadow]}>
        <Image source={advertBanner} style={styles.image} />
      </View>
    );
  }
};

export default Advertisement;
