import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    mainPage: {
        width: "90%",
        overflow: "visible",
        marginTop: "15%",
        marginBottom: "5%"
    },
    bigText: {
        fontSize: scaleFontSize(30),
        fontWeight: "500"
    },
    textInput: {
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
    flatListView: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    buttonContainer: {
    },
    button: {
        padding: 10,
        width: "30%",
        backgroundColor: "limegreen",
        borderRadius: 5
    },
    buttonText: {
        color: "white",
        textAlign: "center"
    }
})

export default styles;