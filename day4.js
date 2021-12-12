import fs from 'fs'

var array = fs.readFileSync('./input/testing.txt').toString().split("\n")

// Find chosen numbers
var numbersString = array[0].trim()
//  + array[1].trim()
var numbers = numbersString.split(',')

// Create boards
var boards = []
for(var i = 2; i < array.length; i+=6){

    // Create rows
    var rows = []
    for(var j = 0; j < 5; j++){

        // Fill row with numbers
        var row = array[i+j].trim()
        row = row.split(' ').filter((value) => { return value.trim() != '' })

        rows.push(row)
    }

    boards.push(rows)
}

// Play bingo
numbers.forEach((number) => {
    console.log(number)
})