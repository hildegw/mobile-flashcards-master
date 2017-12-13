import React, { Component } from 'react'
import { View, Text, TextInput, StyleSheet, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { getAllDecks, addDeckAndCard } from '../../utils/cardApi'
import { grey, green, yellowLight, white, orange } from '../../utils/colors'
import { allDecks } from './deckListAction'
import SelectButton from '../deck/SelectButton'

const ADD_DECK = 'Add a new Deck'
const ADD_CARD = 'Add a new Card'

class AddDeckTitle extends Component {

  state = {
    deckTitle: '',
    question: '',
    answer: '',
    titleColor: green,
    questionColor: green,
    answerColor: green,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return title === ADD_DECK ? { title: title } : { title: ADD_CARD}
  }

  componentDidMount () {
    const { title } = this.props.navigation.state.params
    if (title !== ADD_DECK) this.setState({ deckTitle: title })
  }

  checkForInputError = () => {
    const { deckTitle, question, answer } = this.state
    let inputError = false
    if (deckTitle === '') {
      this.setState({ titleColor: orange})
      inputError = true
    } else {
      this.setState({ titleColor: green})
    }

    if (question === ''){
      this.setState({ questionColor: orange})
      inputError = true
    } else {
      this.setState({ questionColor: green})
    }

    if (answer === '') {
     this.setState({ answerColor: orange})
     inputError = true
    } else {
      this.setState({ answerColor: green})
    }

    return inputError
  }

  onPressAddCard = () => {
    const inputError = this.checkForInputError()
    let { startData } = this.props
    const { deckTitle, question, answer } = this.state
    const card = { question: question, answer: answer }
    /* AsyncStorage mergeItem is not working on iOS, therefore handing over
      original data set with all decks plus new questions to card API to setItem */
    if (!inputError)
      {
        if (startData === undefined) startData = []   //TODO check????
        addDeckAndCard ({ card, deckTitle, startData })
        //update startData state property with data from database
        getAllDecks().then((result) => {
          this.props.allDecks({startData: result})
        })
        this.refs['question'].clear()
        this.refs['answer'].clear()
        this.props.navigation.navigate('Deck', { title: deckTitle })
      }
  }

  render() {
    const deviceWidth = Dimensions.get('window').width
    const { deckTitle } = this.state

    return (
      <View style={styles.container}>

        <TextInput
          underlineColorAndroid='rgba(0,0,0,0)'
          style={[styles.textInput, {borderBottomColor: this.state.titleColor}, {width: deviceWidth-40}]}
          value={deckTitle}
          onChangeText={(value) => this.setState({deckTitle: value.trim()})}
          autoFocus={true}
          autoCapitalize={'words'}
          maxLength={50}
          placeholder={'new deck title'}
        />

        <Text style={styles.text}> Add a new deck</Text>

        <TextInput
          ref={'question'}
          underlineColorAndroid='rgba(0,0,0,0)'
          style={[styles.textInput, {borderBottomColor: this.state.questionColor}, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({question: value.trim()})}
          multiline={true}
          numberOfLines={5}
          placeholder={'new question'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> Add a new question</Text>

        <TextInput
          ref={'answer'}
          underlineColorAndroid='rgba(0,0,0,0)'
          style={[styles.textInput, {borderBottomColor: this.state.answerColor}, {width: deviceWidth-40}]}
          onChangeText={(value) => this.setState({answer: value.trim()})}
          multiline={true}
          placeholder={'new answer'}
          selectTextOnFocus={true}
        />

        <Text style={styles.text}> Add a new answer</Text>

        <View style={styles.buttonsInRow}>
          <SelectButton
            onPress={() => this.onPressAddCard()}
            children={'Add'}
            style={[{backgroundColor: 'transparent'}]} >
          </SelectButton>

          <SelectButton
            onPress={() => this.props.navigation.goBack()}
            children={'Discard'}
            style={[{borderColor: orange}, {backgroundColor: 'transparent'}]} >
          </SelectButton>
        </View>
      </View>

  )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    backgroundColor: yellowLight,
    padding: 20,
  },
  textInput: {
    margin: 5,
    marginBottom: 10,
    padding: 5,
    height: 40,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: green,
  },
  text: {
    color: grey,
    fontSize: 12,
    textAlign: 'justify',
    paddingLeft: 5,
    marginBottom: 20,
  },
  buttonsInRow:{
    flexDirection: 'row',
    justifyContent: 'center',
    margin: 40,
  }
})

function mapStateToProps (state) {
  return state.deckList
}

export default connect(
  mapStateToProps,
  { allDecks }
)(AddDeckTitle)
