import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

const InputBar = (props) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        style={styles.titleInput}
        onChangeText={(todoTitle) => props.titleTextChange(todoTitle)}
        value={props.todoTitle}
        placeholder='task'
        placeholderTextColor='#515254'
        textAlign={'center'}
      />
      <TextInput
        style={styles.lengthInput}
        onChangeText={(todoLength) => props.lengthTextChange(todoLength)}
        value={props.todoLength}
        keyboardType='number-pad'
        placeholder='length'
        placeholderTextColor='#515254'
        textAlign={'center'}
      />
      <TouchableOpacity style={styles.addButton} onPress={props.addNewTodo}>
        <Text style={styles.addButtonText}>add</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    shadowOffset: { width: 0, height: 3 },
    shadowColor: '#171717',
    shadowOpacity: .1
  },
  titleInput: {
    backgroundColor: '#363636',
    flex: 1,
    fontSize: 18,
    height: 35,
    color: '#00897b'
  },
  lengthInput: {
    backgroundColor: '#2b2929',
    flex: 1,
    fontSize: 18,
    height: 35,
    color: '#00897b'
  },
  addButton: {
    width: 100,
    backgroundColor: '#00897b',
    alignItems: 'center',
    justifyContent: 'center'
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18
  }
})

export default InputBar;