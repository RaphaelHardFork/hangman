// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const fs = require('fs')

// Importation des fonctions
const { wordSelection } = require('./wordSelection')
const { game } = require('./gameV2')


// Acceuil du jeu
console.log(`


+---------------------------------------------+
|                                             |
|       Bienvenue dans le jeu du pendu        |
|                                             |
+---------------------------------------------+

`)

// Score précédent
let displayScore = fs.readFileSync('./score.json', 'utf-8')
console.log(displayScore)


// Initiation de la partie
let isStarted = readline.keyInYN(chalk.bold('On commence la partie ?'))
if (!isStarted) {
  console.log(chalk.bold('\nA la prochaine !\n'))
  process.exit(0)
}

let username = readline.question('\nInscrit ton nom : ')

// Sélection de la difficulté (et du mot)
let magicWord = wordSelection()


// Le jeu 
let score = game(magicWord)


// Enregistrement du score dans un fichier
let output = `{
  "username": "${username}",
  "score": "${score}"
}\n`

fs.appendFileSync('score.json', output)