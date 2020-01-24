//current time
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("hh:mm"));

//global variabls for train1
var t1Frequency = 6;
var t1FirstTime = "02:15";

//First time minus one year to make sure it comes befoer current time
var t1FirstTimeConverted = moment(t1FirstTime, "HH:mm").subtract(1, "years");
console.log("1st time converted: " + t1FirstTimeConverted);

//Difference between the times
var t1DiffTime = moment().diff(moment(t1FirstTimeConverted), "minutes");
console.log("Difference in t1 time: " + t1DiffTime)

//Time between arrivals
var t1Remainder = t1DiffTime % t1Frequency;
console.log("reaminder: " + t1Remainder);

//minutes until next train arrives
var t1MinutesTillArrival = t1Frequency - t1Remainder;
console.log("minutes till arrival: " + t1MinutesTillArrival)

//time next train arrives
var t1NextArrival = moment().add(t1MinutesTillArrival, "minutes");
// moment(t1NextArrival).format("HH:mm");
console.log("next arrival time: " + moment(t1NextArrival).format("HH:mm"))


//4 arrays for names, destinations, frequency, and first arrivals
var trainNames = [
    "Ossious Eyes"
    "Squee Biscuit"
    "Tandy Pine"
    "C6, C6, D9#11, %, Dm7, G7"
];

var destinations = [
    "The Underverse",
    "Booklyn",
    "Post Appocalypse",
    "Ellingtonia"
];

//frequencies array is expressed in minutes
var frequencies = [
    7,
    13,
    5,
    4,
];

//firstArrivals is expressed in HH:mm
var firstArrivals = [
    "00:01",
    "03:18",
    "1:00",
    "04:04",
];

//function which loops each arrray, does the math, and appends to the table.

//onclick function to capture the form input, add the inputs to the arrays, clears the table, and then calls the first function
