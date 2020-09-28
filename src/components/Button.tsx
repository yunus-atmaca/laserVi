import React from 'react'
import { View, TouchableWithoutFeedback } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function button(props) {
  return (
    <TouchableWithoutFeedback onPress={props.action}>
      <View style={{
        height: 48,
        width: 46,
        alignItems: 'center',
        justifyContent: 'center',
        marginHorizontal: 4
      }}>
        <View style={{
          height: 46,
          width: 46,
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons
            name={props.iconName}
            size={28}
            color={props.iconColor} />
        </View>
        <View style={{
          height: 2,
          width: 46,
          backgroundColor: props.indicatorColor
        }} />
      </View>
    </TouchableWithoutFeedback>
  )
}