// Importation des packages
const chalk = require('chalk')
const readline = require('readline-sync')
const { randomInt } = require('crypto')

// Importation des fonctions et variables
const dico = require('./dico')


// La fonction retourne le mot qui sera à deviner
const wordSelection = () => {
  let isSelected = false
  let dictionary = []
  let difficulty = 0
  let lang = 0
  console.log('Quelle difficulté voulez-vous ?')
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
    const HARDNESS = ['facile', 'moyen', 'difficile']
    let hardnessChoice = readline.keyInSelect(HARDNESS)
    switch (hardnessChoice) {
      case 0:
        // Choisit des mots entre 3 et 5 lettres
        dictionary = dico.ajustDictionary(3, 5, selectedDico)
        isSelected = true
        difficulty = 1
        break
      case 1:
        // Choisit des mots entre 5 et 8 lettres
        dictionary = dico.ajustDictionary(5, 8, selectedDico)
        isSelected = true
        difficulty = 1.2
        break
      case 2:
        // Choisit des mots de plus de 8 lettres
        dictionary = dico.ajustDictionary(8, 20, selectedDico)
        isSelected = true
        difficulty = 1.5
        break
      default:
        let isOver = readline.keyInYN('Voulez-vous arrêter ?')
        if (isOver) {
          console.log(chalk.bold('\nA la prochaine !\n'))
          process.exit(0)
        } else {
          console.log('Veuillez sélectionner la difficulté :')
        }
    }
  }
  return [dictionary[randomInt(dictionary.length)], difficulty, lang]
}

// Exportation de la fonction 
exports.wordSelection = wordSelection