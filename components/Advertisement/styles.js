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
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
        marginBottom: 10
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