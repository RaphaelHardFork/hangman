// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')

// Importation des variables et fonctions
const { hangmanDraw } = require('./draw')


// Fonction pour ajouter les lettres
const game = (magicWord) => {
  // Variables à initier
  let drawCounter = 0
  let goodLetter = []
  let placeholder = '_ '
  magicWord = magicWord.split('')
  let displayLetters = []
  for (let i = 0; i < magicWord.length; i++) {
    displayLetters.push(placeholder)
  }

  // Démarrage de la boucle
  let isOver = false
  while (!isOver) {
    // Affichage du pendu
    console.log(chalk.bold.hsl(0, drawCounter * 10, 50)(hangmanDraw[drawCounter]))
    console.log(chalk.bold.hsl(0, drawCounter * 10, 50)('Ne le laisse pas se faire pendre !\n'))


    // Affichage des bonnes lettres
    console.log(`Le mot : ${displayLetters.join('')}`)

    // Dernier essaie
    if (drawCounter === hangmanDraw.length - 1) {
      console.log(chalk.bold.rgb(200, 0, 0)(`\nATTENTION IL TE RESTE UNE SEULE CHANCE !!\n`))
    }

    // Choix de la lettre
    console.log('\nTape "out" pour abandonner.')
    let letter = readline.question(chalk.bold('Devine la lettre ? '))

    // Verification de la lettre
    letter = letter.toLowerCase()
    // Choix d'abandonner
    if (letter === 'out') {
      console.log(chalk.bold('\nA la prochaine !\n'))
      process.exit(1)
    }
    // Réponse correcte ?
    let isFind = false
    for (let i = 0; i < magicWord.length; i++) {
      if (letter === magicWord[i]) {
        displayLetters[i] = letter.toUpperCase() + ' '
        isFind = true
      }
    }
    if (isFind) {
      console.log(chalk.bold.rgb(0, 200, 0)(`Bien joué tu as trouver une lettre !`))
    } else if (letter.length !== 1) {
      console.log(chalk.red(`On t'as dit une lettre, "${letter}" ça fait ${letter.length} lettres !\nTampis le pendu avance ! `))
      drawCounter++
    } else {
      console.log(chalk.red(`Non ce n'est pas un ${letter.toUpperCase()}...\nLe pendu avance...`))
      drawCounter++
    }

    // Game Over
    if (drawCounter === hangmanDraw.length) {
      console.log(chalk.bold.rgb(200, 0, 0)(`Désolé mais le jeu est perdu...`))
      console.log(chalk.bold(`\nLe mot à trouver était : ${magicWord.join('')}\n`))
      process.exit(0)
    }

    // Jeu gagné ?
    let count = 0
    for (let elem of displayLetters) {
      if (elem === '_ ') {
        count++
      }
    }
    if (count === 0) {
      isOver = true
    }
  }
  let score = ((8 - drawCounter) * 1.25) * 10
  console.log(chalk.bold(`\nLe mot : ${displayLetters.join('')}\n`))
  console.log(chalk.bold.rgb(0, 200, 0)(`Bravo tu as deviné le mot "${magicWord.join('')}" !\nTon score : ${score}/100`))
  return score
}


// Exportation de la fonction
exports.game = game