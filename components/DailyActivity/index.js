import React from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from './styles';
import BrainTraining from './BrainTraining'

const DailyActivity = ({ type }) => {
  switch(type) {
    case "braintraining":
      return (
        <View style={styles.activityContainer}>
          <BrainTraining/>
        </View>
      );
  }
}

export default DailyActivity;
