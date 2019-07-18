trains = []
console.log("working")
function chart() {
    $("#main-table").html("<tr><th>train name</th><th>Destiantion</th><th>Frequency(min)</th><th>Next arrival</th><th>Minutes away</th></tr>")
    for (var i = 0; i < trains.length; i++) {
        //make a new row
        var newRow = $("<tr id=new-row>")

        // make the new table items for the info & put info in the text for the each new box
        var newName = $("<td>").text(trains[i].name)
        var newDestination = $("<td>").text(trains[i].destination)
        var newFrequency = $("<td>").text(trains[i].frequency)
        var newTime = $("<td>").text((trains[i].first)+trains[i].frequency)
        var newArrivalTime = $("<td>").text(trains[i].tMinutesTillTrain)

        //put the name onto the new row
        newRow.append(newName, newDestination, newFrequency,  newTime, newArrivalTime)

        // put the new row into the table
        $("#main-table").append(newRow)
    }
}

$("#submitButton").on("click", function (event) {
    //gather info
    event.preventDefault()
    var trainName = $("#add-name").val()
    var trainDestination = $("#add-destination").val()
    var firstTime = $("#first-time").val()
    var trainFrequency = $("#train-frequency").val()

    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");

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
    // var nextTrain = moment().add(tMinutesTillTrain, "minutes");
    // console.log("ARRIVAL TIME: " + moment(nextTrain).format("hh:mm"))

    var train = {
        name: trainName,
        destination: trainDestination,
        first: firstTime,
        frequency: trainFrequency,
        tMinutesTillTrain: tMinutesTillTrain

    }
    console.log(train)

    trains.push(train)
    console.log(trains)

    // clear the textboxes for next input
    $("#add-name").val('')
    $("#add-destination").val('')
    $("#first-time").val('')
    $("#train-frequency").val('')

    chart()
})
