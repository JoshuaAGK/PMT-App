import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
     width: '100%',
     marginBottom: 40,
     display: 'flex',
     alignItems: 'center'
    },
    memberRow: {
        flexDirection: 'row',
        width: '100%',
        borderTopColor: 'lightgray',
        borderTopWidth: 2,
        padding: 10,
        alignItems: 'center'
    },
    memberRowFirst: {
        borderTopWidth: 0,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10
    },
    memberRowLast: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10
    },
    memberRowSelf: {
        backgroundColor: '#ddd'
    },
    memberName: {
        fontSize: 16
    },
    ownerIcon: {
        flexGrow: 1,
        textAlign: 'right',
        marginRight: 10
    },
    button: {
        marginVertical: 10,
        padding: 15,
        width: '70%',
        backgroundColor: '#ccc',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonGreen: {
        marginVertical: 10,
        padding: 15,
        width: '70%',
        backgroundColor: 'green',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonRed: {
        marginVertical: 10,
        padding: 15,
        width: '70%',
        backgroundColor: '#ff5e73',
        borderRadius: 5,
        alignItems: 'center'
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold'
    }
});

export default styles;