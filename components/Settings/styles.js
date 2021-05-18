import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    settingsPage: {
        display: "flex",
    },
    settingsButtonContainer: {
        display: "flex",
        alignItems: "center",
        width: "100%",
        marginBottom: 20
    },
    settingsButton: {
        width: "60%",
        alignItems: "center"
    },
    settingsInput: {
        marginTop: 15,
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 50/4,
        padding: 50/4,
        paddingTop: 10,
        paddingBottom: 10,
    },
    settingTitle: {
        fontSize: 20,
        marginLeft: 20
    },
    settingsFormContainer: {
        marginBottom: 40
    }
});

export default styles;
