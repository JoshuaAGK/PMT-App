import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import BrainTraining from '../BrainTraining'

const InlineBigComponent = ({ type }) => {
  switch(type) {
    case "braintraining":
      return (
        <View style={styles.activityContainer}>
          <BrainTraining/>
        </View>
      );
      break;
  }
}

export default InlineBigComponent;
