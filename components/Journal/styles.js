import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    }
})

export default styles;