import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
}

const styles = StyleSheet.create({
    avatarShop: {
        width: "100%",
        backgroundColor: "skyblue",
        display: "flex",
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "space-evenly"
    },
    shopItem: {
        height: (Dimensions.get('window').width / 4) / 3 * 4,
        width: Dimensions.get('window').width / 4,
        backgroundColor: "green"
    }
})

export default styles;