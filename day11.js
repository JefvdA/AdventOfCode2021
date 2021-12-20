import fs from 'fs'

var input = fs.readFileSync('./input/day11.txt').toString().split("\n")

// Create grid for all the squids
var grid = []
for(var lineIndex in input){
    var line = input[lineIndex].trim()

    grid.push(line.split(""))
}

// Define squid class
class Squid {
    constructor(x, y, energy){
        this.x = x
        this.y = y
        this.energy = energy
    }

    increaseEnergy(){
        this.energy++
    }
}

// Define squidGrid class
class SquidGrid {
    constructor(grid){
        this.reset(grid)
    }

    // Take 'n' amount of steps - returns # flashes that happened during the n steps
    takeStep(n){
        var flashes = 0

        for(var x = 0; x < n; x++){
            // Increase energy level of every octopus
            for(var squidIndex in this.squids){
                var squid = this.squids[squidIndex]
                squid.increaseEnergy()
            }

            // Flash octopuses with energy level > 9
            //  Because octopuses can only flash once, every step, we don't reset their energy levels yet
            //  And we only flash octopusses, who's energy levels == 10
            for(var squidIndex in this.squids){
                var squid = this.squids[squidIndex]

                if(squid.energy > 9){
                    flashes += this.flash(squid)
                }
            }

            // Reset all the energy levels from the squids that have flashed this step
            for(var squidIndex in this.squids){
                var squid = this.squids[squidIndex]

                if(squid.energy > 9 || squid.energy < 0)
                    squid.energy = 0
            }
        }

        return flashes
    }

    // Function to find the step all octopusses flash at the same time
    findRightMoment(){
        var rightStep = 0
        var momentFound = false
        while(!momentFound){
            rightStep++
            var flashes = this.takeStep(1)
            momentFound = flashes == this.squids.length
        }
        return rightStep
    }

    // Function to flash a squid - increase energy level for surrounding squids - returns # flashes that happened
    flash(squid){
        var flashes = 1

        squid.energy = -1

        var x = parseInt(squid.x)
        var y = parseInt(squid.y)

        var topLeft = this.squids.filter((item) => item.x == x-1 && item.y == y-1)[0]
        var topCenter = this.squids.filter((item) => item.x == x && item.y == y-1)[0]
        var topRight = this.squids.filter((item) => item.x == x+1 && item.y == y-1)[0]
        var left = this.squids.filter((item) => item.x == x-1 && item.y == y)[0]
        var right = this.squids.filter((item) => item.x == x+1 && item.y == y)[0]
        var bottomLeft = this.squids.filter((item) => item.x == x-1 && item.y == y+1)[0]
        var bottomCenter = this.squids.filter((item) => item.x == x && item.y == y+1)[0]
        var bottomRight = this.squids.filter((item) => item.x == x+1 && item.y == y+1)[0]

        var surroundingSquids = [topLeft, topCenter, topRight, left, right, bottomLeft, bottomCenter, bottomRight]

        // Flash the surrounding squids
        for(var squidIndex in surroundingSquids){
            var squid = surroundingSquids[squidIndex]

            if(squid != undefined && squid.energy > 0){
                squid.increaseEnergy()

                if(squid.energy > 9)
                    flashes += this.flash(squid)
            }
        }

        return flashes
    }

    // Function to reset squidGrid to a given grid
    reset(grid){
        this.squids = this.generateArray(grid)
    }

    // Function to generate squids array based on given array
    generateArray(grid){
        var squids = []
        for(var y in grid){
            var column = grid[y]
            
            for(var x in column){
                var energy = column[x]
                squids.push(new Squid(x, y, energy))
            }
        }
        return squids
    }

    // Function to visualize the grid as shown on the AoC page
    visualizeGrid(){
        for(var y = 0; y < grid.length; y++){
            for(var squidIndex in this.squids){
                var squid = this.squids[squidIndex]
                if(squid.y == y)
                    process.stdout.write("" + squid.energy)
            }
            console.log()
        }
    }
}

var squidGrid = new SquidGrid(grid)
squidGrid.visualizeGrid() // Visualize grid

// PART 1
var flashes = squidGrid.takeStep(100)
console.log("After 100 steps, there have been " + flashes + " flashes")

// Reset the squidGrid for PART 2
squidGrid.reset(grid)

// PART 2
var rightStep = squidGrid.findRightMoment()
console.log("After step " + rightStep + " all squids will flash simultaneously")