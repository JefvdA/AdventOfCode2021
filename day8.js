import { Console } from 'console'
import fs from 'fs'

var array = fs.readFileSync('./input/testing.txt').toString().split("\n")

var uniqueCount = 0
for(var lineIndex in array){
    var line = array[lineIndex]
    var output = line.split("|")[1].trim().split(' ')

    for(var numberIndex in output){
        var number = output[numberIndex]
        if(number.length == 2 || number.length == 4 || number.length == 3 || number.length == 7)
            uniqueCount++
    }
}
console.log("Times 1 4 7 8 appear in the output: " + uniqueCount)

var wireArray = ['', '', '', '', '', '', '', '', '', '']
for(var lineIndex in array){
    var line = array[lineIndex]
    var wiring = line.split("|")[0].trim().split(' ')

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
            case 6:
                if(getSameCount(wiring[1], number) == 4)
                    wireArray[6] = number
                else if(getSameCount(wiring[4], number) == 2)
                    wireArray[0] = number
                else
                    wireArray[9] = number
                break
            case 5:
                if(getSameCount(wiring[9], number) == 2)
                    wireArray[2] = number
                else if(getSameCount(wiring[6], number) == 5)
                    wireArray[5] = number
                else
                    wireArray[3] = number
                break
        }
    }
}

for(var numberIndex in wireArray){
    var number = wireArray[numberIndex]
    console.log(numberIndex + " : " + number)
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