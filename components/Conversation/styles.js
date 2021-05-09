import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        position: 'relative',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        paddingLeft: 50/4,
        paddingRight: 50/4
    },
    messageContainerMe: {
        backgroundColor: 'skyblue',
        maxWidth: '75%',
        alignSelf: 'flex-end',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        padding: 50/4,
        borderBottomLeftRadius: 50/4,
        borderBottomRightRadius: 0,
        borderTopLeftRadius: 50/4,
        borderTopRightRadius: 50/4
    },
    messageContainerOther: {
        backgroundColor: '#DDDDDD',
        maxWidth: '75%',
        alignSelf: 'flex-start',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-end',
        padding: 50/4,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 50/4,
        borderTopLeftRadius: 50/4,
        borderTopRightRadius: 50/4
    },
    messageContainer: {
        display: 'flex',
        flexDirection: 'row',
        marginBottom: 50/4
    },
    messageTime: {
        alignSelf: 'center',
        marginHorizontal: 10,
        color: 'gray',
        opacity: 0.8,
        fontSize: 12
    },
    messageDateContainer: {
        width: '60%',
        alignSelf: 'center',
        marginTop: 15,
        marginBottom: 5,
        padding: 5,
        alignItems: 'center',
        borderBottomColor: '#e0e0e0',
        borderBottomWidth: 2
    },
    messageDateText: {
        color: '#a8a8a8',
        fontWeight: 'bold'
    }
});

export default styles;