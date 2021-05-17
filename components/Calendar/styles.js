import { StyleSheet, Dimensions } from 'react-native';

const dateWidth = (Dimensions.get('window').width * 0.9) / 7;
const dateHeight = dateWidth * 1.2;

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / 375;
  const newSize = Math.round(ratio * Dimensions.get('window').width);
  return newSize;
};

const styles = StyleSheet.create({
  scrollContainer: {
    marginVertical: 5,
  },
  buttonContainer: {
    alignSelf: 'center',
    width: '90%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  nextPrevBtn: {
    height: 30,
    width: 50,
    backgroundColor: 'skyblue',
    borderRadius: 50 / 4,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  calendarArrow: {
    fontSize: scaleFontSize(24),
  },
  calendarContainer: {
    marginTop: '5%',
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    overflow: 'hidden',
  },
  calendarRow: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  calendarDaySet: {
    width: dateWidth,
    height: dateHeight,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  calendarDayUnset: {
    width: dateWidth,
    height: dateHeight,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  calendarDayFiller: {
    width: dateWidth,
    height: dateHeight,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  calendarDayFillerPopulated: {
    width: dateWidth,
    height: dateHeight,
    borderTopWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.1)',
    alignItems: 'center',
  },
  calendarHeaderText: {
    backgroundColor: 'skyblue',
    width: dateWidth,
    height: 20,
    textAlign: 'center',
    fontWeight: '600',
    lineHeight: 20,
  },
  calendarDayNumberText: {
    fontSize: scaleFontSize(16),
    position: 'absolute',
    top: '15%',
  },
  calendarDayNumberTextFiller: {
    fontSize: scaleFontSize(16),
    position: 'absolute',
    top: '15%',
    color: 'grey',
  },
  checkIcon: {
    position: 'absolute',
    top: '50%',
    fontSize: scaleFontSize(24),
  },
  journalDetails: {
    marginTop: 20,
    padding: 50 / 4,
  },
});

export default styles;
