// Importation des packages
const { randomInt } = require('crypto')
const chalk = require('chalk')


const indice = (masterWord) => {
  let unfindLetters = masterWord.filter((elem) => elem.includes(false))
  let clueLetter = unfindLetters[randomInt(unfindLetters.length)]

  console.log(chalk.magenta.bold(`Indice:
  +---+
  | ${clueLetter[0]} |
  +---+`))
}

exports.indice = indice