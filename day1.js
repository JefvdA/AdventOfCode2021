import fs from 'fs'

var currentDepth = 0
var increasedDepthCount = 0

var array = fs.readFileSync('./input/day1.txt').toString().split("\n")
for(var i in array) {     
    var newDepth = parseInt(array[i])

    if(currentDepth != 0 && newDepth > currentDepth)
        increasedDepthCount++

    currentDepth = newDepth
}

console.log(increasedDepthCount)