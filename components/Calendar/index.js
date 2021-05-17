import React from 'react';
import { View, Pressable, Text, ScrollView } from 'react-native';
import mainStyles from '../../styles/styles';
import styles from './styles';
import { dateString } from '../../utils/StringUtils';
import { getUserCollection } from '../../src/firebase/firestore/firestoreService';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

class Calendar extends React.Component {
  constructor(props) {
    super(props);
    let today = new Date();

    // State variables
    this.state = {
      daysOfWeek: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      displayEntries: [],
      selectedDate: null,
      selectedText: null,
      selectedMood: null,
      month: today.getMonth(),
      year: today.getFullYear(),
      journalEntries: [],
    };

    // Get month & year as string (e.g. May 2021)
    let date = new Date(this.state.year, this.state.month + 1, 0);
    let dateParts = dateString(date).split(' ');
    this.state.monthYear = `${dateParts[2]} ${dateParts[3]}`;
  }

  // Perform request automatically on component load
  componentDidMount() {
    this.makeFirestoreRequest();
  }

  makeFirestoreRequest() {
    let daysInMonth = new Date(
      this.state.year,
      this.state.month + 1,
      0
    ).getDate(); // Days in the current month (28 - 31)
    let startDate = new Date(this.state.year, this.state.month, 0); // First day of the month
    let endDate = new Date(this.state.year, this.state.month, daysInMonth + 1); // Last day of the month
    let weekDayOfFirst = new Date(
      this.state.year,
      this.state.month,
      1
    ).getDay(); // Week day of the 1st day of the month (Sunday - Saturday)
    let weekDayOfLast = new Date(
      this.state.year,
      this.state.month,
      daysInMonth
    ).getDay(); // Week day of the last day of the month (Sunday - Saturday)
    let fillerNeeded = weekDayOfFirst === 0 ? 6 : weekDayOfFirst - 1; // Number of blank days needed to offset the CalendarDays so they are under the correct heading
    let fillerNeededEnd = 6 - (weekDayOfLast === 0 ? 6 : weekDayOfLast - 1); // Number of blank days needed to offset the CalendarDays so they are under the correct heading

    // Database reference
    let journalRef = getUserCollection('journal');
    // Database query
    let query = journalRef
      .where('date', '>=', startDate)
      .where('date', '<=', endDate);

    query
      .get()
      .then((querySnapshot) => {
        let journalEntries = [];
        querySnapshot.forEach((doc) => {
          let data = doc.data();
          // Push data to journalEntries if data found
          if (data.hasOwnProperty('date') && data.hasOwnProperty('text')) {
            journalEntries.push({
              date: data.date.toDate(),
              text: data.text,
              mood: data.mood,
            });
          }
        });

        this.setState({ journalEntries });

        // All CalendarDay objects
        let calendarDayArray = [];

        let prevMonth = new Date(this.state.year, this.state.month, 0);
        let prevMonthDate = prevMonth.getDate();
        // Add filler CalendarDays to the beginning of the array
        for (let i = 0; i < fillerNeeded; i++) {
          //let fillerDay = <CalendarDay key={i} itemType={"filler"}/>
          let fillerDay = (
            <CalendarDay
              key={i}
              date={prevMonthDate - fillerNeeded + 1 + i}
              itemType={'filler'}
            />
          );
          calendarDayArray.push(fillerDay);
        }

        // Create a CalendarDay for each day of the month
        for (let i = 0; i < daysInMonth; i++) {
          var calendarDay = (
            <CalendarDay
              key={fillerNeeded + i}
              date={i + 1}
              itemType={'unset'}
            />
          );

          // If that day has data, use a "set" CalendarDay instead
          for (let j = 0; j < journalEntries.length; j++) {
            if (journalEntries[j].date.getDate() == i + 1) {
              calendarDay = (
                <CalendarDay
                  key={fillerNeeded + i}
                  propFunction={this.loadJournalForDate}
                  date={journalEntries[j].date.getDate()}
                  fulldate={journalEntries[j].date}
                  text={journalEntries[j].text}
                  mood={journalEntries[j].mood}
                  itemType={'set'}
                />
              );
            }
          }

          // Append to array
          calendarDayArray.push(calendarDay);
        }

        // Add filler CalendarDays to the end of the array
        for (let i = 0; i < fillerNeededEnd; i++) {
          let fillerDay = (
            <CalendarDay
              key={fillerNeeded + daysInMonth + i}
              date={i + 1}
              itemType={'filler'}
            />
          );
          calendarDayArray.push(fillerDay);
        }

        let calendarRows = [];
        let currentRow = [];
        for (let i = 0; i < calendarDayArray.length; i++) {
          const day = calendarDayArray[i];
          currentRow.push(day);
          if (currentRow.length === 7) {
            let content = currentRow.map((day, index) => {
              return day;
            });
            calendarRows.push(
              <View key={'row' + i} style={styles.calendarRow}>
                {content}
              </View>
            );
            currentRow = [];
          }
        }

        let displayEntries = calendarRows.map((row, index) => {
          return row;
        });

        // Update state
        this.setState(
          {
            displayEntries: displayEntries,
          },
          // Reload render callback
          this.forceUpdateHandler
        );
      })
      .catch((error) => {
        console.error('Error getting document: ', error);
      });
  }

