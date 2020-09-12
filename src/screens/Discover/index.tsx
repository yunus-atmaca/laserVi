import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Discover from './Discover'

function index(props) {
  console.log(props)
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Discover">
      <Stack.Screen
        name="Discover"
        component={Discover}
      />
    </Stack.Navigator>
  )
}

export default index