import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native'

import TabView from './TabView/Pager'
import CustomizeList from './CustomizeList'

import { fonts, getStyles, sizes, textAligns } from '../utils/CustomizeText'

const { width, height } = Dimensions.get('window')

interface TextCustomizationProps {
  height: number,
  customizationSelected: Function
}

class TextCustomization extends React.Component<TextCustomizationProps, any> {
  constructor(props) {
    super(props)

    this.state = {
      selectedFont: 'Roboto',
      selectedStyle: 'Regular',
      selectedSize: 16,
      selectedAlign: 'left',
      initialIndex: 0,
    }
  }

  _fontSelected = (font) => {
    //console.debug(index + ' | ' + font)
    this.setState({
      selectedFont: font,
      initialIndex: 0,
      selectedStyle: getStyles(font)[0]
    })

    this._styleSelected(getStyles(font)[0], true)

    this.props.customizationSelected({ font: font })
  }

  _styleSelected = (style, doNotSetIndex) => {
    //console.debug('_styleSelected')
    //console.log(style)
    if (doNotSetIndex) {
      this.setState({
        selectedStyle: style,
      })
    } else {
      this.setState({
        selectedStyle: style,
        initialIndex: 1
      })
    }

    this.props.customizationSelected({ style: style })
  }

  _sizeSelected = (size) => {
    this.setState({
      selectedSize: size,
      initialIndex: 2
    })

    this.props.customizationSelected({ size: size })
  }

  _alignSelected = (align) => {
    this.props.customizationSelected({ align: align })
  }

  render() {
    return (
      <View style={{
        width: width,
        height: this.props.height,
      }}>
        <TabView
          showsHorizontalScrollIndicator={false}
          tabs={[
            {
              tab: 'Font',
              index: 0
            },
            {
              tab: 'Style',
              index: 1
            },
            {
              tab: 'Size',
              index: 2
            },
            {
              tab: 'Align',
              index: 3
            }
          ]}
          initialIndex={this.state.initialIndex}
          horizontal={true}
          width={width}
          height={this.props.height}>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'gray'
          }}>
            <CustomizeList
              navigatedFrom={'fonts'}
              fontSelected={this._fontSelected}
              data={fonts}
            />
          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'gray'
          }}>
            <CustomizeList
              navigatedFrom={'styles'}
              selectedFont={this.state.selectedFont}
              styleSelected={this._styleSelected}
              data={getStyles(this.state.selectedFont)}
            />
          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'gray'
          }}>
            <CustomizeList
              navigatedFrom={'sizes'}
              selectedFont={this.state.selectedFont}
              selectedStyle={this.state.selectedStyle}
              sizeSelected={this._sizeSelected}
              data={sizes}
            />
          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'gray'
          }}>
            <CustomizeList
              navigatedFrom={'textAligns'}
              alignSelected={this._alignSelected}
              data={textAligns}
            />
          </View>
        </TabView>
      </View>
    )
  }
}



export default TextCustomization
