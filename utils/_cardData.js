import { AsyncStorage } from 'react-native'

export const CARD_DATA_STORAGE = 'MobileFlashcardsData'

export function setStartData () {
  const startData = {
    React: {
      title: 'React',
      questions: [
        {
          question: 'What is React?',
          answer: 'A library for managing user interfaces'
        },
        {
          question: 'Where do you make Ajax requests in React?',
          answer: 'The componentDidMount lifecycle event'
        },
        {
          question: 'Which type of states does React support?',
          answer: 'React handles local states in parent states.'
        },
      ]
    },
    JavaScript: {
      title: 'JavaScript',
      questions: [
        {
          question: 'What is a closure?',
          answer: 'The combination of a function and the lexical environment within which that function was declared.',
        }
      ]
    }
  }
  AsyncStorage.setItem(CARD_DATA_STORAGE, JSON.stringify({startData}))
  return startData
}

export function dataSelectDeckTitles (startData) {
  let listData = []
  if (startData !== undefined) {
    Object.keys(startData).map((title) => {
      let count = startData[title]['questions'].length
      listData.push({ 'key': title, 'count': count })
    })
  }
  return listData
}

export function dataSelectDeck (startData, title) {
  let selectedDeck = {}
  Object.keys(startData).map((item) => {
    if (item === title) selectedDeck = startData[item]
  })
  return selectedDeck
}
