import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
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
        marginBottom: 10
    },
    textBig: {
      fontSize: 26,
      paddingTop: 5,
      paddingBottom: 5
    },
    textRight: {
      position: "absolute",
      right: 0,
      margin: 12,
      textDecorationLine: "underline"
    }
})

export default styles;