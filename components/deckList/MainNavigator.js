import React from 'react';
import { View, StatusBar } from 'react-native';
import { Constants } from 'expo'
import { green, white, yellowLight } from '../../utils/colors'
import { StackNavigator } from 'react-navigation'
import AddDeckTitle from './AddDeckTitle'
import Deck from '../deck/Deck'
import CardList from '../deck/CardList'
import DeckList from './DeckList'


function AppStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const MainNavigator = StackNavigator({
  Home: { screen: DeckList, cardStyle: {backgroundColor: yellowLight} },
  Deck: { screen: Deck },
  AddDeckTitle: { screen: AddDeckTitle },
  CardList: { screen: CardList }
  }, {
  navigationOptions: {
      headerTintColor: white,
      headerStyle: { backgroundColor: green },
      headerBackTitleStyle: { color: green }
    },
  },
)

export { MainNavigator, AppStatusBar }
