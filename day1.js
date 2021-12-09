import fs from 'fs'

var array = fs.readFileSync('./input/day1.txt').toString().split("\n")

var increasedDepthCount = 0

// PART 1
// var currentDepth = 0
// for(var i in array) {     
//     var newDepth = parseInt(array[i])

//     if(currentDepth != 0 && newDepth > currentDepth)
//         increasedDepthCount++

//     currentDepth = newDepth
// }

// PART 2
var currentSOM = 0

var array = fs.readFileSync('./input/day1.txt').toString().split("\n")
for(var i = 0; i < array.length-2; i++) {    
    var newSOM = parseInt(array[i]) + parseInt(array[i+1]) + parseInt(array[i+2])

    if(currentSOM != 0 && newSOM > currentSOM)
        increasedDepthCount+=1

    currentSOM = newSOM
}


console.log(increasedDepthCount)