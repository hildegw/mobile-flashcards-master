import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Text, View, StyleSheet, Dimensions } from 'react-native'
import { green, grey, yellowLight } from '../../utils/colors'

class Score extends Component {

  render () {
    const deviceWidth = Dimensions.get('window').width
    const { score, numberOfQuestions } = this.props
    const percentScore = (score === undefined || score ===0 || numberOfQuestions === 0)
      ? 0
      : Math.round(score/numberOfQuestions*100)

    return (
      <View style={[styles.container, {width: deviceWidth-40}]}>
        <View style={styles.indicator}>
          <Text style={styles.indicatorText} >
            {percentScore} %
          </Text>
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: yellowLight,
    borderRadius: 20,
    margin: 20,
  },
  indicator: {
    padding: 20,
    margin: 50,
    borderBottomWidth: 2,
    borderBottomColor: green,
    borderTopWidth: 2,
    borderTopColor: green,
    justifyContent: 'center',
    alignItems: 'center',
  },
  indicatorText: {
    color: grey,
    fontSize: 32,
    textAlign: 'center',
    fontWeight: 'bold',
  },
})

function mapStateToProps (state) {
  return state.score
}

export default connect(
  mapStateToProps,
)(Score)
