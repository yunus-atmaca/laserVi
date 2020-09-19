import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class TextView extends React.PureComponent<any, any> {

  posTop: any
  posLeft: any
  fontSize: any
  fontFamily: any

  constructor(props) {
    super(props)

    this.posTop = this.props.top
    this.posLeft = this.props.left
    this.fontSize = this.props.fontSize
    this.fontFamily = this.props.fontFamily

    this.state = {
      selected: true,
      saved: this.props.saved,
      text: this.props.text,
    }
  }

  componentDidMount() {
    //this.props.onRef({ _play: this._play, _pause: this._pause })
  }

  componentWillUnmount() {
    //this.props.onRef({ _play: null, _pause: null })
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        top: this.posTop,
        left: this.posLeft,
        borderWidth: 1,
        borderColor: 'blue'
      }}>
        <TextInput
          onChangeText={(text) => {
            this.setState({ text: text })
          }}
          value={this.state.text}
          autoFocus={true}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: this.fontSize,
            fontFamily: this.fontFamily
          }}
        />
        {
          this.state.selected && (
            <TouchableOpacity
              onPress={() => {
                if (this.state.saved) {
                  this.props.removeViewClicked({
                    id: this.props.id,
                    saved: this.state.saved,
                    text: this.state.text
                  })
                } else {
                  this.props.saveViewClicked({
                    id: this.props.id,
                    saved: this.state.saved,
                    text: this.state.text
                  })
                }

                this.setState({ saved: !this.state.saved })
              }}
              style={{
                position: 'absolute',
                top: 0,
                right: 0,
              }}>
              <View style={{
                height: 16,
                width: 16,
                alignItems: 'center',
                justifyContent: 'center'
              }}>
                {
                  this.state.saved ?
                    (
                      <MaterialCommunityIcons name={'close-circle'} size={18} color={'red'} />
                    )
                    :
                    (
                      <MaterialCommunityIcons name={'check-circle'} size={18} color={'green'} />
                    )
                }
              </View>
            </TouchableOpacity>
          )
        }
      </View>
    )
  }
}

export default TextView