import fs from 'fs'

var array = fs.readFileSync('./input/day7.txt').toString().split(",").map(item => { return parseInt(item, 10) })
array.sort((a, b) => a - b)

console.log(array.length)

var bestPositionConstant = calcBestPositionConstant()
var fuelCostConstant = calcConstantFuelCost(bestPositionConstant)

var bestPositionNew = calcBestPositionNew()
var fuelCostNew = calcNewFuelCost(bestPositionNew)

console.log("1) The crabs should go to position " + bestPositionConstant + " this costs the least amount of fuel, which is " + fuelCostConstant)
console.log("2) The crabs should go to position " + bestPositionNew + " this costs the least amount of fuel, which is " + fuelCostNew)

function calcBestPositionConstant(){
    var bestPosition = getMedian(array)
    return bestPosition
}

function calcConstantFuelCost(position){
    var fuelSum = 0
    for(var index in array){
        var item = array[index]

        var distance = Math.abs(item - position)

        fuelSum += distance
    }
    return fuelSum
}

function calcBestPositionNew(){
    var max = 0
    for(var index in array){
        if(array[index] > max)
            max = array[index]
    }

    console.log(max)

    var bestPosition = 0
    for(var i = 0; i < max; i++){
        if(calcNewFuelCost(bestPosition) > calcNewFuelCost(i))
            bestPosition = i
    }

    return bestPosition
}

function calcNewFuelCost(position){
    var fuelSum = 0
    for(var index in array){
        var item = array[index]

        var distance = Math.abs(item - position)

        fuelSum += getTriangleNumber(distance)
    }
    return fuelSum
}

function printArray(array){
    console.log(array.join(','))
}

function getMedian(arr) {
    let middle = Math.floor(arr.length / 2)
    arr = [...arr].sort((a, b) => a - b)
    return arr.length % 2 !== 0 ? arr[middle] : (arr[middle - 1] + arr[middle]) / 2
}

function getTriangleNumber(n){
    //base case
    if(n == 0 || n == 1){
        return 1;
    //recursive case
    }else{
        return n + getTriangleNumber(n-1);
    }
} 