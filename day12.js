import fs from 'fs'

var input = fs.readFileSync('./input/day12.txt').toString().split("\n")

// Define class for a point
class Point {
    constructor(name){
        this.name = name
        this.destinations = []
    }

    addDestination(destination){
        this.destinations.push(destination)
    }

    toString(){
        var str = "Name : " + this.name + " Destinations: "
        for(var pointIndex in this.destinations){
            var point = this.destinations[pointIndex]
            str += point.name + " / "
        }
        return str + "\n"
    }
}

// Create array with all the points
var points = []
for(var lineIndex in input){
    var line = input[lineIndex].trim()

    var from = line.split("-")[0]
    var to = line.split("-")[1]

    // Check if "from" exists, if not, create point for it
    var fromPoint = points.filter(point => point.name == from)[0]
    if(fromPoint == undefined) {
        fromPoint = new Point(from)
        points.push(fromPoint)
    }

    // Check if "to" exists, if not, create point for it
    var toPoint = points.filter(point => point.name == to)[0]
    if(toPoint == undefined){
        toPoint = new Point(to)
        points.push(toPoint)
    }

    // Add "to" as destination to "from"
    fromPoint.addDestination(toPoint)
    if(fromPoint.name != "start" && fromPoint.name)
        toPoint.addDestination(fromPoint)
}
var startPoint = points.filter(point => point.name == "start")[0] // Find the starting point

// PART 1
var pathsV1 = FindPathsV1(startPoint, [], "", []) // Begin of FindPaths, with default values and the startingPoint
console.log("V1: There are " + pathsV1.length + " possible ways to go through the caves")

// PART 2
var pathsV2 = FindPathsV2(startPoint, [], false, "", []) // Begin of FindPaths, with default values and the startingPoint
console.log("V2: There are " + pathsV2.length + " possible ways to go through the caves")

// Recursive function to find the possible paths through the caves - PART 1
function FindPathsV1(point, visitedSmallCaves, currentPath, paths){
    currentPath += point.name // Add new point to the path

    // Copy items of visitedSmallCaves so that the values aren't overwritten
    var smallCaves = []
    for(var caveIndex in visitedSmallCaves){
        smallCaves.push(visitedSmallCaves[caveIndex])
    }

    if(smallCaves.includes(point.name)) // Check if point isn't already been visisted as a small cave
        return
    if(point.name == "end") // Check if we reached the end
        return paths.push(currentPath)

    if(point.name == point.name.toLowerCase())
        smallCaves.push(point.name)

    for(var destinationIndex in point.destinations){
        var destination = point.destinations[destinationIndex]

        FindPathsV1(destination, smallCaves, currentPath, paths)
    }
    return paths
}

// Recursive function to find the possible paths through the caves - PART 2
function FindPathsV2(point, visitedSmallCaves, specialCaveVisited, currentPath, paths){
    if(point.name == "start" && currentPath.includes("start"))
        return

    currentPath += point.name // Add new point to the path

    // Copy items of visitedSmallCaves so that the values aren't overwritten
    var smallCaves = []
    for(var caveIndex in visitedSmallCaves){
        smallCaves.push(visitedSmallCaves[caveIndex])
    }

    if(smallCaves.includes(point.name)) // Check if point isn't already been visisted as a small cave
        if(!specialCaveVisited)
            specialCaveVisited = true
        else
            return
    if(point.name == "end") // Check if this is the end
        return paths.push(currentPath)

    if(point.name == point.name.toLowerCase())
        smallCaves.push(point.name)

    for(var destinationIndex in point.destinations){
        var destination = point.destinations[destinationIndex]

        FindPathsV2(destination, smallCaves, specialCaveVisited, currentPath, paths)
    }
    return paths
}

// A function that prints the points in a more visual way
function printPoints(points){
    for(var pointIndex in points){
        var point = points[pointIndex]
        console.log(point.toString())
    }
}