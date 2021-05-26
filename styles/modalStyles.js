import { StyleSheet } from 'react-native';

const modalStyles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 35,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    inputBox: {
      marginBottom: 20,
      backgroundColor: '#e9e9e9',
      borderColor: 'black',
      borderWidth: 1,
      padding: 10,
      borderRadius: 5,
      width: '100%'
    },
    buttonCentered: {
      display: 'flex',
      flexDirection: 'row',
      alignContent: 'space-between',
    },
    button: {
      borderRadius: 5,
      paddingVertical: 10,
      paddingHorizontal: 20,
      elevation: 2,
    },
    buttonOpen: {
      backgroundColor: '#27ae60',
      marginLeft: 20,
    },
    buttonClose: {
      backgroundColor: '#c0392b',
    },
    textStyle: {
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
    },
    modalText: {
      marginBottom: 15,
      textAlign: 'center',
    },
  });

export default modalStyles;