import fs from 'fs'

var array = fs.readFileSync('./input/day3.txt').toString().split("\n")

var gamma = findMostCommonBits(array)
var epsilon = reverseBits(gamma)

console.log(parseInt(gamma, 2) * parseInt(epsilon, 2))

function findMostCommonBits(array){
    var mostCommonBits = ""

    for(var i in array[0].trim()){
        mostCommonBits += '' + findMostCommonBit(array, i)
    }

    return mostCommonBits
}

function findMostCommonBit(array, i){
    var zeroCount = 0
    var oneCount = 0

    for(var j in array){
        var number = array[j].trim()
        var bit = number[i]

        if(bit == 0)
            zeroCount++
        else
            oneCount++
    }

    if(zeroCount > oneCount)
        return 0
    else
        return 1
}

function reverseBits(number){
    var newNumber = ''

    for(var i in number){
        if(number[i] == '0')
            newNumber += '1'
        else
            newNumber += '0'
    }

    return newNumber
}