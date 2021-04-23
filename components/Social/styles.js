import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    flatListView: {
        width: "100%",
        backgroundColor: "white",
        borderRadius: 50/4,
        padding: 50/4,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: "black",
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    }
})

export default styles;