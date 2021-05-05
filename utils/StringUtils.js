export function capitalize() {
    return this.charAt(0).toUpperCase() + this.slice(1)
}

export function pad(d) { // https://stackoverflow.com/questions/5774042/format-a-number-exactly-two-in-length
    return (d < 10) ? '0' + d.toString() : d.toString();
}

const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

export function dateString(date) {
    var monthNum = date.getMonth()
    var year = date.getFullYear();
    
    var day = days[date.getDay()];
    var monthDate = date.getDate();
    var month = months[monthNum];

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