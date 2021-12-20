import fs from 'fs'

var input = fs.readFileSync('./input/testing.txt').toString().split("\n")

class Point {
    constructor(name){
        this.name = name
        this.destinations = []
    }

    addDestination(destination){
        this.destinations.push(destination)
    }
}

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
    toPoint.addDestination(fromPoint)
}

for(var pointIndex in points){
    
}