import { StyleSheet, Dimensions } from 'react-native';

const lightBg = "#d8dee8";

const styles = StyleSheet.create({
    calendarMain: {
        width: "100%"
    },
    calendarContainer: {
        display: "flex",
        width: "100%",
        justifyContent: "center",
        paddingLeft: 20,
        paddingRight: 20
    },
    calendarHeader: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 20
    },
    monthButton: {
        backgroundColor: lightBg,
        padding: 5,
        borderRadius: 10
    },
    prevMonth: {
        //alignItems: "flex-start"
    },
    nextMonth: {
        //alignItems: "flex-end"
    },
    monthYearTxt: {
        textAlign: "center",
        //marginBottom: 20
    },
    calendarRow: {
        display: "flex",
        width: "100%",
        flexDirection: "row",
        justifyContent: "space-around",
        marginBottom: 20
    },
    headerCell: {
        fontWeight: "bold",
        marginRight: 10
    },
    emptyCell: {
        backgroundColor: "transparent"
    },
    cell: {
        backgroundColor: "grey",
        borderRadius: Math.round(Dimensions.get('window').width + Dimensions.get('window').height) / 2,
        flex: 1,
        marginRight: 10
    },
    hasEntry: {
        backgroundColor: "limegreen"
    },
    selected: {
        backgroundColor: "gold"
    },
    cellText: {
        color: "white",
        textAlign: "center"
    },
    journalEntries: {
        display: "flex",
        flexDirection: "column",
        width: "100%"
    },
    journalEntry: {
        padding: 20,
        alignSelf: "center",
        width: "80%",
        backgroundColor: lightBg,
        borderRadius: 10
    },
    journalEntryDate: {
        marginBottom: 10
    }
})

export default styles;