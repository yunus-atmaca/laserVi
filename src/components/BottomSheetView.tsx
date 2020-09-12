import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import { FlatList } from 'react-native-gesture-handler'
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
      <View style={{ marginHorizontal: 12, marginVertical: 8 }}>
        <Text style={{ color: 'white' }}>{data.item}</Text>
      </View>
    )
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
          <View style={{ backgroundColor: '#bfbfbf', width: width - 24 }} />
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
      />
    )
  }
}

export default BottomSheetView