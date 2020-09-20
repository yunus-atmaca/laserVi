import React from 'react'
import {
  View,
  Text,
  StyleSheet,
  TouchableWithoutFeedback,
} from 'react-native'

import MaterialIcons from 'react-native-vector-icons/MaterialIcons'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'

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
      <View style={{ paddingEnd: 6 }}>
        <TouchableWithoutFeedback onPress={this._fontClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 24,
            width: '100%',
          }}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'format-font'} size={14} color={'#bfbfbf'} />
            </View>
            <View style={{ flex: 5, paddingHorizontal: 2 }}>
              <Text numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.textSectionRight}>
                {this.state.selectedFont}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'#bfbfbf'}
                size={18}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._styleClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 24,
            width: '100%',
          }}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'format-line-style'} size={14} color={'#bfbfbf'} />
            </View>
            <View style={{ flex: 5, paddingHorizontal: 2 }}>
              <Text numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.textSectionRight}>
                {this.state.selectedStyle}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'white'}
                size={18}
              />
            </View>
          </View>
        </TouchableWithoutFeedback>
        <TouchableWithoutFeedback onPress={this._sizeClicked}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: 24,
            width: '100%',
          }}>
            <View style={styles.iconContainer}>
              <MaterialCommunityIcons name={'format-size'} size={14} color={'#bfbfbf'} />
            </View>
            <View style={{ flex: 5, paddingHorizontal: 2 }}>
              <Text numberOfLines={1}
                ellipsizeMode={'tail'}
                style={styles.textSectionRight}>
                {this.state.selectedSize}
              </Text>
            </View>
            <View style={styles.iconContainer}>
              <MaterialIcons
                name={'keyboard-arrow-down'}
                color={'white'}
                size={18}
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
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  textSectionRight: {
    color: 'white',
    fontSize: 14,
    fontFamily: 'Roboto-Regular',
  },
  iconContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    maxHeight: 24,
    maxWidth: 24,
  }
})

export default CustomizeText
