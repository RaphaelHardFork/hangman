// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')

// Importation des variables et fonctions
const { hangmanDraw } = require('./draw')


// Fonction pour ajouter les lettres
const gameV1 = (magicWord) => {
  // Variables à initier
  let drawCounter = 0
  let goodLetter = []
  let placeholder = '_ '

  // Démarrage de la boucle
  let isOver = false
  while (!isOver) {
    // Affichage du pendu
    console.log(chalk.bold.hsl(0, drawCounter * 10, 50)(hangmanDraw[drawCounter]))
    console.log(chalk.bold.hsl(0, drawCounter * 10, 50)('Ne le laisse pas se faire pendre !\n'))

    // Affichage des bonnes lettres
    let strToGuess = ''
    for (let elem of goodLetter) {
      strToGuess += elem + ' '
    }
    console.log(`\nLe mot : ${strToGuess}${placeholder.repeat(magicWord.length - goodLetter.length)}
    `)

    // Choix de la lettre
    console.log('\nTape "out" pour abandonner.')
    let letter = readline.question(chalk.bold('Devine la lettre ? '))

    // Verification de la lettre
    letter = letter.toLowerCase()
    if (letter === magicWord[goodLetter.length]) {
      console.log(chalk.bold.rgb(0, 200, 0)(`Bien joué tu as trouver une lettre !`))
      goodLetter.push(letter.toUpperCase())
    } else if (letter === 'out') {
      console.log(chalk.bold('\nA la prochaine !\n'))
      process.exit(1)
    } else if (letter.length !== 1) {
      console.log(chalk.red(`On t'as dit une lettre, "${letter}" ça fait ${letter.length} lettres !\nTampis le pendu avance ! `))
      drawCounter++
    } else {
      console.log(chalk.red(`Non ce n'est pas un ${letter}...\nLe pendu avance...`))
      drawCounter++
    }

    // Game Over et dernier essaie
    if (drawCounter === hangmanDraw.length - 1) {
      console.log(chalk.bold.rgb(200, 0, 0)(`\nATTENTION IL TE RESTE UNE SEULE CHANCE !!\n`))
    }
    if (drawCounter === hangmanDraw.length) {
      console.log(chalk.bold.rgb(200, 0, 0)(`Désolé mais le jeu est perdu...`))
      process.exit(0)
    }

    // Jeu gagné
    if (goodLetter.length === magicWord.length) {
      let score = (8 - drawCounter) * 10
      console.log(chalk.bold.rgb(0, 200, 0)(`Bravo tu as deviné le mot "${magicWord}" !\nTon score : ${score}/80`))
      process.exit(0)
    }
  }
  return score
}

// Exportation de la fonction
exports.gameV1 = gameV1