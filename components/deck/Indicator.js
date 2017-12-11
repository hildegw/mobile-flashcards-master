import React from 'react'
import { View, StyleSheet, TouchableOpacity } from 'react-native'
import { green, greenLight, orange } from '../../utils/colors'

export default function Indicator ({ numberOfQuestions, index, onPress }) {
  let helpArray = []
  for (i = 0; i < numberOfQuestions; i++) {
    helpArray.push(i)
  }
  // let helpArray = Array.from(Array(numberOfQuestions).keys()) //does not work in Android

  return (

    <View style={styles.container} >
      {helpArray.map((item) =>
        <View
          style={[styles.miniButton, (item === index) && {backgroundColor: green}]}
          key={item} />)}

      <TouchableOpacity
        style={[styles.miniButton, {backgroundColor: orange}]}
        onPress={onPress} />

    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    overflow: 'scroll',
    flexWrap: 'wrap',
    marginLeft: 55,
    marginRight: 55
  },
  miniButton: {
    margin: 5,
    width: 20,
    height: 20,
    backgroundColor: greenLight,
    borderRadius: 100,
    justifyContent: 'center',
    alignSelf: 'center'
  }
})
