import fs from 'fs'

var input = fs.readFileSync('./input/testing.txt').toString().split("\n")

for(var lineIndex in input){
    var line = input[lineIndex].trim()

    var openingChars = []
    var closingChars = []
    for(var charIndex in line){
        var char = line[charIndex]

        if(["(", "[", "{", "<"].includes(char))
            openingChars.push(char)
    }
    console.log(openingChars)
}