import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from './Home'
import Preview from './Preview'

function index(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
      />
      <Stack.Screen
        name="Preview"
        component={Preview}
      />
    </Stack.Navigator>
  )
}

export default index