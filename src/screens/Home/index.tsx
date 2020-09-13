import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Home from './Home'

function index(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Home">
      <Stack.Screen
        name="Home"
        component={Home}
      />
    </Stack.Navigator>
  )
}

export default index