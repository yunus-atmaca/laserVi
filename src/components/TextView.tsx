import React from 'react'
import {
  View,
  TextInput,
  TouchableOpacity,
  PanResponder,
  Animated,
  Keyboard
} from 'react-native'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface TextViewProps {
  key: string
  id: string
  index: number
  onRef: Function
  selected: boolean
  saved: boolean
  text: string
  top: number
  left: number
  fontFamily: string
  fontSize: number
  saveViewClicked: Function
  removeViewClicked: Function
  onTextChange: Function
  onFocus: Function
}

class TextView extends React.PureComponent<TextViewProps, any> {

  panResponder: any
  textInputRef: any
  constructor(props) {
    super(props)

    console.log(this.props.top)
    console.log(this.props.left)
    this.state = {
      selected: this.props.selected,
      saved: this.props.saved,
      text: this.props.text,
      fontSize: this.props.fontSize,
      fontFamily: this.props.fontFamily,
      top: this.props.top,
      left: this.props.left,
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
        /*this.setState({
          top: this.state.pan.y,
          left: this.state.pan.x,
        })*/

        /*console.log(g)
        console.log('HERE------1')
        console.log(this.state.top)
        console.log(this.state.left)
        console.log('HERE------2')
        console.log(this.state.pan.y)
        console.log(this.state.pan.x)*/
        //console.log('HERE------3')

        //let top = this.state.pan.y._value + (g.moveY - g.y0)
        //let left = this.state.pan.x._value + (g.moveX - g.x0)

        /*let top = this.state.pan.y._value > 0 ?
          this.state.top + Math.abs(this.state.pan.y._value) : this.state.top - Math.abs(this.state.pan.y._value)

        let left = this.state.pan.x._value > 0 ?
          this.state.left + Math.abs(this.state.pan.x._value) : this.state.left - Math.abs(this.state.pan.x._value)*/


        /*console.log(top)
        console.log(left)*/
        /*this.setState({
          top: g.moveY,
          left: g.moveX
        })*/
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
            top: this.state.top,
            left: this.state.left,
          }, panStyle]
        }>
        <View style={{
          height: '100%',
          width: 28,
          justifyContent: 'center',
          alignItems: 'center',
        }}>
          {
            this.state.selected ?
              <MaterialCommunityIcons name={'drag-variant'} size={18} color={'blue'} />
              : null
          }
        </View>
        <View style={{
          borderWidth: this.state.selected ? 1 : 0,
          borderColor: 'blue',
        }}>
          <TextInput
            ref={(ref) => {
              this.textInputRef = ref
            }}
            onChangeText={(text) => {
              this.setState({ text: text })
              this.props.onTextChange(this.props.id, text)
            }}
            value={this.state.text}
            autoFocus={true}
            onFocus={() => {
              this.props.onFocus(this.props.id, 'text')
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
      </Animated.View>
    )
  }
}

export default TextView