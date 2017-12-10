import { SELECT_CARD } from './selectCardAction'

function selectCardReducer (state = {}, action) {

  switch (action.type) {
    case SELECT_CARD :
      return {
        ...state,
        ...action.card,
      }
    default :
      return state
  }
}

export default selectCardReducer
