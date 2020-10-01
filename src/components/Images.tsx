import React from 'react'
import { View, Text, Dimensions } from 'react-native'

import TabView from './TabView/Pager'
import ImageList from './ImageList'

import { DATA } from '../screens/Discover/images'

const { width, height } = Dimensions.get('window')

interface ImagesProps {
  height: number,
  onLongPressImage: Function
}

class Images extends React.Component<ImagesProps, any> {

  constructor(props) {
    super(props)

    this.state = {
      initialIndex: 0
    }
  }

  _onLongPress = (image) => {
    this.props.onLongPressImage(image)
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
              tab: 'Suggestions',
              index: 0
            },
            {
              tab: 'Favorites',
              index: 1
            },
          ]}
          initialIndex={this.state.initialIndex}
          horizontal={true}
          width={width}
          height={this.props.height}>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'white'
          }}>
            <ImageList
              data={DATA}
              onLongPress={this._onLongPress}
            />
          </View>
          <View style={{
            width: width,
            height: this.props.height - 32,
            backgroundColor: 'white'
          }}>
            <ImageList
              data={DATA}
              onLongPress={this._onLongPress}
            />
          </View>
        </TabView>
      </View>
    )
  }
}

export default Images