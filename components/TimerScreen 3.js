import React, {Component} from 'react';
import { Button, StyleSheet, Text, View, TextInput, FlatList } from 'react-native';
import Header from'./Header'
import StaticTodoItem from './StaticTodoItem';
import { set } from 'react-native-reanimated';


export default class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      timer: 0,
      minutes: '00:00',
      currentTodo: 0
    }
  }
  /*
  componentDidMount(){
    this.interval = setInterval(
      () => this.updateState(),
      1000
    );
  }
  */

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

  updateState(seconds=this.state.timer) {
    seconds -= 1
    const mins = this.secondsToTime(seconds)
    this.setState({timer: seconds, minutes: mins['m'].toString()+':'+mins['s'].toString()})
  }
  
  componentDidUpdate(){
    if(this.state.timer === 0){
      console.log('FINISHED INDEX: '+this.state.currentTodo)
      clearInterval(this.interval);
      var newTodos = this.state.todos
      newTodos[this.state.currentTodo]['done'] = true
      this.setState({todos: newTodos})
      console.log('NEW TODOS: ')
      console.log(this.state.todos)
      this.startTimer()
    }
  }
  
  componentWillUnmount(){
   clearInterval(this.interval);
  }

  startTimer() {
    var incompleteTodos = this.state.todos.filter( (todo) => (todo['done'] == false ))
    var currentTodoIndex = this.state.todos.findIndex( (todo) => (todo['done'] == false) )
    this.setState({currentTodo: currentTodoIndex})
    this.setState({timer: Number(incompleteTodos[0]['time'])})
    console.log('INDEX: '+currentTodoIndex)
    console.log('TIMER: '+incompleteTodos[0]['time'])
    this.interval = setInterval(
      () => this.setState(
        () => ({ timer: this.state.timer - 1 })
      ),
      1000
    );
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
        <Text style={{color: 'white', textAlign: 'center', fontSize: 100}}>{this.state.timer}</Text>
        <Button title='Stop' onPress={() => this.props.navigation.goBack()} color="#ff5c5c"></Button>
        <Button title='Start' onPress={() => this.startTimer()} color="#ff5c5c"></Button>
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