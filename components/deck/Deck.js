import React, { Component } from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux'
import { grey, yellowLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import Score from './Score'
import SelectButton from './SelectButton'
import { scoreCounter } from './scoreAction'
import { allDecks } from '../deckList/deckListAction'
import { getAllDecks } from '../../utils/cardApi'


class Deck extends Component {

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' Deck'}
  }

  render() {
    const { startData } = this.props
    const { title } = this.props.navigation.state.params
    const selectedDeck = dataSelectDeck(startData, title)
    const numberOfQuestions = (selectedDeck['questions'] !== undefined)
      ? selectedDeck['questions'].length
      : 0
    const { navigate } = this.props.navigation

    return (
      <View style={styles.container}>
        <Text style={[styles.text, {fontSize: 32}, {fontWeight: 'bold'}]} >
          {selectedDeck.title}
        </Text>
        {numberOfQuestions === 1
          ?   <Text style={styles.text}>
                {numberOfQuestions} card
              </Text>
          :   <Text style={styles.text}>
                {numberOfQuestions} cards
              </Text>
        }

        <Score numberOfQuestions={numberOfQuestions} />

        <View style={styles.buttonsInRow} >
          <SelectButton
            onPress={() => this.props.navigation.navigate('AddDeckTitle', {title: title})}
            children={'Add Card'}
          />

          <SelectButton
            onPress={() => navigate(
              'CardList',
              { title: selectedDeck.title }
            )}
            children={'Start Quiz'}
            style={[{borderColor: orange}]}
          />
        </View>
      </View>

  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: yellowLight,
    padding: 20,
    paddingTop: 60,
  },
  text: {
    fontSize:20,
    color: grey,
    paddingTop: 10,
  },
  buttonsInRow:{
    flexDirection: 'row',
    margin: 40,
  }
})

function mapStateToProps (state) {
  return state.deckList
}

export default connect(
  mapStateToProps,
  { scoreCounter, allDecks }
)(Deck)
