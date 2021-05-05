import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    container: {
        position: "relative",
        width: "100%",
        display: "flex",
        flexDirection: "column",
        paddingLeft: 50/4,
        paddingRight: 50/4
    },
    messageContainerMe: {
        backgroundColor: "skyblue",
        maxWidth: "75%",
        alignSelf: "flex-end",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        padding: 50/4,
        borderBottomLeftRadius: 50/4,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 50/4,
        borderTopRightRadius: 50/4,
        marginBottom: 50/4
    },
    messageContainerOther: {
        backgroundColor: "#DDDDDD",
        maxWidth: "75%",
        alignSelf: "flex-start",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        padding: 50/4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 50/4,
        borderTopLeftRadius: 50/4,
        borderTopRightRadius: 50/4,
        marginBottom: 50/4
    }
})

export default styles;