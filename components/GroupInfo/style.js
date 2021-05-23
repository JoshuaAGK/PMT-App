import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    }
});

export default styles;