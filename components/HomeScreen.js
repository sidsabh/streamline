import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button, AsyncStorage, TouchableWithoutFeedback, Keyboard, TouchableOpacity } from 'react-native';
import Header from './Header';
import InputBar from './InputBar';
import TodoItem from './TodoItem';

const DismissKeyboard = ({ children }) => (
  <TouchableWithoutFeedback onPress={() => Keyboardl.dismiss()}>
    { children }
  </TouchableWithoutFeedback>
);

export default class App extends React.Component {
  constructor () {
    super();

    this.state = {
      todoTitle: '',
      todoLength: 0,
      todos: []
    }
  }

  loadTodos = async () => {
		try {
			const getTodos = await AsyncStorage.getItem('todos')
			const parsedTodos = JSON.parse(getTodos)
			this.setState({ todos: parsedTodos })
		} catch (err) {
			alert('Application Error. Cannot load data.')
		}
	}

  addNewTodo () {
    if (this.state.todoLength.toString() != '' && this.state.todoTitle.toString() != ''){
      let todos = this.state.todos

      todos.push({
        id: todos.length + 1,
        title: this.state.todoTitle,
        time: this.state.todoLength,
        done: false
      });

      AsyncStorage.setItem('todos', JSON.stringify(todos))

      this.setState({
        todos: todos,
        todoTitle: '',
        todoLength: 0
      });
    }
  }

  toggleDone (item) {
    let todos = this.state.todos;

    todos = todos.map((todo) => {
      if (todo.id == item.id) {
        todo.done = !todo.done;
      }

      return todo;
    })

    AsyncStorage.setItem('todos', JSON.stringify(todos))
    this.setState({todos: todos});
  }

  removeTodo (item) {
    let todos = this.state.todos;

    todos = todos.filter((todo) => todo.id !== item.id);
    
    AsyncStorage.setItem('todos', JSON.stringify(todos))

    this.setState({todos: todos});
  }
  
  startTimer() {
    if (this.state.todos.filter( (todo) => todo['done'] == false ).length > 0) {
      this.state.timerTime = this.state.todos.filter( (todo) => todo['done'] == false )[0]['time'] + 1
      this.interval = setInterval(
        () => this.setState(
          (prevState) => ({ timerTime: prevState.timerTime - 1 })
        ),
        1000
      );
    } else {
      alert('done')
    }
    
  }

  goToTimerScreen(){
    if (this.state.todos.length > 0){
      this.props.navigation.navigate('Timer', { todos: JSON.stringify(this.state.todos) })
    }
  }

  render() {
    const statusbar = (Platform.OS == 'ios') ? <View style={styles.statusbar}></View> : <View></View>;
    this.loadTodos()
    return (
      <View style={styles.container}>
        {statusbar}

        <Header title="streamline" />

        <InputBar
          addNewTodo={() => this.addNewTodo()}
          titleTextChange={todoTitle => this.setState({ todoTitle })}
          lengthTextChange={todoLength => this.setState({ todoLength })}
          todoTitle={this.state.todoTitle}
          todoLength={this.state.todoLength}
        />
      <TouchableOpacity style={styles.addButton} onPress={ () => this.goToTimerScreen() }>
        <Text style={styles.addButtonText}>start</Text>
      </TouchableOpacity>
        <FlatList
          data={this.state.todos}
          extraData={this.state}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({item, index}) => {
            return (
              <TodoItem todoItem={item} toggleDone={() => this.toggleDone(item)} removeTodo={() => this.removeTodo(item)} />
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