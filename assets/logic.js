trains = []
console.log("working")
function chart() {
    $("#main-table").empty()

    for (var i = 0; i < trains.length; i++) {
        //make a new row
        var newRow = $("<tr id=new-row>")

        // make the new table items for the info
        var newName = $("<td>")
        var newDestination = $("<td>")
        var newTime = $("<td>")
        var newFrequency = $("<td>")

        //put info in the text for the each new box
        newName.text(trains[i].name)
        newDestination.text(trains[i].destination)
        newTime.text(trains[i].first)
        newFrequency.text(trains[i].frequency)

        //put the name onto the new row
        newRow.append(newName, newDestination, newTime, newFrequency)

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

    //eliminate user error
    // if ($("#add-name").val() === '' || $("#add-destination").val() === '' || $("#first-time").val() || $("#train-frequency").val() === '') {
    //     alert("please fill out all forms")
    // }

    var train = {
        name: trainName,
        destination: trainDestination,
        first: firstTime,
        frequency: trainFrequency
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

