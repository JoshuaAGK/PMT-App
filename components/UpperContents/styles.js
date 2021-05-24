import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / 375;
  const newSize = Math.round(ratio * Dimensions.get('window').width);
  return newSize;
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingLeft: '5%',
    paddingRight: '5%',
  },
  dateText: {
    color: '#AAA',
    fontWeight: '600',
    fontSize: scaleFontSize(13),
    letterSpacing: 0.15,
  },
  rightBox: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  settingsCog: {
    marginRight: 10,
  },
  logout: {
    // marginTop: 5,
    backgroundColor: 'rgba(0, 122, 255, .95)',
    paddingHorizontal: 15,
    paddingVertical: 7,
    borderRadius: 5,
  },
  logoutText: {
    color: '#fff',
    letterSpacing: 0.15,
  },
  rightInnerText: {
    fontSize: scaleFontSize(13),
  },
  currency: {
    // backgroundColor: 'rgba(0, 122, 255, .95)',
    borderWidth: 1,
    borderColor: 'rgba(0, 122, 255, .95)',
    paddingHorizontal: 11,
    paddingVertical: 6,
    borderRadius: 5,
  },
  currencyText: {
    color: 'rgba(0, 122, 255, .95)',
    letterSpacing: 0.15,
  },
});

export default styles;
