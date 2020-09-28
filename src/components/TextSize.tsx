import React from 'react'

import {
  View,
  Animated,
  PanResponder
} from 'react-native'

interface TextSizeProps {
  onSizeChanged: Function,
  onSizeRelease: Function
}

class TextSize extends React.Component<TextSizeProps, any> {
  panResponder: any
  lastDy: number
  constructor(props) {
    super(props)

    this.lastDy = 0

    this.state = {
      pan: new Animated.ValueXY()
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: 0,
          y: this.lastDy
        });
      },

      onPanResponderMove: (e, gestureState) => {
        let value = ((this.lastDy + gestureState.dy) <= 0 &&
          (this.lastDy + gestureState.dy) >= -150)
          ? Animated.event([
            null, { dy: this.state.pan.y }
          ], { useNativeDriver: false })(e, gestureState)
          : null


        //console.debug(Math.max(this.state.pan.y._value, -150))


        this.props.onSizeChanged(this.state.pan.y._value < -150 ? -150 : this.state.pan.y._value)

        /*this.props.onSizeChanged(
          Math.abs(
            Math.floor(
              Math.max(this.state.pan.y._value, -150) / 5)),
          Math.max(this.state.pan.y._value, -150) > 0 ? 'down' : 'up')*/
        /*if (Math.floor(this.state.pan.y / 10)) {

        }*/
        /*return Animated.event([
          null, { dy: this.state.pan.y }
        ], { useNativeDriver: false })(e, gestureState)*/

        return value;
      },
      onPanResponderRelease: (e, gestureState) => {
        //console.debug('onPanResponderRelease')
        //console.debug(this.state.pan.y._value < -150 ? -150 : this.state.pan.y._value)
        this.props.onSizeRelease(this.state.pan.y._value < -150 ? -150 : this.state.pan.y._value)
        this.lastDy += gestureState.dy

        this.lastDy = this.lastDy >= 0 ? 0 : this.lastDy
        this.lastDy = this.lastDy <= -150 ? -150 : this.lastDy

        this.state.pan.flattenOffset();
      }
    });
  }
  render() {
    const panStyle = {
      transform: this.state.pan.getTranslateTransform()
    }

    return (
      <View
        style={{
          width: '100%',
          height: '100%',
          alignItems: 'center',
        }}>
        <View style={{
          width: 4,
          height: '100%',
          backgroundColor: '#141414'
        }} />
        <Animated.View
          {...this.panResponder.panHandlers}
          style={[{
            position: 'absolute',
            bottom: -12,
            left: 0,
            right: 0,
            width: '100%',
            height: 24,
            borderRadius: 12,
            backgroundColor: '#FF9900'
          }, panStyle]}
        />
      </View>
    )
  }
}

export default TextSize