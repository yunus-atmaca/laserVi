import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function viewActionButton(props) {
  return (
    <TouchableOpacity
      onPress={() => {
        props.action()
      }}>
      <View style={{
        height: 42,
        width: 42,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 21,
        backgroundColor: 'white',
      }}>
        <MaterialCommunityIcons
          name={props.name}
          size={24}
          color={props.color} />
      </View>
    </TouchableOpacity>
  )
}


