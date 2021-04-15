const score = (play, masterWord) => {
  let [tryCount, clue] = play
  let wordLength = masterWord.length
  let multiplicateur = 1
  switch (wordLength) {
    case 2:
      clue ? multiplicateur = 1 : multiplicateur = 1.5
      break
    case 3:
      clue ? multiplicateur = 1 : multiplicateur = 1.5
      break
    case 4:
      clue ? multiplicateur = 1 : multiplicateur = 1.25
      break
    case 5:
      clue ? multiplicateur = 1 : multiplicateur = 1.125
      break
    case 6:
      clue ? multiplicateur = 1 : multiplicateur = 1
      break
    case 7:
      clue ? multiplicateur = 1.25 : multiplicateur = 1.125
      break
    case 8:
      clue ? multiplicateur = 1.25 : multiplicateur = 1.5
      break
    case 9:
      clue ? multiplicateur = 1.5 : multiplicateur = 1.75
      break
    default:
      clue ? multiplicateur = 1.5 : multiplicateur = 1.75
      break
  }
  return tryCount * multiplicateur
}

exports.score = score