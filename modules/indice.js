// Importation des packages
const { randomInt } = require('crypto')
const chalk = require('chalk')

const indice = (magicWord, displayedLetters) => {
  let unfindLetter = []
  for (let elem of displayedLetters) {
    if (elem === '_ ') {
      unfindLetter.push(magicWord[displayedLetters.indexOf(elem)])
    }
  }
  let clueLetter = unfindLetter[randomInt(unfindLetter.length)]
  console.log(chalk.magenta.bold(`Indice:

  +---+
  | ${clueLetter.toUpperCase()} |
  +---+`))
}

exports.indice = indice