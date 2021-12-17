import { Console } from 'console'
import fs from 'fs'

var array = fs.readFileSync('./input/testing.txt').toString().split("\n")

// var uniqueCount = 0
// for(var lineIndex in array){
//     var line = array[lineIndex]
//     var output = line.split("|")[1].trim().split(' ')

//     for(var numberIndex in output){
//         var number = output[numberIndex]
//         if(number.length == 2 || number.length == 4 || number.length == 3 || number.length == 7)
//             uniqueCount++
//     }
// }
// console.log("Times 1 4 7 8 appear in the output: " + uniqueCount)

var output = []
for(var lineIndex in array){
    var line = array[lineIndex]
    var wiring = line.split("|")[0].trim().split(' ')
    var output = line.split("|")[1].trim().split(' ')
    console.log("Wiring: " + wiring)

    var wireArray = ['', '', '', '', '', '', '', '', '', '']

    // find 1 4 7 8
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        switch(length){
            case 2:
                wireArray[1] = number
                break
            case 4:
                wireArray[4] = number
                break
            case 3:
                wireArray[7] = number
                break
            case 7:
                wireArray[8] = number
                break
        }
    }

    // find 6
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 6){
            if(sortString(findUnique(number + wireArray[1])) == sortString(wireArray[8]))
                wireArray[6] = number
        }
    }
    // find 0
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 6){
            if(sortString(findUnique(number + wireArray[4])) == sortString(wireArray[8]) && !(sortString(findUnique(number + wireArray[1])) == sortString(wireArray[8])))
                wireArray[0] = number
        }
    }
    // find 9
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 6){
            if(!(sortString(findUnique(number + wireArray[4])) == sortString(wireArray[8])) && !(sortString(findUnique(number + wireArray[1])) == sortString(wireArray[8])))
                wireArray[9] = number
        }
    }


    // find 2
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 5){
            if(sortString(findUnique(number + wireArray[9])) == sortString(wireArray[8]))
                wireArray[2] = number
        }
    }
    // find 5
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 5){
            if(sortString(findUnique(number + wireArray[2])) == sortString(wireArray[8]))
                wireArray[5] = number
        }
    }
    // find 3
    for(var numberIndex in wiring){
        var number = wiring[numberIndex]
        var length = number.length

        if(length == 5){
            if(!(sortString(findUnique(number + wireArray[2])) == sortString(wireArray[8])) && !(sortString(findUnique(number + wireArray[9])) == sortString(wireArray[8])))
                wireArray[3] = number
        }
    }
    console.log("WireArray: " + wireArray)

    // get output
    // var convertedOutput = []
    // for(var numberIndex in output){
    // }
    // console.log(convertedOutput)
}

function getSameCount(str1, str2) {
    let count = 0
    const obj = str2.split("")
    for(var str of str1){
      let idx = obj.findIndex(s => s === str)
      if(idx >= 0){
        count++
        obj.splice(idx, 1)
      }
    }
    return count
}

function findUnique(str){
    // The variable that contains the unique values
    let uniq = ""
     
    for(let i = 0; i < str.length; i++){
      // Checking if the uniq contains the character
      if(uniq.includes(str[i]) === false){
        // If the character not present in uniq
        // Concatenate the character with uniq
        uniq += str[i]
      }
    }
    return uniq
}

function sortString(str) {
    return str.split('').sort().join('')
}