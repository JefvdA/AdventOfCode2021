import fs from 'fs'

var array = fs.readFileSync('./input/day3.txt').toString().split("\n")

var gamma = findMostCommonBits(array)
var epsilon = reverseBits(gamma)

var oxygenRating = selectByBitCriteria(array, "Oxygen")
var co2Rating = selectByBitCriteria(array, "CO2")

console.log("Power consumption: " + parseInt(gamma, 2) * parseInt(epsilon, 2))
console.log("Lifesupport rating: " + parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))

function findMostCommonBits(array){
    var mostCommonBits = ""

    for(var i in array[0].trim()){
        mostCommonBits += '' + findMostCommonBit(array, i)
    }

    return mostCommonBits
}

function selectByBitCriteria(array, type){
    var newArray = []
    for(var i in array)
        newArray[i] = array[i]

    for(var i in newArray[0].trim()){
        var mostCommonBit = findMostCommonBit(newArray, i)
        var deleteList = []

        for(var j in newArray){
            if((newArray[j][i] != mostCommonBit && type == "Oxygen") || (newArray[j][i] == mostCommonBit && type == "CO2")){
                deleteList.push(j)
            }
        }

        for(var i = deleteList.length-1; i >= 0; i--){
            newArray.splice(deleteList[i], 1)
        }

        if(newArray.length == 1)
            break
    }

    return newArray
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