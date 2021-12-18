import fs from 'fs'

var input = fs.readFileSync('./input/day9.txt').toString().split("\n")

// Create grid from puzzle input
var grid = []
for(var lineIndex in input){
    var line = input[lineIndex].trim()
    
    var row = line.split('')
    grid.push(row)
}


class Point {
    constructor(x, y){
        this.x = x
        this.y = y
    }

    getNumber(){
        var number = grid[this.y] != undefined ? grid[this.y][this.x] : undefined

        return number
    }
}


// Find low points
var lowPoints = []
for(var y = 0; y < grid.length; y++){
    for(var x = 0; x < grid[y].length; x++){
        var number = grid[y][x]
        var left = grid[y][x-1]
        var right = grid[y][x+1]
        var up = grid[y-1] != undefined ? grid[y-1][x] : undefined
        var down = grid[y+1] != undefined ? grid[y+1][x] : undefined

        if((left > number || left == undefined) && (right > number || right == undefined) && (up > number || up == undefined) && (down > number || down == undefined)){
            lowPoints.push(new Point(x, y, number))
        }
    }
}


// PART 1
// Loop through grid to find low points
var riskLevel = 0
for(var pointIndex in lowPoints){
    var point = lowPoints[pointIndex]

    riskLevel += parseInt(lowPoints[pointIndex].getNumber(), 10) + 1
}
console.log("The total risklevel for the caves is " + riskLevel)

// PART 2
// Find 3 biggest basins
var basins = []
for(var pointIndex in lowPoints){
    var point = lowPoints[pointIndex]

    basins.push(GetBasin(grid, point, []))
}

// Get output
var top3 = basins.sort((a, b) => b.length - a.length).slice(0, 3)
var product = 0
for(var basinIndex in top3){
    var basin = top3[basinIndex]
    var length = basin.length

    product *= length

    if(product == 0)
        product = length
}
console.log("Size top3 multiplied = " + product)

function GetBasin(grid, point, basin){
    if(point.getNumber() == undefined || point.getNumber() == 9)
        return

    basin.push(point)

    var left = new Point(point.x-1, point.y)
    var right = new Point(point.x+1, point.y)
    var up = new Point(point.x, point.y-1)
    var down = new Point(point.x, point.y+1)

    if(!pointExists(basin, right) && (right.number != undefined || right.number != 9))
        GetBasin(grid, right, basin)
    if(!pointExists(basin, down) && (down.number != undefined || down.number != 9))
        GetBasin(grid, down, basin)
    if(!pointExists(basin, left) && (left.number != undefined || left.number != 9))
        GetBasin(grid, left, basin)
    if(!pointExists(basin, up) && (up.number != undefined || up.number != 9))
        GetBasin(grid, up, basin)

    return basin
}

function pointExists(basin, referencePoint){
    for(var pointIndex in basin){
        var point = basin[pointIndex]

        if(point.x == referencePoint.x && point.y == referencePoint.y)
            return true
    }
    return false
}