import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'

export default function tabs(props) {
  return (
    <View style={{
      width: props.width,
      height: 32,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: "black",
      shadowOffset: {
        width: 6,
        height: 6,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 8,
    }}>
      {
        props.tabs.map((tab, index) => {
          return (
            <TouchableWithoutFeedback
              key={'key' + index}
              onPress={() => {
                //console.log(tab)
                props.tabClicked(tab.index)
              }}>
              <View style={{
                paddingHorizontal: 8,
                height: 32,
                marginHorizontal: 4,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <Text style={{
                  fontSize: 16,
                  fontFamily: 'Roboto-Regular',
                  color: props.selectedIndex === index ? '#FF9900' : 'white'
                }}>
                  {tab.tab}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          )
        })
      }
    </View>

  )
}