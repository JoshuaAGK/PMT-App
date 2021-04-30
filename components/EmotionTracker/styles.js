import { StyleSheet, Dimensions } from 'react-native';

const styles = StyleSheet.create({
    emotionContainer: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        paddingTop: 5,
        paddingBottom: 5,
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
    }    
})

export default styles;