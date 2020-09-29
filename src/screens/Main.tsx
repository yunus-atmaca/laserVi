import React from 'react'
import { LogBox } from 'react-native'

LogBox.ignoreLogs(['VirtualizedLists should never be nested']);

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
const Tab = createBottomTabNavigator();

import Home from './Home'
import Discover from './Discover'
import Favorites from './Favorites'

import Tabbar from '../components/Tabbar'
export default class Main extends React.Component<any, any>{
  render() {
    return (
      <Tab.Navigator tabBar={props => <Tabbar {...props} />}>
        <Tab.Screen name="Home" component={Home} initialParams={{ events: this.props.route.params.events }} />
        <Tab.Screen name="Discover" component={Discover} />
        <Tab.Screen name="Favorites" component={Favorites} />
      </Tab.Navigator>
    )
  }
}