import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();

import Favorites from './Favorites'

function index(props) {
  return (
    <Stack.Navigator headerMode="none" initialRouteName="Favorites">
      <Stack.Screen
        name="Favorites"
        component={Favorites}
      />
    </Stack.Navigator>
  )
}

export default index