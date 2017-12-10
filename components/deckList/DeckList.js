import React, { Component } from 'react'
import { View, Text, StyleSheet, FlatList } from 'react-native'
import DeckEntry from './DeckEntry'
import { getAllDecks } from '../../utils/cardApi'
import { setStartData, dataSelectDeckTitles } from '../../utils/_cardData'
import SelectButton from '../deck/SelectButton'
import { connect } from 'react-redux'
import { allDecks } from './deckListAction'
import { yellowLight, green, grey } from '../../utils/colors'

class DeckList extends Component {

  static navigationOptions = ({ navigation }) => {
    return { title: 'Mobile Flashcards' }
  }

  componentDidMount() {
    const start = setStartData() //just to have some example data
    getAllDecks().then((result) => {
      const { startData } = result
      this.props.allDecks({startData: startData})
    })
  }

  onPressItem(title, navigate) {
    navigate('Deck', { title: title })
  }

  renderAddDeckButton = () => {
    return (
      <View style={styles.button}>
        <SelectButton
          onPress={() => this.props.navigation.navigate('AddDeckTitle', {title: 'Add a new Deck'})}
          children={'Add Deck'}
        />
      </View>
    )
  }

  render() {
    const { startData } = this.props
    const listData = dataSelectDeckTitles(startData)

    return (
      <View style={styles.deckList}>
        { listData !== undefined &&
        <FlatList
          data = {listData}
          ref='flatList'
          renderItem = {(({item}) =>
            <DeckEntry
              title={item.key}
              count={item.count}
              onPressItem={this.onPressItem}
              navigate={this.props.navigation.navigate}
            />
          )}
          ListFooterComponent={this.renderAddDeckButton}
        />}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  deckList: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: yellowLight,
  },
  button:{
    flex: 1,
    alignItems: 'center',
    margin: 20,
  },
})

const mapStateToProps = ({ deckList }) => (deckList)


export default connect(
  mapStateToProps,
  { allDecks }
)(DeckList)
