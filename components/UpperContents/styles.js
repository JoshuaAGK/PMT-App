import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between"
    },
    dateText: {
        color: "#AAA",
        fontWeight: "600"
    },
    rightBox: {
        borderWidth: 1,
        borderRadius: 50/4,
        padding: 5,
        minWidth: 100,
        alignItems: "center"
    }
})

export default styles;