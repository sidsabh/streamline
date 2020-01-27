import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements'

export default class TodoItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const todoItem = this.props.todoItem;

    return (
      <TouchableOpacity
        style={styles.todoItem}
        //onPress={() => this.props.toggleDone()}
      >
        <TouchableOpacity style={styles.addButton} onPress={() => this.props.removeTodo()}>
          <Text style={styles.addButtonText}>X</Text>
        </TouchableOpacity>
        <Text style={(todoItem.done) ? { color: '#03DAC6', fontSize: 18, width: '80%', marginLeft: 8} : { color: '#fff', fontSize: 18, width: '80%', marginLeft: 8} }>
          { todoItem.title }
        </Text>

        <Badge value={ todoItem.time } badgeStyle={{ borderWidth: 0, marginRight: '5%', backgroundColor: '#00897b'}}/>
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  todoItem: {
    width: '100%',
    height: 40,
    borderBottomColor: '#DDD',
    borderBottomWidth: 0,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: 15
  },
  lengthBadge: {
    
  },
  addButton: {
    width: '5%',
    height:'50%',
    borderRadius: 100,
    backgroundColor: '#2d2d2e',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#595a5c',
    fontSize: 18
  }
})