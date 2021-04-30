import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import EmotionTracker from '../EmotionTracker/EmotionTracker';
import styles from './styles';

const InlineBigComponent = ({ content, tbd, type }) => {
  if (tbd) {
    return (
      <View style={styles.tbd}>
        <Text>{content}</Text>
      </View>
    );
  } else if (type == 'emotionSubmit') {
    return (
      <EmotionTracker />
    );
  } else if (type == 'list') {
    return (
      <FlatList
        style={styles.listContainer}
        data={[{ key: 'Joe Bloggs' }, { key: 'Gernot Liebchen' }]}
        renderItem={({ item }) => (
          <Text style={styles.listItem}>{item.key}</Text>
        )}
      />
    );
  } else {
    return (
      <View style={styles.container}>
        <Text style={styles.innerText}>{content}</Text>
      </View>
    );
  }
};

export default InlineBigComponent;
