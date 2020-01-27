import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import Header from'./Header'
import StaticTodoItem from './StaticTodoItem';

import MyButton from '../mybutton/Button.js';
import MyInput from '../myinput/Input.js';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      todos: [],
      time: new Date().toLocaleTimeString(),
      countdown: 10,
      intervalReference: null,
      originalCountdown: 0,
      toggle: true
    }
    setInterval(()=>{
      this.setState({time: new Date().toLocaleTimeString()})
    }, 1000)
    this.startCountDown = this.startCountDown.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.reset = this.reset.bind(this)
    this.toggle = this.toggle.bind(this)
  }
  
  secondsToTime(secs){
    let hours = Math.floor(secs / (60 * 60));

    let divisor_for_minutes = secs % (60 * 60);
    let minutes = Math.floor(divisor_for_minutes / 60);

    let divisor_for_seconds = divisor_for_minutes % 60;
    let seconds = Math.ceil(divisor_for_seconds);

    let obj = {
      "h": hours,
      "m": minutes,
      "s": seconds
    };
    return obj;
  }
  pause() {
    clearInterval(this.state.intervalReference)
  }
  resume() {
    // console.log(this.state)
    this.startCountDown(this.state.countdown)
  }
  reset() {
    clearInterval(this.state.intervalReference)
    this.startCountDown(this.state.originalCountdown)
  }
  startCountDown(countdownTime=this.state.countdown) {
    clearInterval(this.state.intervalReference)
    console.log(`you pressed ${countdownTime}`)
    this.setState({countdown: countdownTime, originalCountdown: countdownTime}, ()=>{
      let intervalReference = setInterval(()=>{
        this.setState({countdown: --this.state.countdown})
      }, 1000)
      this.setState({intervalReference: intervalReference})
    })
  }
  toggle() {
    this.setState({toggle: !this.state.toggle})
  }
  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    const { navigation } = this.props
    this.state.todos = JSON.parse(navigation.getParam('todos', []))
    this.startCountDown(20)
    return (
      <View style={styles.container}>
        {statusbar}
        <Header title="streamline" />
        <Text>{this.state.todos[0]['title']}</Text>
        <Button title='Stop' onPress={() => this.props.navigation.goBack()} color="#ff5c5c"></Button>
        <Button title='State Change' onPress={() => {this.state.todos[0]['done'] = true}} color="#ff5c5c"></Button>
        <Text color='white'>Time:{this.state.countdown}</Text>
        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <StaticTodoItem todoItem={item}/>
            )
          }}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  statusbar: {
    backgroundColor: '#121212',
    height: 20
  },
  baseText: {
    color: '#fff',
    fontSize: 18
  },
  addButton: {
    width: '100%',
    height: '5%',
    backgroundColor: '#32a895',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18
  }
});
