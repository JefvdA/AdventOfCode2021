import fs from 'fs'

var array = fs.readFileSync('./input/day5.txt').toString().split("\n")


var diagram = createDiagram(array)
var dangerousSpotsCount = countDangerousSpots(diagram)
printDiagram(diagram)
console.log("There are " + dangerousSpotsCount + " points too dangerous")


function createDiagram(array){
    // Find max dimension for the diagram
    var maxDimension = getMaxDimension(array)

    // Create empty diagram for start
    var diagram = createEmtpyDiagram(maxDimension)

    // Update diagram for each line
    for(var lineIndex in array){
        var [coords1, coords2] = getCoords(array, lineIndex)
    
        var x1 = parseInt(coords1.split(",")[0])
        var y1 = parseInt(coords1.split(",")[1])
    
        var x2 = parseInt(coords2.split(",")[0])
        var y2 = parseInt(coords2.split(",")[1])
    
        // Horizontal & vertical lines
        if(x1 < x2 && y1 == y2){
            for(var x = x1; x <= x2; x++)
                diagram[y1][x] += 1
        }
        else if(x1 > x2 && y1 == y2){
            for(var x = x2; x <= x1; x++)
                diagram[y1][x] += 1
        }
    
        if(y1 < y2 && x1 == x2){
            for(var y = y1; y <= y2; y++)
                diagram[y][x1] += 1
        }
        else if(y1 > y2 && x1 == x2){
            for(var y = y2; y <= y1; y++)
                diagram[y][x1] += 1
        }

        // Diagonal lines
        if(x1 < x2 && y1 < y2) {
            var x = x1
            for(var y = y1; y <= y2; y++){
                diagram[y][x++] += 1
            }      
        }
        if(x1 < x2 && y1 > y2) {
            var x = x2
            for(var y = y2; y <= y1; y++){
                diagram[y][x--] += 1
            }      
        }

        if(x1 > x2 && y1 < y2) {
            var x = x1
            for(var y = y1; y <= y2; y++){
                diagram[y][x--] += 1
            }      
        }
        if(x1 > x2 && y1 > y2) {
            var x = x2
            for(var y = y2; y <= y1; y++){
                diagram[y][x++] += 1
            }      
        }
    }

    // Return newly created diagram
    return diagram
}

function createEmtpyDiagram(maxDimension){
    var diagram = []

    for(var y = 0; y < maxDimension; y++){
        diagram[y] = []
        for(var x = 0; x < maxDimension; x++){
            diagram[y][x] = 0
        }
    }

    return diagram
}

function printDiagram(diagram){
    for(var y = 0; y < diagram.length; y++){
        for(var x in diagram[y])
            if(diagram[y][x] == 0)
                diagram[y][x] = '.'
        console.log(diagram[y].join(''))
    }
}

function getCoords(array, index){
    var line = array[index]

    var coords1 = line.split("->")[0].trim()
    var coords2 = line.split("->")[1].trim()

    return [coords1, coords2]
}

function getMaxDimension(array){
    var maxDimension = 0

    for(var lineIndex in array){
        var [coords1, coords2] = getCoords(array, lineIndex)

        var x1 = parseInt(coords1.split(",")[0])
        var y1 = parseInt(coords1.split(",")[1])

        var x2 = parseInt(coords2.split(",")[0])
        var y2 = parseInt(coords2.split(",")[1])

        if(x1 > maxDimension)
            maxDimension = x1
        if(x2 > maxDimension)
            maxDimension = x2
        if(y1 > maxDimension)
            maxDimension = y1
        if(y2 > maxDimension)
            maxDimension = y2
    }

    return parseInt(maxDimension)+1
}

function countDangerousSpots(diagram){
    var ventCount = 0

    for(var y in diagram){
        for(var x in diagram[y]){
            var number = parseInt(diagram[y][x])
            if(number > 1)
                ventCount++
        }
    }

    return ventCount
}