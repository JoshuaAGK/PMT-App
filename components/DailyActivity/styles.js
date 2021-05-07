import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / 375;
  const newSize = Math.round(ratio * Dimensions.get('window').width);
  return newSize; 
};

const styles = StyleSheet.create({
  activityContainer: {
    height: 160,
    width: "100%"
  }
});

export default styles;