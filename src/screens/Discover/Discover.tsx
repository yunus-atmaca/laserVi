import React from 'react'
import {
  View,
  Text,
  Image,
  Dimensions
} from 'react-native'
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler'
import Header from '../../components/Header'
import { DATA } from './images'

const { width, height } = Dimensions.get('window')

export default class Discover extends React.Component<any, any>{
  navigatedFrom: any
  constructor(props) {
    super(props)

    this.navigatedFrom = this.props.navigatedFrom
  }
  _renderItem = (data) => {
    if (data.item.empty === true) {
      return <View style={{
        backgroundColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
        width: (width - 24) / 3,
        height: 144,
        marginTop: 12,
        marginHorizontal: 4
      }} />;
    }
    return (
      <TouchableOpacity
        onPress={() => {
          if (this.navigatedFrom === 'Home') {
            this.props.imageClicked(data.item);
          }
        }}>
        <View style={{
          alignItems: 'center',
          justifyContent: 'center',
          flex: 1,
          width: (width - 24) / 3,
          height: 144,
          marginTop: 12,
          backgroundColor: 'white',
          marginHorizontal: 4,
          borderRadius: 8
        }}>
          <Image source={data.item.source} resizeMode={'contain'}
            style={{ height: 144, width: (width - 24) / 3 }}
          />
        </View>
      </TouchableOpacity>
    );
  }

  _formatData = (data) => {
    if (!data)
      return []

    const numberOfFullRows = Math.floor(data.length / 3);

    let numberOfElementsLastRow = data.length - (numberOfFullRows * 3);
    while (numberOfElementsLastRow !== 3 && numberOfElementsLastRow !== 0) {
      data.push({ key: `blank-${numberOfElementsLastRow}`, empty: true });
      numberOfElementsLastRow++;
    }
    return data;
  };

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#141414', paddingBottom: 56 }}>
        {
          this.navigatedFrom === 'Home' ?
            (
              <View style={{ height: 36, width: width, alignItems: 'center', justifyContent: 'center' }}>
                <View style={{ width: 72, height: 4, backgroundColor: 'white', borderRadius: 2 }} />
              </View>
            )
            :
            (
              <Header header={'Discover'} />
            )
        }

        <View style={{}}>
          <FlatList
            data={this._formatData(DATA)}
            renderItem={this._renderItem}
            keyExtractor={(item: any) => item.id}
            numColumns={3}
          />
        </View>
      </View>
    )
  }
}