import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function fonts(props) {

  const [selected, setSelected] = useState(0)

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        //console.debug(index)
        setSelected(index)
        props.fontSelected(index, item)
      }}>
        <View style={{
          backgroundColor: selected === index ? '#FF9900' : 'white',
          borderRadius: 8,
          height: '100%',
          width: 132,
          marginHorizontal: 4,
          shadowColor: "black",
          shadowOffset: {
            width: 6,
            height: 6,
          },
          shadowOpacity: 0.1,
          shadowRadius: 6,
          elevation: 8,
        }}>
          <View style={{
            height: '20%',
            width: 132,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              color: 'black',
              alignSelf: 'center',
              fontSize: 12,
              fontFamily: 'Roboto' + '-Regular'
            }}>
              {item}
            </Text>
          </View>
          <View style={{
            height: '80%',
            width: 132,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
            <Text style={{
              color: 'black',
              fontSize: 24,
              fontFamily: item + '-Regular'
            }}>
              Preview
          </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
  return (
    <View style={{
      padding: 8,
      flex: 1
    }}>
      <FlatList
        data={props.data}
        renderItem={_renderItem}
        keyExtractor={item => item.id}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}