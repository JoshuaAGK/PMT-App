import React, { useEffect, useState } from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import calendarStyles from './styles';
import firebase from '../../src/firebase/config';
import { dateString } from '../../utils/StringUtils';
import { getUserCollection } from '../../src/firebase/firestore/firestoreService';

export const Calendar = (props) => {
    let today = new Date();
    const [month, setMonth] = useState(() => {
        return today.getMonth();
    });
    const [year, setYear] = useState(() => {
        return today.getFullYear();
    });
    const [selectedDay, setSelectedDay] = useState();
    const [journalEntries, setJournalEntries] = useState([]);
    const [displayEntries, setDisplayEntries] = useState([]);

    let date = new Date(year, month + 1, 0);
    let dateParts = dateString(date).split(" ");
    let daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    let monthStr = dateParts[2];
    let yearStr = dateParts[3];
    let monthYear = `${monthStr} ${yearStr}`;
    let daysInMonth = date.getDate();

    let header = daysOfWeek.map((day, index) => {
        return (
            <Text style={calendarStyles.headerCell}>{day}</Text>
        );
    });

    useEffect(() => {
        let date = new Date(year, month, 0);
        console.log(daysInMonth);
        let endDate = new Date(year, month, daysInMonth + 1);
        console.log(date);
        console.log(endDate);
        let journalRef = getUserCollection("journal");
        let query = journalRef.where("date", ">=", date).where("date", "<=", endDate);

        query.get().then((querySnapshot) => {
            let journalEntries = [];
            querySnapshot.forEach((doc) => {
                let data = doc.data();
                if (data.hasOwnProperty('date') && data.hasOwnProperty('text')) {
                    let dataDate = new Date((data.date.nanoseconds / 1000) + (data.date.seconds * 1000));
                    let dataText = data.text;
                    let dataMood = data.mood;
                    journalEntries.push({
                        date: dataDate,
                        text: dataText,
                        mood: dataMood
                    });
                }
            });
            setJournalEntries(journalEntries);
        }).catch((error) => {
            console.error("Error getting document: ", error);
        });
    }, [selectedDay, month, year, setJournalEntries]);

    useEffect(() => {
        setDisplayEntries((displayEntries) => {
            return getJournalEntries(journalEntries, selectedDay)
        });
    }, [selectedDay, setDisplayEntries]);

    let calendarDayRows = [];
    var calendarDayRow = [];
    for (var i = 1; i <= daysInMonth; i++) {
        calendarDayRow.push(i);
        if (i % 7 == 0) {
            calendarDayRows.push(calendarDayRow);
            calendarDayRow = [];
        }
    }
    for (var i = calendarDayRow.length; i < 7; i++) {
        calendarDayRow.push(0);
    }
    calendarDayRows.push(calendarDayRow);

    function prevMonth() {
        setMonth((month) => {
            var prev = month - 1;
            if (prev < 0) {
                prev = 11;
                setYear((year) => {
                    return year - 1;
                })
            }
            setSelectedDay(0);
            return prev;
        });
    }

    function nextMonth() {
        setMonth((month) => {
            var next = month + 1;
            if (next > 11) {
                next = 0;
                setYear((year) => {
                    return year + 1;
                })
            }
            setSelectedDay(0);
            return next;
        });
    }

    let calendarRows = calendarDayRows.map((row, index) => {
        let calendarDayCells = row.map((day, index) => {
            let content = (day == 0) ? " " : day;
            let style;
            if (day == 0) {
                style = [calendarStyles.cell, calendarStyles.emptyCell] 
            } else if (hasJournalEntry(journalEntries, day)) {
                if (day == selectedDay) {
                    style = [calendarStyles.cell, calendarStyles.selected];
                } else {
                    style = [calendarStyles.cell, calendarStyles.hasEntry];
                }
            } else {
                style = calendarStyles.cell;
            }

            return (
                <View style={style}>
                    <Pressable onPress={() => {
                        setSelectedDay(day);
                    }}>
                        <Text style={calendarStyles.cellText}>{content}</Text>
                    </Pressable>
                </View>
            );
        });
        return (
            <View style={calendarStyles.calendarRow}>
                {calendarDayCells}
            </View>
        );
    });

    let journalDisplayEntries = displayEntries.map((displayEntry, index) => {
        let mood = displayEntry.mood;
        let dateParts = displayEntry.date.toLocaleString("en-GB").split(" ");
        let time = dateParts[3];
        return (
            <View style={calendarStyles.journalEntry}>
                <View style={calendarStyles.journalEntryHeader}>
                    <Text style={calendarStyles.journalEntryDate}>{time}</Text>
                    <Text style={calendarStyles.journalMood}>{mood}</Text>
                </View>
                <Text style={calendarStyles.journalEntryText}>{displayEntry.text}</Text>
            </View>
        );
    });

    return (
        <ScrollView showsVerticalScrollIndicator={false} style={[mainStyles.mainPage, calendarStyles.calendarMain]}>
            <Text style={[mainStyles.bigText, calendarStyles.title]}>Journal Calendar</Text>
            <View style={calendarStyles.calendarContainer}>
                <View style={calendarStyles.calendarHeader}>
                    <Pressable style={[calendarStyles.prevMonth, calendarStyles.monthButton]} onPress={prevMonth}>
                        <Text>Prev</Text>
                    </Pressable>
                    <Text style={calendarStyles.monthYearTxt}>{monthYear}</Text>
                    <Pressable style={[calendarStyles.nextMonth, calendarStyles.monthButton]} onPress={nextMonth}>
                        <Text>Next</Text>
                    </Pressable>
                </View>
                <View style={calendarStyles.calendarTable}>
                    <View style={calendarStyles.calendarRow}>
                        {header}
                    </View>
                    {calendarRows}
                </View>
            </View>
            <View style={calendarStyles.journalEntries}>
                {journalDisplayEntries}
            </View>
        </ScrollView>
    );
};

function hasJournalEntry(journalEntries, day) {
    for (const journalEntry of journalEntries) {
        if (journalEntry.date.getDate() == day) {
            return true;
        }
    }
    return false;
}

function getJournalEntries(journalEntries, day) {
    let result = [];
    for (const journalEntry of journalEntries) {
        if (journalEntry.date.getDate() == day) {
            result.push(journalEntry);
        }
    }
    return result;
}

export default Calendar;
