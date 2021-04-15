import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        borderWidth: 1,
    },
    tbd: {
      width: "100%",
      backgroundColor: "white",
      borderWidth: 1,
      borderRadius: 50/4,
      padding: 50/4,
      alignItems: "center",
      justifyContent: "center"
    },
    emote: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        borderWidth: 1,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingBottom: 5
    },
    emoteIcon: {
      fontSize: 40
    }
})

export default styles;