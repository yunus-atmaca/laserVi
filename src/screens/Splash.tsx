import React from 'react'
import { View, Image, Dimensions, Text } from 'react-native'
import { CommonActions } from '@react-navigation/native';

const { width, height } = Dimensions.get('window')

export default class Splash extends React.Component<any, any>{

  componentDidMount() {
    setTimeout(() => {
      this._navigateMain();
    }, 500);
  }

  _navigateMain = () => {
    this.props.navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: 'Main', params: {} }
        ],
      })
    );
  }

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={{ fontSize: 24, fontWeight: 'bold' }}>
          Splash
        </Text>
      </View>
    )
  }
}