var firebaseConfig = {
    apiKey: "AIzaSyAc7E32SwO3fX223ooWvMFomLgMEkhiBP0",
    authDomain: "first-d5c07.firebaseapp.com",
    databaseURL: "https://first-d5c07.firebaseio.com",
    projectId: "first-d5c07",
    storageBucket: "",
    messagingSenderId: "625677026881",
    appId: "1:625677026881:web:d52ba5d05e58f995"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

var database = firebase.database()
$("#submitButton").on("click", function (event) {
    //gather info
    event.preventDefault()
    var trainName = $("#add-name").val()
    var trainDestination = $("#add-destination").val()
    var firstTime = $("#first-time").val()
    var trainFrequency = $("#train-frequency").val()


    // First Time (pushed back 1 year to make sure it comes before current time)
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // Current Time
    var currentTime = moment();
    console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

    // Difference between the times
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log("DIFFERENCE IN TIME: " + diffTime);

    // Time apart (remainder)
    var tRemainder = diffTime % trainFrequency;
    console.log(tRemainder);

    // Minute Until Train
    var tMinutesTillTrain = trainFrequency - tRemainder;
    console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);

    // Next Train
    var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"));

    // clear the textboxes for next input
    $("#add-name").val('')
    $("#add-destination").val('')
    $("#first-time").val('')
    $("#train-frequency").val('')

    var newTrain = {
        trainName: trainName,
        trainDestination: trainDestination,
        firstTime: firstTime,
        trainFrequency: trainFrequency,
        arrivalTime: moment(nextTrain).format("hh:mm"),
        minutesAway: tMinutesTillTrain
      };

    database.ref().push(newTrain);
    $("#main-table").empty()

    database.ref().on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
      
        // Store everything into a variable.
        var train_Name = childSnapshot.val().trainName;
        var train_destination = childSnapshot.val().trainDestination;
        // var train_time = childSnapshot.val().firstTime;
        var train_frequency = childSnapshot.val().trainFrequency;
        var arrival_time = childSnapshot.val().arrivalTime
        var minutesAway_Away = childSnapshot.val().minutesAway
        
        var newRow = $("<tr>").append(
        $("<td>").text(train_Name),
        $("<td>").text(train_destination),
        $("<td>").text(train_frequency),
        $("<td>").text(arrival_time),
        $("<td>").text(minutesAway_Away)
      );

        $("#main-table").append(newRow)
    })

    
    
})
