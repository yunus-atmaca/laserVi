import React from 'react'
import {
  View,
  Image,
  TouchableOpacity,
  PanResponder,
  Animated,
  Keyboard,
  Dimensions
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

class ImageView extends React.PureComponent<ImageViewProps, any> {

  panResponder: any
  image: any
  constructor(props) {
    super(props)

    this.image = this.props.image

    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      pan: new Animated.ValueXY()
    }

    this.panResponder = PanResponder.create({
      onStartShouldSetPanResponderCapture: (evt, gestureState) => {
        //console.debug('onStartShouldSetPanResponderCapture')
        if (!this.state.selected) {
          this.props.onFocus({ id: this.props.id, type: 'text' })
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
    this.setState({ selected: selected }, () => {
      callback && callback()
    })
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
            top: 48,
            left: 0,
            right: 0,
            justifyContent: 'center'
          }, panStyle]
        }>
        <View style={{
          borderWidth: this.state.selected ? 1 : 0,
          borderColor: 'blue',
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
          {/*
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
                */}
        </View>
      </Animated.View>
    )
  }
}

export default ImageView