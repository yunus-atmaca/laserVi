import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  PanResponder,
  Animated,
  Keyboard,
  Text
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextCustomizationProps {
  font: string,
  style: string,
  size: number
}

interface TextViewProps {
  key: string
  id: string
  index: number
  onRef: Function
  selected: boolean
  saved: boolean
  text: string
  textCustomization: TextCustomizationProps
}

class TextView extends React.PureComponent<TextViewProps, any> {

  panResponder: any
  textInputRef: any
  constructor(props) {
    super(props)

    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      text: this.props.text,
      fontSize: this.props.textCustomization.size,
      fontFamily: this.props.textCustomization.font,
      fontStyle: this.props.textCustomization.style,
      pan: new Animated.ValueXY()
    }

    this.panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      },
      onStartShouldSetPanResponder: (e, gesture) => true,
      onPanResponderMove: Animated.event([
        null, { dx: this.state.pan.x, dy: this.state.pan.y }
      ], { useNativeDriver: false }),
      onPanResponderRelease: (e, g) => {
        this.state.pan.flattenOffset();
      }
    });
  }

  componentDidMount() {
    this.props.onRef({ _setState: this._setState, _setSelected: this._setSelected })
  }

  componentWillUnmount() {
    this.props.onRef({ _setState: null, _setSelected: null })
  }

  _setState = (state) => {
    this.setState(state)
  }

  _setSelected = (callback, selected) => {
    this.textInputRef.blur()
    if (this.state.selected) {
      this.setState({ selected: selected }, () => {
        callback && callback()
      })
    }
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <Animated.View
        {...this.panResponder.panHandlers}
        style={
          [{
            flexDirection: 'row',
            position: 'absolute',
            top: 24,
            left: 24,
          }, panStyle]
        }>
        <View style={{
          borderWidth: this.state.selected ? 1 : 0,
          borderColor: 'blue',
        }}>
          <Text style={{
            paddingTop: 0,
            paddingBottom: 0,
            fontSize: this.state.fontSize,
            fontFamily: this.state.fontFamily
          }}>
            {this.state.text}
          </Text>
          {
            this.state.selected && (
              <TouchableOpacity
                onPress={() => {
                  if (this.state.saved) {

                  } else {

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
      </Animated.View>
    )
  }
}

export default TextView