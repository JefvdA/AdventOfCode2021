import fs from 'fs'

var input = fs.readFileSync('./input/day6.txt').toString()

const DAYS = 256
const INTERVAL = 7

var fishArray = createFishArray(input )
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

    var fullCycles = Math.floor(days / INTERVAL)
    for(var cycle = 0; cycle < fullCycles; cycle++){
        var currentCount = []
        for(var day in simulationCount){
            var count = simulationCount[day]
            currentCount[day] = count
        }

        // Fish will produce new fish
        for(var day = 0; day < INTERVAL; day++){
            var count = currentCount[day]

            // Current timer stays the same - new fish timer = current + 2
            var newDay = day + 2
            simulationCount[newDay] += count
        }
        // Fish won't reproduce
        for(var day = INTERVAL; day < currentCount.length; day++){
            var count = currentCount[day]

            // Current counter decreases with INTERVAL
            var newDay = day - INTERVAL
            simulationCount[newDay] += count
            simulationCount[day] -= count
        }
    }

    var remainingDays = days % INTERVAL
    var currentCount = []
    for(var day in simulationCount){
        var count = simulationCount[day]
        currentCount[day] = count
    }
    // Fish will produce new fish
    for(var day = 0; day < remainingDays; day++){
        var count = currentCount[day]

        // Current timer is 6
        simulationCount[6] += count
        simulationCount[day] -= count

        // new fish timer is 8
        var newDay = 8
        simulationCount[newDay] += count
    }
    // Fish won't reproduce
    for(var day = remainingDays; day < currentCount.length; day++){
        var count = currentCount[day]

        // Current counter decreases with Remaining days
        var newDay = day - remainingDays
        simulationCount[newDay] += count
        simulationCount[day] -= count
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

function printArray(fishArray){
    for(var fishIndex in fishArray){
        var fish = fishArray[fishIndex]
        console.log(fish)
    }
}