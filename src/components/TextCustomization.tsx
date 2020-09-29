import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text,
} from 'react-native'

import TabView from './TabView/Pager'
import FontsView from './Fonts'
import { fonts } from '../utils/CustomizeText'

const { width, height } = Dimensions.get('window')

interface TextCustomizationProps {
  height: number
}

class TextCustomization extends React.Component<TextCustomizationProps, any> {
  constructor(props) {
    super(props)
  }

  _fontSelected = (index, font) => {
    console.debug(index + ' | ' + font)
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
            <FontsView
              fontSelected={this._fontSelected}
              data={fonts}
            />
          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'blue'
          }}>

          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'yellow'
          }}>

          </View>
        </TabView>
      </View>
    )
  }
}



export default TextCustomization
