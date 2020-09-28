import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Keyboard,
  TouchableWithoutFeedback,
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

class ImageView extends React.PureComponent<any, any> {

  panResponder: any
  image: any
  constructor(props) {
    super(props)

    this.image = this.props.image

    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      title: this.props.title,
      top: this.props.top,
      left: this.props.left,
      pan: new Animated.ValueXY()
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => false,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => false,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => false,
      onPanResponderGrant: () => {
        this.state.pan.setOffset({
          x: this.state.pan.x._value,
          y: this.state.pan.y._value
        });
      },
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

  _setSelected = (callback) => {
    if (this.state.selected) {
      this.setState({ selected: false }, () => {
        callback()
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
            top: this.state.top,
            left: this.state.left,
          }, panStyle]
        }>
        <View style={{
          borderWidth: this.state.selected ? 1 : 0,
          borderColor: 'blue',
        }}>
          <TouchableWithoutFeedback onPress={() => {
            Keyboard.dismiss()
            this.props.onFocus(this.props.id)
          }}>
            <View>
              <Image
                source={this.image.source}
                resizeMode={'contain'}
                style={{
                  width: 180,
                  height: 180
                }} />
            </View>
          </TouchableWithoutFeedback>
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
                      type: 'image',
                      view: {
                        selected: this.state.selected,
                        saved: true,
                        image: this.props.image,
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
                  height: 28,
                  width: 28,
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {
                    this.state.saved ?
                      (
                        <MaterialCommunityIcons name={'close-circle'} size={28} color={'red'} />
                      )
                      :
                      (
                        <MaterialCommunityIcons name={'check-circle'} size={28} color={'green'} />
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

export default ImageView