const fs = require('fs')


let username = 'Raph'
let score = 80
let difficulty = 1.5

let output = {
  "username": username,
  "score": score,
  "difficulty": difficulty
}

console.log(JSON.stringify(output))


//PArse
const json = fs.readFileSync('./score.json', 'utf-8')
const extractedJSON = JSON.parse(json)
console.log(extractedJSON.topFive[0].score)

console.log(extractedJSON.topFive.sort((a, b) => {
  if (a.score > b.score) {
    return -1
  }
  if (a.score < b.score) {
    return 1
  }
  return 0
}))
