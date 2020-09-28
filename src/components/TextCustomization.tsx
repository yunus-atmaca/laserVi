import React from 'react'
import {
  View,
  StyleSheet,
  Dimensions,
  Text, ViewComponent
} from 'react-native'

import { TabView, TabBar } from 'react-native-tab-view';

interface TextCustomizationProps {

}

const initialLayout = { width: Dimensions.get('window').width };

class TextCustomization extends React.Component<TextCustomizationProps, any> {

  constructor(props) {
    super(props)

    this.state = {
      index: 0,
      routes: [
        { key: 'tab1', title: 'Font' },
        { key: 'tab2', title: 'Style' },
        { key: 'tab3', title: 'Size' },
      ]
    }
  }
  _renderTabBar = (props) => {
    return (
      <View>
        <TabBar
          {...props}
          onTabPress={({ route, preventDefault }) => {
          }}
          style={{
            backgroundColor: '',
            height: 32,
            width: '100%',
          }}
          renderLabel={this._renderLabel}
          indicatorStyle={{ backgroundColor: '#141414' }}
        />
      </View>
    );
  };

  _renderLabel = ({ route, focused }) => {
    return (
      <View style={{
        position: 'absolute',
        top: -24,
        height: 32,
        width: Dimensions.get('window').width / 3,
        backgroundColor: 'green',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <Text style={[{
          fontSize: 14,
          color: focused ? '#FF9900' : 'white'
        }]}>
          {route.title}
        </Text>
      </View>
    );
  }

  _renderScene = ({ route }) => {
    let data;
    let index;
    switch (route.key) {
      case 'tab1':
        data = '';
        index = 0
        break;
      case 'tab2':
        data = '';
        index = 1
        break;
      case 'tab2':
        data = '';
        index = 2
        break;
      default:
        return null;
    }

    return (
      <TabScene
        data={data}
        index={index}
      />
    );
  }

  render() {
    return (
      <TabView
        navigationState={{ index: this.state.index, routes: this.state.routes }}
        renderScene={this._renderScene}
        renderTabBar={this._renderTabBar}
        onIndexChange={(index) => {
          this.setState({ index: index })
        }}
        initialLayout={initialLayout}
      />
    )
  }
}

const styles = StyleSheet.create({
  scene: {
    flex: 1,
  },
});

export default TextCustomization


class TabScene extends React.Component<any, any> {
  render() {
    return (
      <View>

      </View>
    )
  }
}