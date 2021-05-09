import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bigContainer: {

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