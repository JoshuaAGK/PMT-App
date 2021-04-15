import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import styles from './styles'

// var dateString = "";

// function updateDateString() {
//     const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
//     const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
//     var date = new Date();
//     var hours = String(date.getHours()).length < 2 ? "0" + String(date.getHours()) : String(date.getHours());
//     var minutes = String(date.getMinutes()).length < 2 ? "0" + String(date.getMinutes()) : String(date.getMinutes());
//     document.getElementById("timeOfDay").innerHTML = hours + ":" + minutes;
    
    
//     var monthNum = date.getMonth()
//     var year = date.getFullYear();
    
//     var day = String(days[date.getDay()]);
//     var date = date.getDate();
//     var month = String(months[monthNum]);
    
//     dateString = day + ", " + date + "th " + month + " " + year;
// }

function dateString() {
    const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var date = new Date();
    
    var monthNum = date.getMonth()
    var year = date.getFullYear();
    
    var day = String(days[date.getDay()]);
    var monthDate = date.getDate();
    var month = String(months[monthNum]);

    var ordinal = "";
    const stDates = [1, 21, 31];
    const ndDates = [2, 22];
    const rdDates = [3, 23];


    if (stDates.includes(monthDate)) {
        ordinal = "st"
    } else if (ndDates.includes(monthDate)) {
        ordinal = "nd"
    } else if (rdDates.includes(monthDate)) {
        ordinal = "rd"
    } else {
        ordinal = "th"
    }
    
    return day + ", " + monthDate + ordinal + " " + month + " " + year;
}

const UpperContents = (props) => {
    

    return (
        <View><Text>{dateString()}</Text></View>
    )
};

export default UpperContents;