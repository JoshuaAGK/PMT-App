import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
  const ratio = fontSize / 375;
  const newSize = Math.round(ratio * Dimensions.get('window').width);
  return newSize; 
};

const styles = StyleSheet.create({
    container: {
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 50/4,
        padding: 50/4,
        borderWidth: 1,
    },
    tbd: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 50/4,
      padding: 50/4,
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: 160,
      elevation: 4,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 15,
      elevation: 10,
    },
    emote: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingBottom: 5,
        elevation: 4,
        shadowColor: "black",
        shadowOffset: {
          width: 0,
          height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        marginBottom: 10
    },
    emoteIcon: {
      fontSize: 40
    },
    innerText: {
      fontSize: scaleFontSize(14)
    },
    listContainer: {
      width: '100%',
      backgroundColor: 'white',
      borderRadius: 50/4,
      padding: 50/4,
      borderWidth: 1,
      elevation: 4,
      shadowColor: 'black',
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 15,
    },
    listItem: {
      fontSize: scaleFontSize(14),
      paddingTop: 5,
      paddingBottom: 5
    },
    gameContainer: {
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
      height: 200
    },
    genericContanier: {
      width: "100%",
      backgroundColor: "white",
      borderRadius: 50/4,
      padding: 50/4,
      elevation: 4,
      shadowColor: "black",
      shadowOffset: {
        width: 0,
        height: 5,
      },
      shadowOpacity: 0.2,
      shadowRadius: 15,
    }
});

export default styles;