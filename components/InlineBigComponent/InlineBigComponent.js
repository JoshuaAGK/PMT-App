import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import BrainTraining from '../DailyActivity/BrainTraining';
import AvatarShop from '../AvatarShop';
import CustomiseAvatar from '../CustomiseAvatar';

const InlineBigComponent = ({ content, tbd, type }) => {
  if (tbd) {
    return (
      <View style={styles.tbd}>
        <Text>{content}</Text>
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
  } else if (type == "avatarShop") {
    return (
      <View style={styles.genericContanier}>
        <AvatarShop />
      </View>
    );
  } else if (type == "customiseAvatar") {
    return (
      <View style={styles.genericContanier}>
        <CustomiseAvatar />
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
