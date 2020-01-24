//current time
var currentTime = moment();
console.log("Current Time: " +moment(currentTime).format("hh:mm"));

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
