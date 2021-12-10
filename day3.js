import fs from 'fs'

var array = fs.readFileSync('./input/testing.txt').toString().split("\n")

var gamma = findMostCommonBits(array)
var epsilon = reverseBits(gamma)

// var oxygenRating = selectByBitCriteria(array, "Oxygen")
var co2Rating = selectByBitCriteria(array, "CO2")

console.log("Power consumption: " + parseInt(gamma, 2) * parseInt(epsilon, 2))
// console.log("Lifesupport rating: " + parseInt(oxygenRating, 2) * parseInt(co2Rating, 2))

// console.log("OXYGEN: " + oxygenRating)
console.log("CO2: " + co2Rating)

function findMostCommonBits(array){
    var mostCommonBits = ""

    for(var i in array[0].trim()){
        mostCommonBits += '' + findMostCommonBit(array, i)
    }

    return mostCommonBits
}

function selectByBitCriteria(array, type){
    var newArray = array
    
    for(var i in newArray[0].trim()){
        var mostCommonBit = findMostCommonBit(newArray, i)
        if(mostCommonBit == 2)
            mostCommonBit = 1

        for(var j in newArray){
            switch(type){
                case 'Oxygen':
                    // newArray = newArray.filter((value, i) => {
                    //     return value[i] == mostCommonBit
                    // })
                    if(newArray[j][i] != mostCommonBit)
                        newArray.splice(j, 1)
                    break
                case 'CO2':
                    // newArray = newArray.filter((value, i) => {
                    //     return value[i] == leastCommonBit
                    // })
                    if(newArray[j][i] == mostCommonBit)
                        newArray.splice(j, 1)
                    break
                default:
                    return
            }
        }

        console.log(newArray)

        if(newArray.length <= 1)
            break
    }

    return newArray[0]
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
    else if(zeroCount < oneCount)
        return 1
    else
        return 2
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