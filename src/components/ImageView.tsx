import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Keyboard,
  Dimensions,
  Easing
} from 'react-native'
import { TouchableWithoutFeedback } from 'react-native-gesture-handler'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const { width, height } = Dimensions.get('window')

interface ImageViewProps {
  key: string
  id: string
  onRef: Function
  selected: boolean
  saved: boolean
  image: any,
  onFocus: Function
}

const divided = 20

class ImageView extends React.PureComponent<ImageViewProps, any> {

  panResponder: any
  image: any

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

    this.image = this.props.image

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
      pan: new Animated.ValueXY(),

      width: 180,
      height: 180
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        //console.debug('onStartShouldSetPanResponderCapture')
        if (!this.state.selected) {
          this.props.onFocus({ id: this.props.id, type: 'image' })
        } else {

        }

        return true
      },
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
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
      },
      onPanResponderRelease: (e, g) => {
        this.state.pan.flattenOffset();
      }
    });
  }

  componentDidMount() {
    this.props.onRef({
      _setState: this._setState,
      _setSelected: this._setSelected,
      _setScaleMode: this._setScaleMode
    })
  }

  componentWillUnmount() {
    this.props.onRef({
      _setState: null,
      _setSelected: null,
      _setScaleMode: null
    })
  }

  _setState = (state) => {
    this.setState(state)
  }

  _setSelected = (callback, selected) => {
    this.setState({ selected: selected }, () => {
      callback && callback()
    })
  }

  _setScaleMode = (mode) => {
    this.isScaleMode = mode
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

  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }
    return (
      <View style={{
        flexDirection: 'row',
        position: 'absolute',
        top: 48,
        left: 0,
        right: 0,
        justifyContent: 'center'
      }}>
        <Animated.View
          onLayout={(e) => {
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
            height: this.state.height,
            width: this.state.width,
            borderWidth: this.state.selected ? 1 : 0,
            borderColor: 'blue',
            justifyContent: 'center',
            alignItems: 'center'
          }, panStyle]}>
          <View>
            <Animated.Image
              source={this.image.source}
              resizeMode={'contain'}
              style={{
                height: this.state.height,
                width: this.state.width,
              }} />
          </View>
        </Animated.View>
      </View>
    )
  }
}

export default ImageView