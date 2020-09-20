import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class TextView extends React.PureComponent<any, any> {
  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      text: this.props.text,
      fontSize: this.props.fontSize,
      fontFamily: this.props.fontFamily,
      top: this.props.top,
      left: this.props.left
    }
  }

  componentDidMount() {
    this.props.onRef({ _setState: this._setState })
  }

  componentWillUnmount() {
    this.props.onRef({ _setState: null })
  }

  _setState = (state) => {
    this.setState(state)
  }

  render() {
    return (
      <View style={{
        position: 'absolute',
        top: this.state.top,
        left: this.state.left,
        borderWidth: this.state.selected ? 1 : 0,
        borderColor: 'blue'
      }}>
        <TextInput
          onChangeText={(text) => {
            this.setState({ text: text })
            this.props.onTextChange(this.props.id, text)
          }}
          value={this.state.text}
          autoFocus={true}
          onFocus={() => {
            this.props.onFocus(this.props.id)
          }}
          style={{
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: this.state.fontSize,
            fontFamily: this.state.fontFamily
          }}
        />
        {
          this.state.selected && (
            <TouchableOpacity
              onPress={() => {
                if (this.state.saved) {
                  this.props.removeViewClicked(this.props.id)
                } else {
                  if (this.state.text === '') {
                    console.debug('TEXT NOT ENTERED')
                    return;
                  }
                  this.setState({ saved: true })
                  this.props.saveViewClicked({
                    id: this.props.id,
                    type: 'text',
                    view: {
                      selected: this.state.selected,
                      saved: true,
                      text: this.state.text,
                      fontSize: this.state.fontSize,
                      fontFamily: this.state.fontFamily,
                      top: this.state.top,
                      left: this.state.left,
                    }
                  })
                }
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