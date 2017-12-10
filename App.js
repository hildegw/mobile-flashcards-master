import React from 'react';
import { View } from 'react-native';
import { createStore, combineReducers } from 'redux'
import { Provider } from 'react-redux'
import deckList from './components/deckList/deckListReducer'
import selectedCard from './components/deck/selectCardReducer'
import score from './components/deck/scoreReducer'
import { green, white, yellowLight } from './utils/colors'
import { setLocalNotification } from './utils/notifications'
import { MainNavigator, AppStatusBar } from './components/deckList/MainNavigator'


const reducer = combineReducers({
  deckList,
  selectedCard,
  score,
})

export default class App extends React.Component {

  componentDidMount () {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <AppStatusBar backgroundColor={green} barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    )
  }
}
