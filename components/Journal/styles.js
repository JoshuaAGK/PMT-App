import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
};

const styles = StyleSheet.create({
    journalInput: {
        marginTop: 15,
        marginBottom: 15,
        width: '100%',
        backgroundColor: 'white',
        borderRadius: 50/4,
        padding: 50/4,
        minHeight: 100,
        paddingTop: 10,
        paddingBottom: 10,
        shadowColor: 'black',
        shadowOffset: {
            width: 0,
            height: 5,
        },
        shadowOpacity: 0.2,
        shadowRadius: 15,
    },
    journalHeader: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 15,
        marginBottom: 15,
    },
    calendarButton: {
        flexWrap: 'nowrap',
        width: '100%'
    },
});

export default styles;