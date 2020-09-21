import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';
import Discover from '../screens/Discover/Discover'

const { width, height } = Dimensions.get('window')

class BottomSheetView extends React.Component<any, any>{
  bottomSheetRef: any
  navigatedFrom: any

  constructor(props) {
    super(props)

    this.navigatedFrom = this.props.navigatedFrom
  }
  _renderContent = () => {
    return (
      <View
        style={{
          height: height - 96,
          width: width,
        }}>
        <Discover navigatedFrom={this.props.navigatedFrom} />
      </View>
    )
  }

  render() {
    return (
      <BottomSheet
        ref={(ref) => {
          this.bottomSheetRef = ref
        }}
        snapPoints={[height - 96, 0, 0]}
        borderRadius={10}
        renderContent={this._renderContent}
        onCloseEnd={this.props.onCloseEnd}
      />
    )
  }
}

export default BottomSheetView