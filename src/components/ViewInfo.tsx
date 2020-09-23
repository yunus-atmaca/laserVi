import React from 'react'
import { View, Text, TouchableWithoutFeedback } from 'react-native'
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
      <TouchableWithoutFeedback onPress={() => {
        this.props.onFocus(this.props.id)
      }}>
        <View style={{
          width: '100%',
          paddingVertical: 4,
          backgroundColor: this.state.selected ? '#82521b' : 'transparent'
        }}>
          <View style={{ flexDirection: 'row' }}>
            {
              this.props.type === 'text' ?
                (
                  <View style={{
                    height: 28,
                    width: 28,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialCommunityIcons
                      name={'format-text'}
                      size={24}
                      color={'white'} />
                  </View>
                )
                :
                (
                  <View style={{
                    height: 28,
                    width: 28,
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    <MaterialCommunityIcons
                      name={'image-outline'}
                      size={24}
                      color={'white'} />
                  </View>
                )

            }
            <View style={{
              marginStart: 12,
              justifyContent: 'center',
              alignItems: 'center'
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
                ` {this.state.name} `
              </Text>
            </View>
          </View>
        </View>
      </TouchableWithoutFeedback>
    )
  }
}

export default ViewInfo