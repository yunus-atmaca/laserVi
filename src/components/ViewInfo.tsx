import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class ViewInfo extends React.PureComponent<any, any> {

  constructor(props) {
    super(props)

    this.state = {
      name: this.props.name,
      selected: this.props.selected,
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
      <TouchableOpacity onPress={() => {
        this.props.onFocus(this.props.id)
      }}>
        <View style={{
          width: '100%',
          paddingVertical: 4,
          backgroundColor: this.state.selected ? '#82521b' : 'transparent'
        }}>
          <View style={{ flexDirection: 'row' }}>
            <View style={{
              flex: 5,
              justifyContent: 'center',
            }}>
              <Text
                ellipsizeMode={'tail'}
                numberOfLines={1}
                style={{
                  marginHorizontal: 4,
                  color: 'white',
                  fontSize: 14,
                  fontFamily: 'Roboto-Regular'
                }}>
                {this.props.type === 'text' ? 'Text' : 'Image'}   `{this.state.name}`
              </Text>
            </View>
            <View style={{ flex: 2 }}>
              <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                <View style={{
                  height: 24,
                  width: 24,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <MaterialCommunityIcons name={'drag-variant'} size={18} color={'white'} />
                </View>
                <View style={{
                  height: 24,
                  width: 24,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <MaterialCommunityIcons name={'check-circle'} size={18} color={'green'} />
                </View>
                <View style={{
                  height: 24,
                  width: 24,
                  justifyContent: 'center',
                  alignItems: 'center'
                }}>
                  <MaterialCommunityIcons name={'close-circle'} size={18} color={'red'} />
                </View>
              </View>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    )
  }
}

export default ViewInfo