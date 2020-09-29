import React, { useState } from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'

export default function customizeList(props) {

  const [selected, setSelected] = useState(0)

  const _renderItem = ({ item, index }) => {
    return (
      <TouchableWithoutFeedback onPress={() => {
        //console.debug(index)
        setSelected(index)
        if (props.navigatedFrom === 'fonts') {
          props.fontSelected(index, item)
        } else if (props.navigatedFrom === 'styles') {
          props.styleSelected(index, item)
        } else if (props.navigatedFrom === 'sizes') {
          props.sizeSelected(index, item)
        }
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
              fontSize: props.navigatedFrom === 'sizes' ? item : 24,
              fontFamily: props.navigatedFrom === 'fonts' ? item + '-Regular' :
                (props.navigatedFrom === 'styles' ? props.selectedFont + '-' + item :
                  props.selectedFont + '-' + props.selectedStyle)
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