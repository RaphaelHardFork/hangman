// Importation des packages
const chalk = require('chalk')

// Affichage du score
const displayScore = (topFive) => {
  // topFive est un tableau d'objet
  console.log(`

+------------------+
|       SCORE      |
+------------------+

TOP 5 :`)

  for (let elem of topFive) {
    console.log(chalk.bold(` - ${elem.username} : ${elem.score} (${elem.difficulty} en ${elem.lang})`))
  }
  console.log('\n\n')
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