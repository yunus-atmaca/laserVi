import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { fonts, style, size } from '../utils/CustomizeText'

class CustomizeText extends React.Component<any, any>{

  data: any
  navigatedFrom: any
  constructor(props) {
    super(props)

    this.state = {
      showBottomSheet: false
    }
  }

  _fontClicked = () => {
    console.debug('_fontClicked')
    this.navigatedFrom = 'fonts'
    this.data = fonts

    this.props.openBottomSheet({ data: style, navigatedFrom: 'Font' })
  }

  _styleClicked = () => {
    console.debug('_styleClicked')
    this.navigatedFrom = 'styles'
    this.data = style

    this.props.openBottomSheet({ data: style, navigatedFrom: 'Styles' })
    //this.setState({ showBottomSheet: true })
  }

  _sizeClicked = () => {
    console.debug('_sizeClicked')
    this.navigatedFrom = 'sizes'
    this.data = size

    this.props.openBottomSheet({ data: style, navigatedFrom: 'Sizes' })
  }

  render() {
    return (
      <View>
        <Text style={{ color: 'white', fontSize: 18 }}>
          Customize
        </Text>
        <View style={{
          backgroundColor: '#bfbfbf',
          width: '100%',
          height: 1,
          marginTop: 4
        }} />

        <TouchableWithoutFeedback onPress={this._fontClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 32,
            width: '100%',
          }}>
            <Text style={styles.textSectionLeft}>
              Font:
          </Text>
            <Text style={styles.textSectionRight}>
              Roboto
          </Text>
            <View style={{
              height: 32,
              width: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'white'}
                size={24}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._styleClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 32,
            width: '100%',
          }}>
            <Text style={styles.textSectionLeft}>
              Style:
          </Text>
            <Text style={styles.textSectionRight}>
              Bold
          </Text>
            <View style={{
              height: 32,
              width: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'white'}
                size={24}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._sizeClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 32,
            width: '100%',
          }}>
            <Text style={styles.textSectionLeft}>
              Size:
          </Text>
            <Text style={styles.textSectionRight}>
              12
          </Text>
            <View style={{
              height: 32,
              width: 32,
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'white'}
                size={24}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  textSectionLeft: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textSectionRight: {
    color: 'white',
    fontSize: 16,
    marginStart: 12
  },
})

export default CustomizeText
