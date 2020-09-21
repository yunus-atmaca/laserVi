import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import BottomSheet from 'reanimated-bottom-sheet';

const { width, height } = Dimensions.get('window')

class BottomSheetView extends React.Component<any, any>{
  bottomSheetRef: any
  navigatedFrom: any
  data: any

  constructor(props) {
    super(props)

    this.navigatedFrom = this.props.navigatedFrom
    this.data = this.props.data
  }

  _renderItem = (data) => {
    return (
      <View style={{ marginHorizontal: 12, marginVertical: 6 }}>
        <TouchableOpacity onPress={() => {
          if (this.navigatedFrom === 'Fonts') {
            this.props.selectedData('font', data.item)
          } else if (this.navigatedFrom === 'Styles') {
            this.props.selectedData('style', data.item)
          } else {
            this.props.selectedData('size', data.item)
          }
          this.bottomSheetRef.snapTo(1)
        }}>
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontFamily: 'Roboto-Regular',
              }}>{data.item}</Text>
            </View>
            <View style={{
              flex: 1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: this.navigatedFrom === 'Sizes' ? data.item : 18,
                fontFamily: this._getStyle(data.item),
              }}>Preview</Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={{ backgroundColor: '#bfbfbf', width: width - 24, height: 0.5 }} />
      </View>
    )
  }

  _getStyle = (style) => {
    if (this.navigatedFrom === 'Fonts')
      return style + '-Regular'

    if (this.navigatedFrom === 'Sizes')
      return this.props.font + '-Regular'

    if (style === 'Bold') {
      return this.props.font + '-Bold'
    } else if (style === 'Italic') {
      return this.props.font + '-Italic'
    } else if (style == 'Bold Italic') {
      return this.props.font + '-BoldItalic'
    } else {
      return this.props.font + '-Regular'
    }
  }

  _renderContent = () => {
    return (
      <View
        style={{
          height: 250,
          width: width,
          backgroundColor: 'black'
        }}>
        <View style={{ alignItems: 'center', justifyContent: 'center', height: 36, width: width }}>
          <Text style={{ color: 'white' }}>{this.navigatedFrom}</Text>
          <View style={{ backgroundColor: '#bfbfbf', width: width, height: 1, marginTop: 4 }} />
        </View>
        <FlatList
          data={this.data}
          renderItem={this._renderItem}
          keyExtractor={(item, index) => index.toString()}
        />
      </View>
    )
  }

  render() {
    return (
      <BottomSheet
        ref={(ref) => {
          this.bottomSheetRef = ref
        }}
        snapPoints={[250, 0, 0]}
        borderRadius={10}
        renderContent={this._renderContent}
        onCloseEnd={this.props.onCloseEnd}
      />
    )
  }
}

export default BottomSheetView