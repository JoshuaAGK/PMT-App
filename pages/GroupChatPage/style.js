import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    chatPage: {
        width: '100%',
        flex: 1
    },
    chatView: {
        width: '100%',
        overflow: 'visible',
        marginTop: '5%',
        marginBottom: '15%',
        height: 'auto',
    },
    chatInput: {
        bottom: 0,
        height: 60,
        width: '80%',
        paddingHorizontal: 20,
        paddingTop: 10,
        position: 'absolute',
        backgroundColor: '#f2f2f2'
    },
    chatSendButton: {
        bottom: 0,
        right: 0,
        height: 60,
        width: '20%',
        padding: 15,
        position: 'absolute',
        backgroundColor: '#1c8eff',
        justifyContent: 'center',
        alignItems: 'center',
    },
    chatSendButtonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 18
    }
});

export default styles;