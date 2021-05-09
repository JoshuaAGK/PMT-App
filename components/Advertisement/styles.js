import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    banner: {
        width: "100%",
        height: 50,
        backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center"
    },
    normal: {
        width: "100%",
        height: 50,
        backgroundColor: "skyblue",
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 50/4,
        marginTop: 20,
        overflow: "hidden"
    },
    fullImage: {
        width: '100%',
        height: 50,
    },
    image: {
        width: '100%',
        borderRadius: 50/4,
        height: 50
    }
})

export default styles;