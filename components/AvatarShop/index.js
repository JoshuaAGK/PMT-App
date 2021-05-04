import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles';

const AvatarShop = ({ content }) => {
  return (
    <View style={styles.avatarShop}>
      <View style={styles.shopItem}></View>
      <View style={styles.shopItem}></View>
      <View style={styles.shopItem}></View>
    </View>
  );
};

export default AvatarShop;
