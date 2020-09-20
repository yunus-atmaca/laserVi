import React from 'react'
import { View, Image, Dimensions, TouchableOpacity } from 'react-native'
import Ionicons from 'react-native-vector-icons/Ionicons'

const { width, height } = Dimensions.get('window')

class Preview extends React.Component<any, any> {
  uri: any
  constructor(props) {
    super(props)

    this.uri = this.props.route.params.uri
    console.debug(this.uri)
  }
  render() {
    return (
      <View style={{
        flex: 1,
        backgroundColor: 'black',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Image source={{ uri: this.uri }}
          style={{ width: width, height: width }}
          resizeMode={'contain'} />
        <TouchableOpacity style={{
          position: 'absolute',
          left: 16,
          top: 16,
        }}
          onPress={() => {
            this.props.navigation.goBack()
          }}>
          <View style={{
            height: 32,
            width: 32,
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 8
          }}>
            <Ionicons name={'arrow-back'} color={'white'} size={24} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default Preview