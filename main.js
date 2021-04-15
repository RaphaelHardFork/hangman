// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const fs = require('fs')

// Importation des fonctions, class, et variables
const { displayScore, updateScore } = require('./game_modules/record')
const { HangMan } = require('./game_modules/classHangman')


// Acceuil du jeu
console.log(chalk.bold(`

+---------------------------------------------+
|                                             |
|       Bienvenue dans le jeu du pendu        |
|                                             |
+---------------------------------------------+

`))

// Chargement des scores (automatique)
let scoreSheet = `Il n'y a pas de record précédent.`
if (fs.existsSync('./score.json')) {
  let stats = fs.statSync('./score.json')
  if (stats.isFile) {
    scoreSheet = fs.readFileSync('./score.json', 'utf-8')
    scoreSheet = JSON.parse(scoreSheet)
  }
} else {
  scoreSheet
  fs.writeFileSync('./score.json', '{"topTwenty":[]}')
  scoreSheet = fs.readFileSync('./score.json', 'utf-8')
  scoreSheet = JSON.parse(scoreSheet)
}

// Affichage des scores (automatique)
if (scoreSheet.topTwenty.length === 0) {
  console.log(chalk.red('Il n\'y a pas encore de record.'))
} else {
  displayScore(scoreSheet.topTwenty)
}


// Voir le calcul du score
if (readline.keyInYN('Voulez-vous voir le barème du score ?')) {
  console.log(chalk.bold(`
+---------------------------------------------+
|                                             |
|              Calcul des scores              |
|                                             |
+---------------------------------------------+`))

  console.log(`
Nombre de lettres : 3  |   4  |   5   | 6 |   7  |  8   |  9+
Multiplicateur --------|------|-------|---|------|------|---------
Sans indice :      1.5 | 1.25 | 1.125 | 1 | 1.25 |  1.5 |  1.75  
Avec indice :       1  |  1   |   1   | 1 | 1.125|  1.25|  1.5`)
}


// Avec quel joueur commencer la partie ?
let oldPlayer = []
for (let elem of scoreSheet.topTwenty) {
  oldPlayer.push(`${elem.username} (${elem.score})`)
}
let username = ''
let previousScore = 0
let newPlayer = false

if (scoreSheet.topTwenty.length === 0) {
  // New Player
  while (!username) {
    username = readline.question('Inscrit ton nom : ')
    newPlayer = true
  }
  username = username.toUpperCase()
  // Choose player
} else {
  while (username === '' || username === -1) {
    username = readline.keyInSelect([...oldPlayer, 'Nouveau joueur ?'], 'Quelle joueur es-tu ?')
  }
  if (username === oldPlayer.length) {
    username = ''
    // New Player
    while (!username) {
      username = readline.question('Inscrit ton nom : ')
      newPlayer = true
    }
    username = username.toUpperCase()
  } else {
    previousScore = scoreSheet.topTwenty[username].score
    username = oldPlayer[username].slice(0, oldPlayer[username].indexOf('('))
  }
}


// Début du jeu
let play = true
let masterWord = ''
let score = 0
let difficulty = 0
let lang = 0
while (play) {
  let thisIsTheGame = new HangMan(score, difficulty, lang, masterWord)
  let data = thisIsTheGame.init()
  difficulty = data[0]
  lang = data[1]
  masterWord = data[2]
  score = thisIsTheGame.run()

  // Comparaison du score
  console.log(chalk.bold(`${username}`))
  if (score > previousScore) {
    if (previousScore === 0) {
      console.log(chalk.green(`Tu peut être fière de ton score : ${score}`))
    } else {
      console.log(chalk.green(`Vous avez battu votre ancien score (${previousScore})`))
    }
    // Overlap de l'ancien score
    if (!newPlayer) {
      let place = 0
      for (let elem of scoreSheet.topTwenty) {
        if (elem.username === username.trim()) {
          place = scoreSheet.topTwenty.indexOf(elem)
        }
      }
      scoreSheet.topTwenty.splice(place, place + 1)
    }
    // Enregistrement du score
    scoreSheet.topTwenty.push({ username: username, lang: lang, difficulty: difficulty, score: score, masterWord: masterWord })
    updateScore(scoreSheet.topTwenty)
  } else {
    console.log(chalk.yellow(`Vous n'avez pas battu votre ancien score (${previousScore})`))
    if (previousScore === 0) {
      console.log(chalk.bold(`Oui là c'est pas beau...`))
    }
  }

  // Votre classement
  if (score !== 0) {
    let place = 0
    for (let elem of scoreSheet.topTwenty) {
      if (elem.username === username) {
        place = scoreSheet.topTwenty.indexOf(elem)
      }
    }
    console.log(`Dans le classement, vous êtes ${place + 1}${place === 0 ? 'er' : 'ème'} !`)
  }


  // Rejouez une partie
  play = readline.keyInYN('Voulez-vous rejouer ?')
}
// Sauvegarde
fs.writeFileSync('./score.json', JSON.stringify(scoreSheet))