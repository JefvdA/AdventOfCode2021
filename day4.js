import fs from 'fs'

var array = fs.readFileSync('./input/day4.txt').toString().split("\n")

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
for(var i in numbers){
    var chosenNumber = numbers[i]
    var winningNumber = -1
    var winnerExists = false

    for(var boardIndex in boards){
        var board = boards[boardIndex]
        
        for(var rowIndex in board){
            var row = board[rowIndex]
            var rowLength = row.length

            for(var numberIndex in row){
                var number = row[numberIndex]
                
                if(number == chosenNumber){
                    row.splice(numberIndex, 1)
                    break
                }
            }

            if(row.length == 0){
                winnerExists = true
                winningNumber = number
                break
            }
            
            if(rowLength > row.length)
                break
        }

        if(winnerExists) {
            var sumUnmarked = 0
            var score = 0
    
            for(var rowIndex in board){
                var row = board[rowIndex]

                for(var numberIndex in row){
                    var number = row[numberIndex]

                    sumUnmarked += parseInt(number)                    
                }
            }

            score = sumUnmarked * parseInt(chosenNumber)

            console.log("Board nr " + boardIndex + " has won, last number was " + winningNumber)
            console.log("That with a score of " + score)
            break
        }
    }

    if(winnerExists)
        break
}