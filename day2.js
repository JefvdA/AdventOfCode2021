import fs from 'fs'

var array = fs.readFileSync('./input/day2.txt').toString().split("\n")

var horizontal = 0
var depth = 0
var aim = 0

// PART 1
// for(var i in array) {     
//     var command = array[i].split(" ")[0]
//     var x = parseInt(array[i].split(" ")[1])

//     switch(command){
//         case 'forward':
//             horizontal += x
//             break
//         case 'down':
//             depth += x
//             break
//         case 'up':
//             depth -= x
//             break
//     }
// }

// PART 2
for(var i in array) {     
    var command = array[i].split(" ")[0]
    var x = parseInt(array[i].split(" ")[1])

    switch(command){
        case 'forward':
            horizontal += x
            depth += aim*x
            break
        case 'down':
            aim += x
            break
        case 'up':
            aim -= x
            break
    }
}

console.log("Answer: " + horizontal * depth)