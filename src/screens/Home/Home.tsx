import React from 'react'
import { View, Text, Dimensions } from 'react-native'

const { width, height } = Dimensions.get('window')

export default class Home extends React.Component<any, any>{
  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#141414' }}>
        <View style={{ width: width, height: width, backgroundColor: 'white' }}>

        </View>
      </View>
    )
  }
}