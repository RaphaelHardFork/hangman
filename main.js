// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const fs = require('fs')

// Importation des fonctions, variables et class
const { wordSelection } = require('./wordSelection')
const { game } = require('./gameV2')
const record = require('./record')
const { UserData } = require('./infoClass')


// Acceuil du jeu
console.log(`


+---------------------------------------------+
|                                             |
|       Bienvenue dans le jeu du pendu        |
|                                             |
+---------------------------------------------+

`)

// Chargement du score précédent
let scoreSheet = `Il n'y a pas de record précédent.`
let recordOn = false
if (fs.existsSync('./score.json')) {
  scoreSheet = fs.readFileSync('./score.json', 'utf-8')
  scoreSheet = JSON.parse(scoreSheet)
  recordOn = true
}

// Affichage du score précédent
let viewScore = readline.keyInYN(chalk.bold('Voulez-vous voir les scores précédents ?'))
if (viewScore) {
  if (recordOn) {
    record.displayScore(scoreSheet.topFive)
  } else {
    console.log(scoreSheet)
  }
}

// Suppression des scores
if (recordOn) {
  let supScore = readline.question(chalk.bold('Pour effacer les scores écrivez : "delete"\n(Passer cette étape en appuyant sur Enter) '))
  if (supScore === 'delete') {
    fs.unlinkSync('./score.json')
    recordOn = false
  }
}


// Initiation de la partie
let isStarted = readline.keyInYN(chalk.bold('On commence la partie ?'))
if (!isStarted) {
  console.log(chalk.bold('\nA la prochaine !\n'))
  process.exit(0)
}


// Enregistrement de l'utilisateur
console.log('Appuie sur entrée pour passer cette étape')
let username = readline.question('\nInscrit ton nom : ')


// Sélection de la difficulté (et du mot)
let parameters = wordSelection()
let difficulty = ''
switch (parameters[1]) {
  case 1:
    difficulty = 'Facile'
    break
  case 1.2:
    difficulty = 'Moyen'
    break
  case 1.5:
    difficulty = 'Difficile'
    break
  default:
    difficulty = 'Non identifiée'
    break
}


// Le jeu 
let score = game(parameters[0])
score = score * parameters[1]
console.log((chalk.bold.rgb(0, 200, 0)(`Ton score : ${score}/150`)))


// Enregistrement du score dans un fichier
if (!username) {
  if (readline.keyInYN(console.log('Voulez-vous enregistrer votre score ?'))) {
    while (!username) {
      username = readline.question('Inscrivez votre nom : ')
    }
  }
}

// Génération des données sur la partie
let output = new UserData(username, score, difficulty)
console.log(output)


// Fichier de sauvegarde
if (!recordOn) {
  scoreSheet = {
    topFive: []
  }
  scoreSheet = JSON.stringify(scoreSheet)
  fs.writeFileSync('./score.json', scoreSheet)
  scoreSheet = fs.readFileSync('./score.json', 'utf-8')
  scoreSheet = JSON.parse(scoreSheet)
}

// Ajout et mise à jour de la feuille de score
let topFive = scoreSheet.topFive
topFive = record.newScore(topFive, output)
topFive = record.updateScore(topFive)


// Conversion variable vers JSON
let savedScoreSheet = JSON.stringify(scoreSheet)


// Ecriture du fichier
fs.writeFileSync('./score.json', savedScoreSheet)