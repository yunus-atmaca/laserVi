import React, { useState } from 'react'
import {
  View,
  Text,
  TouchableWithoutFeedback,
  Image
} from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function customizeList(props) {
  const [selected, setSelected] = useState(0)

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback
        onLongPress={() => {
          props.onLongPress(item)
        }}
        onPress={() => {
          setSelected(index)
          props.onImageSelected(item)
        }}>
        <View style={{
          borderWidth: selected === index ? 1 : 0,
          borderColor: '#FF9900',
          borderRadius: 8,
          height: '100%',
          width: 132,
          marginHorizontal: 4,
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Image
            source={item.source}
            style={{
              width: 124,
              height: '100%',
              resizeMode: 'contain'
            }}

          />
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
        keyExtractor={(item, index) => index.toString()}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  )
}