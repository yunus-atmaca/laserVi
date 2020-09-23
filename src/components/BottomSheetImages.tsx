import React from 'react'
import { View, Text, Dimensions } from 'react-native'
import BottomSheet from 'reanimated-bottom-sheet';
import Discover from '../screens/Discover/Discover'

const { width, height } = Dimensions.get('window')

class BottomSheetImages extends React.Component<any, any>{
  bottomSheetRef: any

  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.props.onRef({ _snapTo: (index) => { this.bottomSheetRef.snapTo(index) } })
  }

  componentWillUnmount() {
    this.props.onRef({ _snapTo: null })
  }

  _imageClicked = (image) => {
    //console.debug(image)
    this.props.onImageSelected(image)
    this.bottomSheetRef.snapTo(1)
  }

  _renderContent = () => {
    return (
      <View
        style={{
          height: height - 128,
          width: width,
        }}>
        <Discover
          imageClicked={this._imageClicked}
          navigatedFrom={'Home'}
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
        snapPoints={[height - 128, 0, 0]}
        borderRadius={10}
        renderContent={this._renderContent}
        onCloseEnd={this.props.onCloseEnd}
      />
    )
  }
}

export default BottomSheetImages