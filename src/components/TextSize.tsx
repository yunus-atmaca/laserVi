import React from 'react'

import {
  View,
  Animated,
  PanResponder,
  PanResponderInstance
} from 'react-native'

interface TextSizeProps {
  onSizeChanged: Function
}

class TextSize extends React.Component<TextSizeProps, any> {
  panResponder: PanResponderInstance
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
        this.state.pan.setValue({ x: 0, y: 0 })
      },

      onPanResponderMove: (e, gestureState) => {

        //console.log(gestureState.dy)
        let value = ((this.lastDy + gestureState.dy) <= 0 &&
          (this.lastDy + gestureState.dy) >= -150)
          ? Animated.event([
            null, { dy: this.state.pan.y }
          ], { useNativeDriver: false })(e, gestureState)
          : null


        //console.debug(Math.abs(Math.round(this.state.pan.y._value / 10)))

        this.props.onSizeChanged(
          Math.abs(Math.round(this.state.pan.y._value / 10)))
        /*if (Math.floor(this.state.pan.y / 10)) {

        }*/
        /*return Animated.event([
          null, { dy: this.state.pan.y }
        ], { useNativeDriver: false })(e, gestureState)*/

        return value;
      },
      onPanResponderRelease: (e, gestureState) => {
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