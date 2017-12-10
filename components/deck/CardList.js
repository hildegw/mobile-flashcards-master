import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList, Dimensions } from 'react-native'
import { connect } from 'react-redux'
import { grey, greenBack, yellowLight, green, orangeLight, orange } from '../../utils/colors'
import { dataSelectDeck } from '../../utils/_cardData'
import SelectButton from './SelectButton'
import Indicator from './Indicator'
import Score from './Score'
import Card from './Card'
import { selectCard } from './selectCardAction'
import { scoreCounter } from './scoreAction'
import { clearNotifications, setLocalNotification } from '../../utils/notifications'

class CardList extends Component {

  state = {
    correctAnswers: [],
    selectedDeck: {},
    numberOfQuestions: 0,
    scoreAdded: 0,
  }

  static navigationOptions = ({ navigation }) => {
    const { title } = navigation.state.params
    return { title: title + ' questions' }
  }

  componentDidMount() {
    //set selectedCard prop via action
    this.props.selectCard({index: 0})
    //determine the number of cards in the deck and set as state
    const { title } = this.props.navigation.state.params
    const { deckList } = this.props
    const selectedDeck = dataSelectDeck(deckList.startData, title)
    const numberOfQuestions = selectedDeck.questions.length
    this.setState({ selectedDeck: selectedDeck, numberOfQuestions: numberOfQuestions})
    //set correctAnswers to false for all cards
    const correctAnswers = []
    for (i=0; i<numberOfQuestions; i++) {correctAnswers.push(false)}
    this.setState({ correctAnswers: correctAnswers})
    //bind props to functions
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    this.onPressButton = this.onPressButton.bind(this)
    this.onViewableItemsChanged = this.onViewableItemsChanged.bind(this)
    //reset score counter in store
    this.props.scoreCounter(0)
  }

  onViewableItemsChanged (items) {
    let viewableCardIndex = -1
    if (items !== undefined && items.viewableItems.length > 0) {
      viewableCardIndex = items.viewableItems.shift().key
    }
    this.props.selectCard({index: viewableCardIndex})
  }

  onPressButton (type) {
    //keep track of which questions were answered correctly, or not
    const { index } = this.props.selectedCard
    const { correctAnswers } = this.state
    let newAnswers = []
    type === 'correct'
      ? newAnswers = correctAnswers.map((item, idx) => index === idx ? true : item)
      : newAnswers = correctAnswers.map((item, idx) => index === idx ? false : item)
    this.setState({ correctAnswers: newAnswers })
    //set score in store state
    if (newAnswers.length > 0) {
      const score = newAnswers.filter(answer => answer).length
      this.props.scoreCounter(score)
    }
  }

  onPressIndicator () {
    this.refs.flatList.scrollToEnd()
  }

  renderScore = () => {
    //reset daily notification
    clearNotifications().then(setLocalNotification)
    //calculate and render score result
    const deviceWidth = Dimensions.get('window').width
    const { selectedDeck, numberOfQuestions } = this.state
    return (
      <View style={[styles.scoreContainer, {width: deviceWidth-40}]}>
        <Text style={[styles.text, {fontSize: 32}, {fontWeight: 'bold'}]} >
          {selectedDeck.title}
        </Text>
        {numberOfQuestions === 1
          ?   <Text style={styles.scoreActionext}>
                {numberOfQuestions} card
              </Text>
          :   <Text style={styles.scoreText}>
                {numberOfQuestions} cards
              </Text>
        }

        <Score
          numberOfQuestions={this.state.numberOfQuestions}>
        </Score>
      </View>
    )
  }

  render() {
    const { navigate, goBack } = this.props.navigation
    const { deckList, selectedCard, score } = this.props
    const { numberOfQuestions, selectedDeck } = this.state
    const { correctAnswers } = this.state
    const cardAnsweredCorrectly = correctAnswers[selectedCard.index]
    const deviceWidth = Dimensions.get('window').width

    return (
      <View style={styles.container} >
        <FlatList
          data = {selectedDeck.questions}
          ref='flatList'
          renderItem = {(({item}) =>
            <Card
              question={item.question}
              answer={item.answer}
            />
          )}
          keyExtractor={(item, index) => index}
          showsHorizontalScrollIndicator={false}
          horizontal={true}
          pagingEnabled={true}
          onViewableItemsChanged={this.onViewableItemsChanged}
          ListFooterComponent={this.renderScore}
          getItemLayout={(data, index) => (
            {length: deviceWidth, offset: deviceWidth * index, index}
          )}
        />

        <Indicator
          key={selectedCard.index}
          index={selectedCard.index}
          onPress={() => this.onPressIndicator()}
          numberOfQuestions={numberOfQuestions} >
        </Indicator>

        {(selectedCard.index > -1)
          ?   <View>
                <View style={styles.buttonsInRow} >
                  <SelectButton
                    onPress={() => this.onPressButton('correct')}
                    children={' Correct '}
                    style={[cardAnsweredCorrectly && ({backgroundColor: greenBack})]} >
                  </SelectButton>
                  <SelectButton
                    onPress={() => this.onPressButton('incorrect')}
                    children={'Incorrect'}
                    style={[{borderColor: orange}, !cardAnsweredCorrectly && ({backgroundColor: orangeLight})]} >
                  </SelectButton>
                </View>
              </View>
          :   <View style={styles.buttonsInRow} >
                  <SelectButton
                    onPress={() => navigate('Deck', { title: selectedDeck.title })}
                    children={'Go to Deck'} />
                  <SelectButton
                    onPress={() => navigate('CardList', { title: selectedDeck.title })}
                    children={'Restart'}
                    style={{borderColor: orange}} />
              </View>
        }

      </View>
      )}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: yellowLight,
  },
  buttonsInRow:{
    marginBottom: 60,
    flexDirection: 'row',
  },
  scoreContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: yellowLight,
    borderRadius: 20,
    margin: 20,
    paddingTop: 60,
  },
  scoreText: {
    fontSize: 20,
    color: grey,
    paddingTop: 10,
  },
})

const mapStateToProps = (state) => (state)

export default connect(
  mapStateToProps,
  { selectCard, scoreCounter }
)(CardList)
