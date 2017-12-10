export const ALL_DECKS = 'ALL_DECKS'
export const ADD_ENTRY = 'ADD_ENTRY'

export function allDecks (allDecks) {

  return {
    type: ALL_DECKS,
    allDecks,
  }
}

export function addEntry (entry) {
  return {
    type: ADD_ENTRY,
    entry,
  }
}
