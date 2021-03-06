import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    shopContainer: {
        padding: 50/4,
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