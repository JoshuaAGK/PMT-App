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
    },
    journalInput: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        minHeight: 100,
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
    shopContainer: {
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
    shopFlex: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-between"
    },
    shopItem: {
        width: "30%",
        height: 40,
        backgroundColor: "#f2f2f7",
        justifyContent: "center",
        alignItems: "center",
        marginBottom: 14,
        borderRadius: 50/4,
        borderWidth: 1
    },
    shopItemText: {
        fontSize: scaleFontSize(16)
    },
    premiumTitle: {
        fontSize: scaleFontSize(26)
    },
    premiumButton: {
        width: "30%",
        height: 40,
        backgroundColor: "#f2f2f7",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50/4,
        borderWidth: 1,
        position: "absolute",
        right: 0,
        bottom: 0
    },
    premiumButtonText: {
        fontSize: scaleFontSize(16)
    }
})

export default styles;