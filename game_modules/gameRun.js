// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const { randomInt } = require('crypto')

// Importation des variables et fonctions
const { hangmanDraw, notHangman } = require('./draw')
const { indice } = require('./indice')


const gameRun = (masterWord) => {
  // variables à initialiser
  let drawCounter = 0
  let triedLetters = []
  let haveAClue = false
  let isOver = false
  let message = ''
  let messageColor = ''
  let messageColorL = 50

  while (!isOver) {
    console.clear()
    // Couleur du message
    messageColorL = 50
    switch (message[0]) {
      case '0':
        messageColor = 0
        break
      case '1':
        messageColor = randomInt(360)
        break
      case '2':
        messageColor = 60
        break
      case '3':
        messageColorL = 0
        break
      case '4':
        messageColor = 120
        break
    }
    // interface avancée
    console.log(chalk.bold(`
        ----------------------------------------------------
            Erreur n°${drawCounter}/${hangmanDraw.length - 1} Lettres essayées : ${triedLetters}           
        ----------------------------------------------------`))
    console.log(chalk.bold.hsl(messageColor, 70, messageColorL)('         ' + message.slice(1)))
    // affichage du pendu & du mot
    console.log(chalk.bold.hsl(0, drawCounter * 10, 50)(hangmanDraw[drawCounter]))
    if (drawCounter === hangmanDraw.length - 1) {
      console.log(chalk.bold.hsl(0, drawCounter * 10, 50)('Il ne... Il est mort...\n'))
    } else {
      console.log(chalk.bold.hsl(0, drawCounter * 10, 50)('Il ne doit pas se faire pendre !\n'))
    }
    // dernier essaie
    if (drawCounter === hangmanDraw.length - 2) {
      console.log(chalk.red.bold('ATTENTION IL TE RESTE UNE SEULE CHANCE !!'))
    }
    let displayLetter = ''
    for (let elem of masterWord) {
      displayLetter += elem[1] ? `${elem[0]} ` : '_ '
    }
    console.log(displayLetter)

    // Game Over
    if (drawCounter === hangmanDraw.length - 1 || drawCounter === hangmanDraw.length) {
      console.log(chalk.bold.rgb(200, 0, 0)(`Désolé mais le jeu est perdu...`))
      console.log(chalk.bold(`\nLe mot à trouver était : ${masterWord.map((elem) => elem[0]).join('')}\n`))
      return 0
    }

    // Choix de la lettre
    console.log('\nTape "out" pour abandonner. \nTape "!" pour faire un espace.\nTape "*" pour avoir un indice.')
    let letter = readline.question(chalk.bold('Devine une lettre ? '))
    console.log('-------------------------------------------------\n')
    if (letter.length === 0) {
      message = `1OUPS ! Tu n'as rien mis`
      continue
    }
    // Choix d'un indice
    if (letter === '*') {
      if (!haveAClue) {
        indice(masterWord)
        readline.keyIn('As tu noté l\'indice ?')
        haveAClue = true
      } else {
        message = `2Tu as déjà eu un indice petit malin !`
      }
      continue
    }

    letter = letter.toLowerCase()
    // Choix d'abandonner
    if (letter === 'out') {
      console.log(chalk.bold(`\nLe mot était "${masterWord.map((elem) => elem[0]).join('')}"`))
      console.log(chalk.bold('\nA la prochaine !\n'))
      process.exit(1)
    }
    // Lettre déjà essayée
    if (triedLetters.includes(letter)) {
      message = `3Tu as déjà essayé le "${letter.toUpperCase()}"`
      continue
    }
    // Choix d'un espace
    if (letter === '!') { letter = ' ' }

    // Verification de la lettre & remplacement le cas écheant
    let isFind = false
    for (let elem of masterWord) {
      if (elem[0] === letter.toUpperCase()) {
        elem[1] = true
        isFind = true
      }
    }

    // Verdict de l'essaie
    if (isFind) {
      message = `4Bien joué tu as trouver une lettre !`
      triedLetters.push(letter)
    } else if (letter.length !== 1) {
      message = `0On t'as dit une lettre, "${letter}" ça fait ${letter.length} lettres ! Tampis le pendu avance ! `
      masterWord.length <= 4 ? drawCounter += 2 : drawCounter++
    } else if (!isNaN(letter)) {
      message = `0On t'as dit une lettre, "${letter}" c'est un chiffre ! Tampis le pendu avance !`
      masterWord.length <= 4 ? drawCounter += 2 : drawCounter++
    } else {
      message = `0Non ce n'est pas un "${letter.toUpperCase()}"... Le pendu avance...`
      triedLetters.push(letter)
      masterWord.length <= 4 ? drawCounter += 2 : drawCounter++
    }

    // Victoire
    let goodLetter = 0
    for (let elem of masterWord) {
      if (elem.includes(true)) {
        goodLetter++
      }
    }
    if (goodLetter === masterWord.length) {
      console.clear()
      console.log(chalk.bold.rgb(40, 200, 40)(notHangman))
      console.log(chalk.magenta.bold(`\nLe mot : ${masterWord.map((elem) => elem[0]).join('')}`))
      console.log(chalk.bold.rgb(40, 200, 40)(`Bravo tu as deviné le mot mystère !`))
      return [10 - drawCounter, haveAClue]
    }
  }
}

// Exportation de la fonction
exports.gameRun = gameRun