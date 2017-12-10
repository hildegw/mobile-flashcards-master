import React from 'react'
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { green, grey, yellowLight } from '../../utils/colors'

export default function SelectButton ({ children, onPress, style = {} }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.textButton, style]} >
      <Text style={[styles.textButtonText, style]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  textButton: {
    backgroundColor: yellowLight,
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    margin: 10,
    marginTop: 40,
    borderRadius: 100,
    borderWidth: 2,
    borderColor: green,
    justifyContent: 'center',
    alignItems: 'center',
    width: 140,
  },
  textButtonText: {
    color: grey,
    fontSize: 16,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})
