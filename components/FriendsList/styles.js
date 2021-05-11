import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    bigContainer: {

    },
    friendContainer: {
      padding: 15,
      height: 80,
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomColor: '#e0e0e0',
      borderBottomWidth: 2
    },
    friendName: {
      fontSize: 16,
    },
    unreadMessages: {
      textAlign: 'right',
      flexGrow: 1,
      fontSize: 16,
      fontWeight: 'bold',
      marginEnd: 10
    },
    friendPending: {
      color: 'gray'
    },
    lastFriendView: {
      borderBottomWidth: 0,
      borderBottomLeftRadius: 50/4,
      borderBottomRightRadius: 50/4
    },
    friendRequestRow: {
      width: '100%',
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 15,
      marginBottom: 15
    },
    friendRequestButtonsContainer : {
      display: 'flex',
      flexDirection: 'row',
      flexGrow: 1,
      justifyContent: 'flex-end'
    },
    friendRequestButton: {
      alignItems: 'center',
      marginHorizontal: 4,
      paddingHorizontal: 10,
      width: 'auto',
      borderColor: 'green',
      borderWidth: 2
    },
    declineButton: {
      backgroundColor: '#ff5e73',
      borderColor: 'darkred',
    }
});

export default styles;