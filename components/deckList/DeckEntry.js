import React, { Component } from 'react'
import { View, StyleSheet, Text, TouchableOpacity } from 'react-native'
import { grey, green, yellowLight } from '../../utils/colors'

export default class DeckEntry extends Component {

  onPress = () => {
    const { title, onPressItem, navigate } = this.props
    onPressItem(title, navigate)
  }

  render () {
    const { title, count } = this.props

    return (
      <TouchableOpacity onPress={this.onPress} >
        <View style={styles.item}>
          <Text style={{fontSize: 20}}>
            {title}
          </Text>
          {count === 1
            ?   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
                  {count} card
                </Text>
            :   <Text style={{fontSize: 16, color: grey, paddingTop: 10,}}>
                  {count} cards
                </Text>
          }
        </View>
      </TouchableOpacity>
  )}
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: yellowLight,
    marginLeft: 20,
    marginRight: 20,
    padding: 20,
    paddingLeft: 40,
    justifyContent: 'center',
    borderBottomWidth: 2,
    borderBottomColor: green,
  },
})
