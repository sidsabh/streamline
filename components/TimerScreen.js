import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList, Alert } from 'react-native';
import Header from'./Header'
import StaticTodoItem from './StaticTodoItem';
import { set } from 'react-native-reanimated';

export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        timer: 10,
        index: 0,
        started: false
      }
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

  componentDidMount(){
    this.interval = setInterval(
      () => this.tick(),
      1000
    );
  }
  
  tick(){
    if (this.state.started === false){
        this.setState({started: true})
        this.setState({timer: Number(this.state.todos[0]['time'])*60+1})
    }
    if (this.state.timer === 0) {  
        this.setState({index: this.state.index+1})
            if(typeof this.state.todos[this.state.index] === 'undefined') {
                this.props.navigation.goBack()
                alert('Schedule finished!')
            } else {
                this.setState({timer: Number(this.state.todos[this.state.index]['time'])*60+1, todos: t})
            } 
        } else {
            const mins = this.secondsToTime(this.state.timer-1)
            this.setState({timer: this.state.timer-1, minutes: mins['m'].toString()+':'+mins['s'].toString()}, ()=>console.log(this.state.timer))
        }
  }
  /*
  componentDidUpdate(){
    if(this.state.timer === 1){
        this.state.todos.shift()
        if (this.state.todos.length > 0){
            this.state.timer = Number(this.state.todos[0]['time'])
        } else {
            console.log('done')
        }
    }
  }
  */
  componentWillUnmount(){
   clearInterval(this.interval);
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    const { navigation } = this.props
    this.state.todos = JSON.parse(navigation.getParam('todos', []))
    return (
      <View style={styles.container}>
        {statusbar}
        <Header title="streamline" />
        <Text>{this.state.todos[0]['title']}</Text>
        <Text style={{color: 'white', textAlign: 'center', fontSize: 100}}>{this.state.minutes}</Text>
        <Button title='Stop' onPress={() => this.props.navigation.goBack()} color="#ff5c5c"></Button>
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
    )
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