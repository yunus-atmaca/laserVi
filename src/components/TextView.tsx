import React from 'react'
import {
  View,
  TouchableOpacity,
  PanResponder,
  Animated,
  Text,
  TouchableWithoutFeedback,
  Easing,
  Platform,
  PixelRatio, Dimensions
} from 'react-native'

import ViewActionButton from './ViewActionButton'

interface TextCustomizationProps {
  font: string,
  style: string,
  //size: number,
  align: string
}

interface TextViewProps {
  key: string
  id: string
  onRef: Function
  selected: boolean
  saved: boolean
  text: string
  textCustomization: TextCustomizationProps,
  onFocus: Function
  editText: Function
}

const scale = Dimensions.get('window').width / 320;
const divided = 20

class TextView extends React.PureComponent<TextViewProps, any> {
  panResponder: any

  incY: number
  motionY: number

  incX: number
  motionX: number

  width: any
  height: any

  onLayoutWidth: any
  onLayoutHeight: any
  flagInitial: boolean

  isScaleMode: boolean

  constructor(props) {
    super(props)

    this.isScaleMode = false

    this.width = new Animated.Value(0)
    this.height = new Animated.Value(0)

    this.incY = 1
    this.motionY = 0

    this.incX = 1
    this.motionX = 0

    this.flagInitial = true

    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      text: this.props.text,
      fontSize: 24,
      fontFamily: this.props.textCustomization.font,
      fontStyle: this.props.textCustomization.style,
      textAlign: this.props.textCustomization.align,
      pan: new Animated.ValueXY(),

      width: null,
      height: null
      /*width: this.width.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 54]
      }),
      height: this.width.interpolate({
        inputRange: [0, 1],
        outputRange: [50, 54]
      })*/
    }

    this.panResponder = PanResponder.create({
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      },
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        //console.debug('onStartShouldSetPanResponderCapture')
        if (!this.state.selected) {
          this.props.onFocus({ id: this.props.id, type: 'text' })
        } else {
          /*if (this.state.selected && gestureState.dx === 0
            && gestureState.dy === 0) {
            this.props.editText(this.state.text)
          }*/
        }

        return true
      },

      onPanResponderMove: (evt, gestureState) => {
        if (this.isScaleMode) {
          if (Math.abs(gestureState.dy - this.motionY) > 1.5) {

            if (gestureState.dy > this.motionY) {
              this.incY += Math.abs(gestureState.dy / divided)
            } else {
              this.incY -= Math.abs(gestureState.dy / divided)
            }

            this.motionY = gestureState.dy

            this.setState({
              height: this.height.interpolate({
                inputRange: [0, 1],
                outputRange: [this.onLayoutHeight, this.incY]
              }),
              fontSize: this._getTextSize(this.incY)
            }, () => {
              this._animHeight().start()
            })
          }

          if (Math.abs(gestureState.dx - this.motionX) > 1.5) {
            if (gestureState.dx > this.motionX) {
              this.incX += Math.abs(gestureState.dx / divided)
            } else {
              this.incX -= Math.abs(gestureState.dx / divided)
            }

            this.motionX = gestureState.dx

            this.setState({
              width: this.width.interpolate({
                inputRange: [0, 1],
                outputRange: [this.onLayoutWidth, this.incX]
              }),
              fontSize: this._getTextSize(this.incX)
            }, () => {
              this._animWidth().start()
            })
          }
          return true
        } else {
          return Animated.event([
            null, { dx: this.state.pan.x, dy: this.state.pan.y }
          ], { useNativeDriver: false })(evt, gestureState)
        }

        /*return Animated.event([
          null, { dx: this.state.pan.x, dy: this.state.pan.y }
        ], { useNativeDriver: false })(evt, gestureState)*/
      },
      onPanResponderRelease: (e, gestureState) => {
        //console.debug('onPanResponderRelease')
        //if (this.state.selected) {
        if (this.state.selected && gestureState.dx === 0
          && gestureState.dy === 0) {
          this.props.editText(this.state.text)
        }
        //}

        this.state.pan.flattenOffset();
      }
    });
  }

  componentDidMount() {
    this.props.onRef({ _setState: this._setState, _setSelected: this._setSelected })
  }

  _animWidth = () => {
    return Animated.timing(this.width, {
      toValue: 1,
      duration: 1,
      useNativeDriver: false,
      easing: Easing.ease
    })
  }

  _animHeight = () => {
    return Animated.timing(this.height, {
      toValue: 1,
      duration: 1,
      useNativeDriver: false,
      easing: Easing.ease
    })
  }

  componentWillUnmount() {
    this.props.onRef({ _setState: null, _setSelected: null })
  }

  _setState = (state) => {
    console.debug(state)
    this.setState(state)
  }

  _setSelected = (callback, selected) => {
    this.setState({ selected: selected }, () => {
      callback && callback()
    })
  }

  _getTextSize = (size) => {
    const newSize = size * scale
    if (Platform.OS === 'ios') {
      return Math.round(PixelRatio.roundToNearestPixel(newSize))
    } else {
      return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
    }
  }

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <View
        style={
          [{
            flexDirection: 'row',
            position: 'absolute',
            justifyContent: 'center',
            top: 48,
            left: 0,
            right: 0,
          }]
        }>
        <Animated.View
          onLayout={(e) => {
            //console.log('On-Layout-1')
            //console.log(e.nativeEvent.layout.height)
            //console.log(e.nativeEvent.layout.width)

            if (this.flagInitial) {

              this.onLayoutWidth = e.nativeEvent.layout.width
              this.onLayoutHeight = e.nativeEvent.layout.height

              this.setState({
                width: this.width.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.onLayoutWidth, this.onLayoutWidth + 1]
                }),
                height: this.width.interpolate({
                  inputRange: [0, 1],
                  outputRange: [this.onLayoutHeight, this.onLayoutHeight + 1]
                })
              })

              this.incX = this.onLayoutWidth;
              this.incY = this.onLayoutHeight;

              this.flagInitial = false
            }
          }}
          {...this.panResponder.panHandlers}
          style={[{
            borderWidth: this.state.selected ? 1 : 0,
            borderColor: 'blue',
            height: this.state.height,
            width: this.state.width,
            justifyContent: 'center'
          }, panStyle]}>
          <Text

            adjustsFontSizeToFit={true}
            style={{
              textAlign: this.state.textAlign,
              fontSize: this.state.fontSize,
              fontFamily: this.state.fontFamily + '-' + this.state.fontStyle,
            }}>
            {this.state.text}
          </Text>
        </Animated.View>
      </View>
    )
  }
}

export default TextView