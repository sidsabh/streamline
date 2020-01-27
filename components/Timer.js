import React from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default class Timer extends React.Component {
	render() {
		return (
      <View style={styles.timerContainer}>
			<Text style={styles.timer}>{this.props.currentTime}</Text>
      </View>
		)
	}
}

const styles = StyleSheet.create({
	timerContainer: {
		borderRadius: 5,
		borderBottomWidth: 2,
		borderTopWidth: 2,
		borderLeftWidth: 2,
		borderRightWidth: 2,
		top: 80,
		borderColor: '#fff'
	  },
	  timer: {
		fontSize: 50,
		color: '#fff'
	  }
})