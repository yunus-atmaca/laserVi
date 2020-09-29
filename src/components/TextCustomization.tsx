import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native'

import TabView from './TabView/Pager'
import CustomizeList from './CustomizeList'

import { fonts, getStyles, sizes } from '../utils/CustomizeText'

const { width, height } = Dimensions.get('window')

interface TextCustomizationProps {
  height: number
}

class TextCustomization extends React.Component<TextCustomizationProps, any> {
  constructor(props) {
    super(props)

    this.state = {
      selectedFont: 'Roboto',
      selectedStyle: 'Regular',
      selectedSize: 14
    }
  }

  _fontSelected = (index, font) => {
    //console.debug(index + ' | ' + font)
    this.setState({ selectedFont: font })
  }

  _styleSelected = (index, style) => {
    this.setState({ selectedStyle: style })
  }

  _sizeSelected = (index, size) => {
    this.setState({ selectedSize: size })
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
            }
          ]}
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
        </TabView>
      </View>
    )
  }
}



export default TextCustomization
