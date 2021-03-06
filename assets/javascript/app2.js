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


//4 arrays for names, destinations, frequency, and first arrivals
var trainNames = [
    "Chuchu Cthulhu",
    "Squee Biscuit",
    "Tandy Train",
    "C6, %, D9#11, %, Dm7, G7"
];

var destinations = [
    "R'lyeh",
    "Booklyn",
    "Pilbasia",
    "Ellingtonia"
];

//frequencies array is expressed in minutes
var frequencies = [
    7,
    13,
    3181,
    4
];

//firstArrivals is expressed in HH:mm
var firstArrivals = [
    "19:28",
    "03:18",
    "1:00",
    "04:04"
];

console.log(trainNames)
console.log(destinations)
console.log(frequencies)
console.log(firstArrivals)

//function which prepairs the page and displays the contents of the arrays
$(document).ready(function() {
    dataManager();
});

//function to get data from the database
// database.ref("/nameData").on("value", function(snapshot){


// })



//function which loops each arrray, does the math, pulls fromt the database, and appends to the table.
function dataManager() {
    $("tbody").empty();

    for (i = 0; i < trainNames.length; i++) {
        var tableNames = $('<tr id="row' + [i] +'"></th><td>' + trainNames[i] + '</td>')
        tableNames.appendTo("tbody");
    }

    for (j = 0; j < destinations.length; j++) {
        var tableDestinations = $('<td>' + destinations[j] + '</td>');
        tableDestinations.appendTo('#row' + [j]);
    }

    for (k = 0; k < frequencies.length; k++) {
        var tableFrequencies = $('<td>' + frequencies[k] + '</td>');
        tableFrequencies.appendTo('#row' + [k]);
    }

    


    for (l = 0; l < firstArrivals.length; l++) {
        timeConverted = moment(firstArrivals[l], "hh:mm").subtract(1, "years");
        console.log("for time converted:" + timeConverted)
        var diffTime = moment().diff(moment(timeConverted), "minutes");
        console.log("diffTime: " + diffTime)
        var remainder = diffTime % frequencies[l];
        console.log("for frequencies: " + frequencies[l])
        console.log("for remainder: " + remainder)
        var minutesTillArrival = frequencies[l] - remainder;
        var nextArrival = moment().add(minutesTillArrival, "minutes");
        nextArrival = moment(nextArrival).format("HH:mm");
        console.log('for next arrival: ' + nextArrival)
        var tableNextArrival = $('<td>' + nextArrival + '</td>');
        tableNextArrival.appendTo('#row' + [l]);
        var tableMinutesTillArrival = $('<td>' + minutesTillArrival + '</td>');
        tableMinutesTillArrival.appendTo('#row' + [l]);
    }
     
};

//onclick function to capture the form input, add the inputs to the arrays, and then calls the first function
$("#submitButton").on("click", function(event) {
    event.preventDefault();
    console.log("form CLICK-y-Clickerson")
    var trainNameInput = $("#trainName").val().trim();
    console.log("trainName input: " + trainNameInput)
    trainNames.push(trainNameInput)
    console.log("click array test: " + trainNames)
    var destinationsInput = $("#destination").val().trim();
    destinations.push(destinationsInput)
    var firstTrainInput = $("#firstTrain").val().trim();
    firstArrivals.push(firstTrainInput) 
    var frequencyInput = $("#frequency").val().trim();
    frequencies.push(frequencyInput)
    dataManager()
})