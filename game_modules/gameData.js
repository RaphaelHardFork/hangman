// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const { randomInt } = require('crypto')

// Importation des fonctions et variables
const dico = require('./dico')


// La fonction retourne le mot qui sera à deviner
const gameData = () => {
  let isSelected = false
  let dictionary = []
  let lang = 0
  console.log('Choisissez dans quelle langue sera le mot ?')
  while (!isSelected) {
    // Choisir la langue du dictionnaire
    const LANG = ['Français', 'Anglais']
    let langChoice = readline.keyInSelect(LANG)
    let selectedDico = 0
    switch (langChoice) {
      case 0:
        selectedDico = dico.frenchDictionary
        lang = 'Français'
        break
      case 1:
        selectedDico = dico.englishDictionary
        lang = 'Anglais'
        break
      default:
        let isOver = readline.keyInYN('Voulez-vous arrêter ?')
        if (isOver) {
          console.log(chalk.bold('\nA la prochaine !\n'))
          process.exit(0)
        } else {
          console.log('Veuillez sélectionner la langue :')
          continue
        }
    }
    // Le mot est choisit en fonction de la difficulté voulu
    console.log('Quelle longueur de mots voulez-vous ?')
    const HARDNESS = ['Courte (2~4)', 'Moyenne (5~7)', 'Longue (8 et plus)']
    let hardnessChoice = readline.keyInSelect(HARDNESS)
    switch (hardnessChoice) {
      case 0:
        // Choisit des mots entre 2 et 4 lettres
        dictionary = dico.ajustDictionary(2, 4, selectedDico)
        isSelected = true
        break
      case 1:
        // Choisit des mots entre 5 et 7 lettres
        dictionary = dico.ajustDictionary(5, 7, selectedDico)
        isSelected = true
        break
      case 2:
        // Choisit des mots de plus de 8 lettres
        dictionary = dico.ajustDictionary(8, 20, selectedDico)
        isSelected = true
        break
      default:
        let isOver = readline.keyInYN('Voulez-vous arrêter ?')
        if (isOver) {
          console.log(chalk.bold('\nA la prochaine !\n'))
          process.exit(0)
        } else {
          console.log('Veuillez sélectionner la longueur :')
        }
    }
  }
  return [dictionary[randomInt(dictionary.length)], lang]
}

// Exportation de la fonction 
exports.gameData = gameData