  // Reload render
  forceUpdateHandler() {
    this.forceUpdate();
  }

  // Load previous month
  prevMonth = () => {
    let date = new Date(this.state.year, this.state.month, 0);
    let dateParts = dateString(date).split(' ');

    // Update state
    this.setState(
      {
        month: this.state.month - 1,
        monthYear: `${dateParts[2]} ${dateParts[3]}`,
        displayEntries: [],
        selectedDate: null,
        selectedText: null,
        selectedMood: null,
      },
      // Request previous month
      this.makeFirestoreRequest
    );
  };

  // Load next month
  nextMonth = () => {
    let date = new Date(this.state.year, this.state.month + 2, 0);
    let dateParts = dateString(date).split(' ');

    // Update state
    this.setState(
      {
        month: this.state.month + 1,
        monthYear: `${dateParts[2]} ${dateParts[3]}`,
        displayEntries: [],
        selectedDate: null,
        selectedText: null,
        selectedMood: null,
      },
      // Request next month
      this.makeFirestoreRequest
    );
  };

  // Prop function for CalendarDay
  loadJournalForDate = (date, text, mood) => {
    this.setState(
      {
        selectedDate: date,
        selectedText: text,
        selectedMood: mood,
      },
      this.forceUpdateHandler
    );
  };

  render() {
    let emojis = ['😢', '🙁', '😐', '🙂', '😃'];

    // Details of currently-selected journal date
    let journalDetails = null;
    // Check date has data
    if (this.state.selectedText != null) {
      // console.log(this.state.selectedDate.getUTCDate());
      // journalDetails = (
      //   <View style={[styles.journalDetails, mainStyles.platformShadow]}>
      //     <Text>
      //       {emojis[this.state.selectedMood] +
      //         ' ' +
      //         this.state.selectedDate.toISOString().substring(0, 10) +
      //         '\n'}
      //     </Text>
      //     <Text>{this.state.selectedText}</Text>
      //   </View>
      // );
      const journalDaysFilter = this.state.journalEntries.filter(
        (entry) =>
          entry.date.toISOString().substring(8, 10) ===
          this.state.selectedDate.toISOString().substring(8, 10)
      );

      journalDetails = journalDaysFilter.map((entry, index) => (
        <View
          key={index}
          style={[
            styles.journalDetails,
            mainStyles.platformShadow,
            mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason,
          ]}
        >
          <Text>
            {emojis[entry.mood] +
              ' ' +
              entry.date.toISOString().substring(0, 10) +
              '\n'}
          </Text>
          <Text>{entry.text}</Text>
        </View>
      ));
    }

    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.buttonContainer}>
          <Pressable style={styles.nextPrevBtn} onPress={this.prevMonth}>
            <MaterialIcons
              name="navigate-before"
              color="black"
              style={styles.calendarArrow}
            />
          </Pressable>

          <Text>{this.state.monthYear}</Text>

          <Pressable style={styles.nextPrevBtn} onPress={this.nextMonth}>
            <MaterialIcons
              name="navigate-next"
              color="black"
              style={styles.calendarArrow}
            />
          </Pressable>
        </View>

        <View
          style={[
            styles.calendarContainer,
            mainStyles.platformShadow,
            mainStyles.lowestElementOnPageToGiveItABottomMarginBecauseAndroidIsWeirdAndDoesntLikeShadowsForSomeReason,
          ]}
        >
          <View style={styles.calendarRow}>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[1]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[2]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[3]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[4]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[5]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[6]}
            </Text>
            <Text style={styles.calendarHeaderText}>
              {this.state.daysOfWeek[0]}
            </Text>
          </View>
          <>{this.state.displayEntries}</>
        </View>

        {journalDetails}
      </ScrollView>
    );
  }
}

class CalendarDay extends React.Component {
  render() {
    var returnDay;
    switch (this.props.itemType) {
      // Filler day (blank)
      case 'filler':
        if (this.props.date) {
          returnDay = (
            <View style={styles.calendarDayFillerPopulated}>
              <Text style={styles.calendarDayNumberTextFiller}>
                {this.props.date}
              </Text>
            </View>
          );
        } else {
          returnDay = <View style={styles.calendarDayFiller}></View>;
        }
        break;
      // Unset day (just the number)
      case 'unset':
        returnDay = (
          <View style={styles.calendarDayUnset}>
            <Text style={styles.calendarDayNumberText}>{this.props.date}</Text>
          </View>
        );
        break;
      // Set day (number, checkmark, and onpress)
      case 'set':
        returnDay = (
          <Pressable
            style={styles.calendarDaySet}
            onPress={() => {
              this.props.propFunction(
                this.props.fulldate,
                this.props.text,
                this.props.mood
              );
            }}
          >
            <Text style={styles.calendarDayNumberText}>{this.props.date}</Text>
            <MaterialIcons
              name="done"
              color="limegreen"
              style={styles.checkIcon}
            />
          </Pressable>
        );
        break;
    }
    return returnDay;
  }
}

export default Calendar;
