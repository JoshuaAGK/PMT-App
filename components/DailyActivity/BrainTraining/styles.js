import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    brainTraining: {
        width: "100%",
        height: "100%",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    interaction: {
        width: "100%",
        height: "75%",
        bottom: 0,
        position: "absolute"
    },
    questionWord: {
        textAlign: "center",
        fontWeight: "700"
    },
    buttons: {
        position: "absolute",
        bottom: 0,
        width: "100%",
        height: "75%",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between",
        alignContent: "space-between"
    },
    button: {
        width: "49%",
        backgroundColor: "skyblue",
        borderRadius: 50/4,
        height: 45,
        flexGrow: 0,
        paddingTop: 2,
        paddingLeft: 5,
        paddingBottom: 2,
        paddingRight: 5,
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
    },
    buttonText: {
        textAlign: "center"
    },
    beginGameButton: {
        width: "90%",
        height: 60,
        backgroundColor: "skyblue",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 50/4,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.1,
        shadowRadius: 7,
    },
    beginGameText: {
        fontSize: scaleFontSize(16)
    },
    indexText: {
        position: "absolute",
        top: 0,
        left: 0
    },
    scoreText: {
        position: "absolute",
        top: 0,
        right: 0
    },
    titleText: {
        position: "absolute",
        top: 0,
        left: 0,
        fontSize: scaleFontSize(24),
        fontWeight: "500"
    }
})

export default styles;