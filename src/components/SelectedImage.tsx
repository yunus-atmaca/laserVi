import React from 'react'
import {
  View,
  Image,
  Dimensions,
  TouchableOpacity,
  TouchableWithoutFeedback
} from 'react-native'
const { width, height } = Dimensions.get('window')
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

export default function selectedImage(props) {
  return (
    <View style={{
      position: 'absolute',
      backgroundColor: 'rgba(20,20,20, .5)',
      left: 0,
      right: 0,
      bottom: 0,
      top: 0,
      height: height,
      width: width,
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <View style={{
        backgroundColor: 'white',
        padding: 8
      }}>
        <Image
          source={props.image.source}
          style={{
            width: width - 16,
            height: width - 16,
            resizeMode: 'contain'
          }}
        />

      </View>
      <TouchableWithoutFeedback
        onPress={props.close}>
        <View style={{
          width: 32,
          height: 32,
          right: 0,
          top: 0,
          position: 'absolute',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <MaterialCommunityIcons
            name={'close'}
            size={24}
            color={'white'} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}