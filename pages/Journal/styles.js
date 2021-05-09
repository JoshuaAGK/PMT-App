import { StyleSheet, Dimensions } from 'react-native';

const scaleFontSize = (fontSize) => {
    const ratio = fontSize / 375;
    const newSize = Math.round(ratio * Dimensions.get('window').width);
    return newSize; 
};

const styles = StyleSheet.create({
    journalInput: {
        marginTop: 15,
        marginBottom: 30,
        backgroundColor: 'white',
        borderRadius: 50/4,
        padding: 50/4,
        paddingTop: 10,
        paddingBottom: 10,
    },
    boxTest: {
        width: '100%',
        
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
        width: '100%',
    },
    dailyActivityList: {
        padding: 50/4,
    },
    flatList: {
        width: "100%",
        height: 160,
        overflow: "scroll"
    },
    flatListItem: {
        position: "relative",
        backgroundColor: "green",
        width: "100%",
        height: 160
    }
});

export default styles;