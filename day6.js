import fs from 'fs'

var input = fs.readFileSync('./input/day6.txt').toString()

const DAYS = 256
const INTERVAL = 7

var fishArray = createFishArray(input)
var fishCount = fishArrayToCount(fishArray)

fishCount = progressSimulation(fishCount, DAYS)
console.log(countFish(fishCount))
console.log(fishCount)

function progressSimulation(fishCount, days){
    var simulationCount = []
    for(var day in fishCount){
        var count = fishCount[day]
        simulationCount[day] = count
    }

    for(var day = 0; day < days; day++){
        simulationCount[(day + 7)%9] += simulationCount[day%9]
    }

    return simulationCount
}

function createFishArray(input){
    var fishArray = input.split(',')

    for(var fishIndex in fishArray){
        fishArray[fishIndex] = parseInt(fishArray[fishIndex])
    }

    return fishArray
}

function fishArrayToCount(fishArray){
    var count = []
    for(var i = 0; i < INTERVAL+2; i++)
        count[i] = 0

    for(var fishIndex in fishArray){
        var fish = fishArray[fishIndex]
        count[fish] += 1
    }

    return count
}

function countFish(fishArray){
    var count = 0

    for(var fishCount in fishArray)
        count += fishArray[fishCount]

    return count
}