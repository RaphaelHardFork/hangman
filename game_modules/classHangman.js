// Importation des packages

// Importations des fonctions & variables
const { gameData } = require('./gameData')
const { gameRun } = require('./gameRun')
const { score } = require('./score')

// Class du jeu 
class HangMan {
  constructor(score, difficulty, lang, masterWord) {
    this.score = score
    this.difficulty = difficulty
    this.lang = lang
    this.masterWord = masterWord
  }
  init() {
    [this.masterWord, this.lang] = gameData()
    this.difficulty = this.masterWord.length
    this.masterWord = this.masterWord.toUpperCase().split('').map((letter) => [letter, false])
    return [this.difficulty, this.lang, this.masterWord.map((letter) => [letter[0]]).join('')]
  }
  run() {
    let play = gameRun(this.masterWord)
    if (!play) {
      // Game over
      console.log('Tu as perdu !')
      return 0
    }
    this.score = score(play, this.masterWord)
    console.log(`Voici ton score : ${this.score}`)
    return this.score
  }
}

exports.HangMan = HangMan