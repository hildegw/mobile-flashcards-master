import { combineReducers } from 'redux'
import deckListReducer from '../components/deckList/deckListReducer'
import selectedCardReducer from '../components/deck/selectedCardReducer'

export default combineReducers({
  deckListReducer,
  selectedCardReducer,
})
