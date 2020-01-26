 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyATyfvW4ljW1OPganzWkNMXK7F_nMgzQPQ",
    authDomain: "fir-demo-33d93.firebaseapp.com",
    databaseURL: "https://fir-demo-33d93.firebaseio.com",
    projectId: "fir-demo-33d93",
    storageBucket: "fir-demo-33d93.appspot.com",
    messagingSenderId: "987132343245",
    appId: "1:987132343245:web:e652b52234bf0b66c38a84",
    measurementId: "G-P6E3L6G840"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);


//test math below, with scratch variables
//current time
var currentTime = moment();
console.log("Current Time: " + moment(currentTime).format("hh:mm"));

//global variabls for train1
var t1Frequency = 6;
var t1FirstTime = "02:15";

//First time minus one year to make sure it comes befoer current time
var timeConverted = moment(t1FirstTime, "HH:mm").subtract(1, "years");
console.log("1st time converted: " + timeConverted);

//Difference between the times
var t1DiffTime = moment().diff(moment(timeConverted), "minutes");
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


//2nd attempt using the database in place of a for loop to handle the arrays.


//global variables:
//variable to reference the database:
var database = firebase.database();

//variable to relate user input to the database:
var trainNames = "";
var destinations = "";
var frequencies = "";
var firstArrivals = "";

//function to push values to the database:
$("#submitButton").on("click", function(event) {
    event.preventDefault();
    console.log("submitBtn click")

    //store values from the form:
    trainNames = $("#trainName").val().trim();
    destinations = $("#destination").val().trim();
    frequencies = $("#frequency").val().trim();
    firstArrivals = $("#firstTrain").val().trim();

    console.log("click values: " + trainNames, destinations, frequencies, firstArrivals)

    //push values to the database:
    database.ref().push({
        trainNamesDB: trainNames,
        destinationsDB: destinations,
        frequenciesDB: frequencies,
        firstArrivalsDB: firstArrivals
    });

});

//function to watch firbase for new data and change the html
database.ref().on("child_added", function(snapshot) {
    //variable for the snapshot value
    var snapval = snapshot.val();

    console.log(snapval.trainNamesDB);
    console.log(snapval.destinationsDB);
    console.log(snapval.frequenciesDB);
    console.log(snapval.firstArrivalsDB);

    //do the math to calculate the times and necessary variables
    var timeConverted = moment(snapval.firstArrivalsDB, "HH:mm").subtract(1, "years");
    console.log("converted time: " + timeConverted)

    //difference between the times
    var diffTime = moment().diff(moment(timeConverted), "minutes");
    console.log("difference in time: " + diffTime)

    //time between arrivals
    var remainder = diffTime % snapval.frequenciesDB;
    console.log("remainder: " + remainder)

    //minutes until the next train arrives
    var minutesUntilArrival = snapval.frequenciesDB - remainder;
    console.log("minutes till arrival: " + minutesUntilArrival)

    //time next train arrives
    var nextArrival = moment().add(minutesUntilArrival, "minutes");
    console.log("next arrival time: " + moment(nextArrival).format("HH:mm"))
    
    //and finally update the table html

    var tableRow = $('<tr id="row' + snapval.trainNamesDB + '"></th><td>' + snapval.trainNamesDB + '</td><td>' + snapval.destinationsDB + '</td><td>' + snapval.frequenciesDB + '</td><td>' + moment(nextArrival).format("HH:mm") + '</td><td>' + minutesUntilArrival + '<tr>')
    tableRow.appendTo("tbody");

    // var tableDestinations = $('')



});