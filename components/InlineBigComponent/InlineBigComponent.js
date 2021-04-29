import React from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import styles from './styles';
import BrainTraining from '../BrainTraining'

const InlineBigComponent = ({ content, tbd, type }) => {
  if (tbd) {
    return (
      <View style={styles.tbd}>
        <Text>{content}</Text>
      </View>
    );
  } else if (type == 'emotionSubmit') {
    return (
      <View style={styles.emote}>
        <Text style={styles.emoteIcon}>😢</Text>
        <Text style={styles.emoteIcon}>🙁</Text>
        <Text style={styles.emoteIcon}>😐</Text>
        <Text style={styles.emoteIcon}>🙂</Text>
      </View>
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
  } else if (type == "brainTraining") {
    return (
      <View style={styles.gameContainer}>
        <BrainTraining />
      </View>
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
