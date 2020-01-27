import React from 'react';
import { Platform, StyleSheet, Text, View, FlatList, Button } from 'react-native';
import { createAppContainer } from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from './components/HomeScreen'
import TimerScreen from './components/TimerScreen'

const AppNavigator = createStackNavigator(
  {
    Home: {
      screen: HomeScreen,
      navigationOptions: {
        title: 'Home',
        headerShown: false
      }
    },
    Timer: {
      screen: TimerScreen,
      navigationOptions: {
        title: 'Timer',
        headerShown: false
      }
    }
  },
  {
    initialRouteName: 'Home'
  }
)
export default createAppContainer(AppNavigator)