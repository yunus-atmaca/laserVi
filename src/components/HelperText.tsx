import React from 'react'
import { View, Text } from 'react-native'

export default function helperText(props) {
  return (
    <View
      pointerEvents={'none'}
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text style={{
        color: 'rgba(128,128,128, .2)',
        fontSize: 24,
        marginHorizontal: 48,
        textAlign: 'center',
        fontFamily: 'KronaOne-Regular'
      }}>
        {props.selectedView === 'text' ?
          'Tab to add text' : /*'Tab to add selected image'*/ ''
        }
      </Text>
    </View>
  )
}