import fs from 'fs'

var array = fs.readFileSync('./input/day4.txt').toString().split("\n")

// Find chosen numbers
var numbersString = array[0].trim()
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

findWinner()
findLoser()

// Play bingo - PART 1 (find winner)
function findWinner(){
    for(var i in numbers){
        var chosenNumber = numbers[i]
        var winningNumber = -1
        var winnerExists = false

        for(var boardIndex in boards){
            var board = boards[boardIndex]
            
            for(var rowIndex in board){
                var row = board[rowIndex]

                for(var numberIndex in row){
                    var number = row[numberIndex]
                    
                    if(number == chosenNumber){
                        row[numberIndex] *= -1
                        break
                    }
                }

                if(VerifyWinner(board)){
                    winnerExists = true
                    winningNumber = number
                    break
                }
            }

            if(winnerExists) {
                var score = calculateScore(board, winningNumber)
                console.log("Board nr " + boardIndex + " has won, last number was " + winningNumber)
                console.log("That with a score of " + score)
                break
            }
        }

        if(winnerExists)
            break
    }
}

// Play bingo - PART 2 (find loser)
function findLoser(){
    for(var i in numbers){
        var chosenNumber = numbers[i]
        var loserExists = false
        var winningNumber = -1

        for(var boardIndex in boards){
            var board = boards[boardIndex]
            
            for(var rowIndex in board){
                var row = board[rowIndex]

                for(var numberIndex in row){
                    var number = row[numberIndex]
                    
                    if(number == chosenNumber){
                        row[numberIndex] *= -1
                        break
                    }
                }

                if(VerifyWinner(board)){
                    winningNumber = number
                    var winnerCount = CountWinningBoards(boards)
                    if(winnerCount == boards.length)
                        loserExists = true
                    break
                }
            }

            if(loserExists)
                break
        }

        if(loserExists){
            var score = calculateScore(board, winningNumber)
            console.log("Board nr " + boardIndex + " has lost, last number was " + number)
            console.log("That with a score of " + score)
            break
        }
    }
}

function CountWinningBoards(boards){
    var count = 0
    for(var boardIndex in boards){
        var board = boards[boardIndex]

        if(VerifyWinner(board)){
            count++
        }
    }
    return count
}

function VerifyWinner(board){
    for(var rowIndex in board){
        var row = board[rowIndex]

        if(VerifyNumbers(row))
            return true
    }

    for(var numberIndex in board[0]){
        var numbers = []

        for(var rowIndex in board){
            var row = board[rowIndex]

            numbers.push(row[numberIndex])
        }

        if(VerifyNumbers(numbers))
            return true
    }
    return false
}

function VerifyNumbers(numbers){
    var result = true
    for(var numberIndex in numbers){
        var number = numbers[numberIndex]

        if(number > 0){
            result = false
            break
        }
    }
    return result
}

function calculateScore(board, winningNumber){
    var sumUnmarked = 0
    var score = 0

    for(var rowIndex in board){
        var row = board[rowIndex]

        for(var numberIndex in row){
            var number = row[numberIndex]

            if(number > 0)
                sumUnmarked += parseInt(number)                    
        }
    }

    score = sumUnmarked * parseInt(winningNumber)
    return score
}