import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bigContainer: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 50/4,
      padding: 50/4,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      marginVertical: 5,
    },
    friend: {
      marginVertical: 5,
      padding: 5,
      fontSize: 16,
    },
    friendPending: {
      color: 'gray'
    },
    friendRequestRow: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 15
    },
    friendRequestButton: {
      alignItems: 'center'
    },
    declineButton: {
      backgroundColor: '#ff5e73'
    }
});

export default styles;