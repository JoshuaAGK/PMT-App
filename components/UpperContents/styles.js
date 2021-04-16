import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateText: {
        color: "#AAA",
        fontWeight: "600",
        fontSize: scaleFontSize(13)
    },
    rightBox: {
        borderWidth: 1,
        borderRadius: 50/4,
        padding: 5,
        minWidth: 100,
        alignItems: "center",
        backgroundColor: "#f2f2f7"
    },
    rightInnerText: {
        fontSize: scaleFontSize(13)
    }
})

export default styles;