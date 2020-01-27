import React from 'react';
import { StyleSheet, Text, Button, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Badge } from 'react-native-elements'

export default class StaticTodoItem extends React.Component {
  constructor (props) {
    super(props);
  }

  render () {
    const todoItem = this.props.todoItem;

    return (
      <View
        style={styles.todoItem}
      >
        <Text style={(todoItem.done) ? { color: '#03DAC6', fontSize: 18} : { color: '#fff', fontSize: 18} }>
          { todoItem.title }
        </Text>

        <Badge value={ todoItem.time } badgeStyle={{ borderWidth: 0, marginRight: '5%', backgroundColor: '#00897b'}}/>
      </View>
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
    width: '10%',
    height:'60%',
    borderRadius: 10,
    backgroundColor: '#00897b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18
  }
})