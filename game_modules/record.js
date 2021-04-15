// Importation des packages
const chalk = require('chalk')

// Affichage du score
const displayScore = (topTwenty) => {
  // topFive est un tableau d'objet
  console.log(`
+------------------+
|      SCORES      |
+------------------+

TOP 20 :`)
  let color = 170
  for (let elem of topTwenty) {
    console.log(chalk.bold.hsl(color, 70, 40)(`${elem.username}: ${elem.score} (${elem.masterWord})`))
    color = (color - 10) % 360
  }
}

// Mise à jour du score (dans l'ordre)
const updateScore = (topFive) => {
  topFive.sort((a, b) => {
    if (a.score > b.score) {
      return -1
    }
    if (a.score < b.score) {
      return 1
    }
    return 0
  })
  return topFive
}

// Ajout d'un nouveau record
const newScore = (topFive, output) => {
  let newTopFive = []
  // inférieur à 5
  if (topFive.length < 5) {
    topFive.push(output)
    return topFive
    // supérieur à 5
  } else {
    for (let elem of topFive.slice(0, -1)) {
      newTopFive.push(elem)
    }
    newTopFive.push(output)
    return newTopFive
  }
}

// Exportation de la fonction 
exports.displayScore = displayScore
exports.updateScore = updateScore
exports.newScore = newScore