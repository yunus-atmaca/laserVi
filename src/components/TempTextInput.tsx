import React from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity
} from 'react-native'

import Ionicons from 'react-native-vector-icons/Ionicons'

interface TempTextInputProps {
  value: string,
  selectedFont: string,
  selectedSize: number,
  selectedStyle: string,
  textInputDone: Function,
  close: Function
}

class TempTextInput extends React.Component<TempTextInputProps, any> {

  constructor(props) {
    super(props)

    this.state = {
      value: this.props.value
    }
  }

  render() {
    return (
      <View style={{
        backgroundColor: 'rgba(20,20,20, .4)',
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        top: 0,
        alignItems: 'center',
      }}>
        <TextInput
          autoFocus={true}
          value={this.state.value}
          onChangeText={(value) => {
            this.setState({ value: value })
          }}
          placeholder={this.state.value ?
            this.state.value : 'Write something...'}
          style={{
            fontSize: this.props.selectedSize,
            fontFamily: this.props.selectedFont + '-' + this.props.selectedStyle,
            color: 'white',
            marginTop: 144
          }}
        />
        <TouchableOpacity
          activeOpacity={.7}
          style={{
            position: "absolute",
            right: 4,
            top: 0,
          }}
          onPress={() => {
            this.props.textInputDone(this.state.value)
          }}>
          <View style={{
            height: 36,
            width: 36,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Ionicons name={'ios-checkmark-sharp'} size={24} color={'white'} />
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={.7}
          style={{
            position: "absolute",
            left: 4,
            top: 0,
          }}
          onPress={() => {
            this.props.close()
          }}>
          <View style={{
            height: 36,
            width: 36,
            borderRadius: 12,
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <Ionicons name={'close'} size={24} color={'red'} />
          </View>
        </TouchableOpacity>
      </View>
    )
  }
}

export default TempTextInput