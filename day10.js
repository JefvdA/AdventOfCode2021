import fs from 'fs'

var input = fs.readFileSync('./input/day10.txt').toString().split("\n")

// Find corrupted characters + Find corrupted lines
var corruptedLines = []
var corruptedChars = []
for(var lineIndex in input){
    var line = input[lineIndex].trim()

    var corrupted = false
    var openingChars = []
    for(var charIndex in line){
        var char = line[charIndex]
    
        if(["(", "[", "{", "<"].includes(char))
            openingChars.push(char)
        else{
            var referenceChar = openingChars.at(-1)
            openingChars.pop()
            switch(referenceChar){
                case "(":
                    if(char != ")") corrupted = true
                    break
                case "[":
                    if(char != "]") corrupted = true
                    break
                case "{":
                    if(char != "}") corrupted = true
                    break
                case "<":
                    if(char != ">") corrupted = true
                    break
            }
            
            if(corrupted){
                corruptedLines.push(lineIndex)
                corruptedChars.push(char)
                break
            }
        }
    }
}

// Copy the input lines to clean lines array, so the corrupted can be deleted from it later on
var cleanLines = []
for(var lineIndex in input){
    var line = input[lineIndex]

    cleanLines.push(line)
}
// Remove corrupted lines from the 'cleanLines' array
for(var i = corruptedLines.length-1; i >= 0; i--){
    cleanLines.splice(corruptedLines[i], 1)
}

// PART 1
// Calculate score for the corrupted characters
var syntaxScore = 0
for(var charIndex in corruptedChars){
    var char = corruptedChars[charIndex]

    var points = 0
    switch(char){
        case ")":
            points = 3
            break
        case "]":
            points = 57
            break
        case "}":
            points = 1197
            break
        case ">":
            points = 25137
            break
    }
    syntaxScore += points
}
console.log("The syntax error score is " + syntaxScore)

// PART 2
// Calculate the autocomplete score for each uncompleted line
var totalScores = []
for(var lineIndex in cleanLines){
    var line = cleanLines[lineIndex].trim()

    // Get the remaining openingCharacters (which haven't been completed)
    var openingChars = []
    for(var charIndex in line){
        var char = line[charIndex]
    
        if(["(", "[", "{", "<"].includes(char))
            openingChars.push(char)
        else
            openingChars.pop()
    }

    // Get the closingCharacters (which would be used to complete the lines)
    var closingChars = []
    for(var charIndex = openingChars.length-1; charIndex >= 0; charIndex--){
        var char = openingChars[charIndex]
        var closingChar = ""

        switch(char){
            case "(":
                closingChar = ")"
                break
            case "[":
                closingChar = "]"
                break
            case "{":
                closingChar = "}"
                break
            case "<":
                closingChar = ">"
                break
        }

        closingChars.push(closingChar)
    }

    // Get the total score of THIS line
    var totalScore = 0
    for(var charIndex in closingChars){
        var char = closingChars[charIndex]
        
        var points = 0
        switch(char){
            case ")":
                points = 1
                break
            case "]":
                points = 2
                break
            case "}":
                points = 3
                break
            case ">":
                points = 4
                break
        }

        totalScore *= 5
        totalScore += points
    }
    totalScores.push(totalScore)
}

// Calculate the middle score
var sortedTotalScores = totalScores.sort((a, b) => b-a)
var middleIndex = Math.floor(sortedTotalScores.length / 2)
var middleScore = sortedTotalScores[middleIndex]
console.log("The middel score is " + middleScore)