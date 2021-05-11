import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    customiseAvatar: {
        width: "100%",
    },
    avatarShop: {
        marginBottom: 10
    },
    avatarUpper: {
        width: "100%",
        height: Dimensions.get('window').width / 4,
        marginBottom: 40,
        display: "flex",
        alignItems: "center"
    },

    myImage: {
        maxWidth: Dimensions.get('window').width / 4,
        maxHeight: Dimensions.get('window').width / 4,
        position: "absolute"
    },
    avatarLower: {
        width: "100%",
    },
    itemHeader: {
        fontSize: scaleFontSize(24),
        fontWeight: "500"
    },
    itemGrid: {
        width: "100%",
        minHeight: 40,
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    gridItem: {
        height: (Dimensions.get('window').width / 4) / 3 * 4,
        width: Dimensions.get('window').width / 4,
        marginBottom: 10,
    },
    gridItemText: {
        textAlign: "center",
        height: Dimensions.get('window').width / 4 / 3,
        lineHeight: Dimensions.get('window').width / 4 / 3,
        fontSize: scaleFontSize(14)
    },
    itemImage: {
        width: Dimensions.get('window').width / 4,
        maxHeight: Dimensions.get('window').width / 4,
    },
    purchased: {
        borderColor: "limegreen",
        borderWidth: 2
    }
})

export default styles;