import React from 'react'
import { View, Text } from 'react-native'

export default function header(props) {
  return (
    <View style={{
      height: 36,
      width: '100%',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: props.backgroundColor
    }}>
      <Text style={{
        color: 'white',
        fontSize: 16,
        fontFamily: 'Roboto-Regular',
      }}>
        {props.header}
      </Text>
    </View>
  )
}