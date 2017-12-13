import { AsyncStorage } from 'react-native'
import { CARD_DATA_STORAGE } from './_cardData'

// move to another util, to randomly select cards
function getRandomNumber (max) {
  return Math.floor(Math.random() * max) + 0
}

export function getAllDecks () {
  return AsyncStorage.getItem(CARD_DATA_STORAGE)
    .then((data) => {
      const parsedData = JSON.parse(data)
      return parsedData
    })
}

export function addDeckAndCard ({ card, deckTitle, startData }) {
  let updatedQuestions = startData[deckTitle] !== undefined
    ? [...startData[deckTitle]['questions'], card]
    : [card]
  // need to use setItem to add a card and deck, mergeItem is not working with iOS
  return AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({
    ...startData,
    [deckTitle]: {
      questions: updatedQuestions,
      title: deckTitle
    }
  }))
}

export function clearData () {
  return AsyncStorage.getItem(CARD_DATA_STORAGE)
    .then((result) => {
      let startData = result !== undefined
        ? result
        : {}
    })
  // AsyncStorage.removeItem(CARD_DATA_STORAGE)  //only use to reset the data
  AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify(startData))
}
