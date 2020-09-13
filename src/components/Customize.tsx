import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'

import { fonts, getStyles, size } from '../utils/CustomizeText'

class CustomizeText extends React.Component<any, any>{

  data: any
  navigatedFrom: any
  constructor(props) {
    super(props)

    this.state = {
      selectedFont: 'Roboto',
      selectedStyle: 'Regular',
      selectedSize: 12,
    }
  }

  componentDidMount() {
    this.props.onRef({ _updateState: this._updateState, _getTextAttribute: this._getTextAttribute })
  }

  componentWillUnmount() {
    this.props.onRef({ _updateState: null, _getTextAttribute: null })
  }

  _updateState = (which, data) => {
    if (which === 'font') {
      this.setState({ selectedFont: data })
    } else if (which === 'style') {
      this.setState({ selectedStyle: data })
    } else {
      this.setState({ selectedSize: data })
    }
  }

  _getTextAttribute = () => {
    return {
      font: this.state.selectedFont + this._getStyle(this.state.selectedStyle),
      size: this.state.selectedSize
    }
  }

  _fontClicked = () => {
    this.props.openBottomSheet({
      data: fonts,
      font: this.state.selectedFont,
      navigatedFrom: 'Fonts'
    })
  }

  _styleClicked = () => {
    this.props.openBottomSheet({
      data: getStyles(this.state.selectedFont),
      font: this.state.selectedFont,
      navigatedFrom: 'Styles'
    })
  }

  _sizeClicked = () => {
    this.props.openBottomSheet({
      data: size,
      font: this.state.selectedFont,
      navigatedFrom: 'Sizes'
    })
  }

  _getStyle = (style) => {
    if (style === 'Bold') {
      return '-Bold'
    } else if (style === 'Italic') {
      return '-Italic'
    } else if (style == 'Bold Italic') {
      return '-BoldItalic'
    } else {
      return '-Regular'
    }
  }

  render() {
    return (
      <View>
        <Text style={styles.header}>
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
              {this.state.selectedFont}
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
              {this.state.selectedStyle}
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
              {this.state.selectedSize}
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
  header: {
    color: 'white',
    fontSize: 18,
    fontFamily: 'Roboto-Regular',
  },
  textSectionLeft: {
    color: 'white',
    fontSize: 16,
    fontFamily: 'Roboto-Regular',
  },
  textSectionRight: {
    color: 'white',
    fontSize: 16,
    marginStart: 12,
    fontFamily: 'Roboto-Regular',
  },
})

export default CustomizeText
