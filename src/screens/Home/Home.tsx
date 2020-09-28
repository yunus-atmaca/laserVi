import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'

import Header from '../../components/Header'
import Button from '../../components/Button'
import TextCustomization from '../../components/TextCustomization'

const { width, height } = Dimensions.get('window')

const VIEW = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

interface HomeProps {

}

class Home extends React.Component<HomeProps, any>{
  constructor(props) {
    super(props)

    this.state = {
      selectedButton: VIEW.TEXT
    }
  }

  _textClicked = () => {
    this.setState({ selectedButton: VIEW.TEXT })
  }

  _imageClicked = () => {
    this.setState({ selectedButton: VIEW.IMAGE })
  }

  render() {
    return (
      <View style={styles.container}>
        <Header header={'Panel'} backgroundColor={'#141414'} />
        <View style={styles.panel}>

        </View>
        <View style={styles.addingPanelContainer}>
          <TextCustomization />
        </View>
        <View style={styles.buttonContainer}>
          <Button
            iconName={'format-text'}
            iconColor={this.state.selectedButton === VIEW.TEXT ? '#FF9900' : 'white'}
            indicatorColor={this.state.selectedButton === VIEW.TEXT ? '#FF9900' : '#141414'}
            action={this._textClicked}
          />
          <Button
            iconName={'image-outline'}
            iconColor={this.state.selectedButton === VIEW.IMAGE ? '#FF9900' : 'white'}
            indicatorColor={this.state.selectedButton === VIEW.IMAGE ? '#FF9900' : '#141414'}
            action={this._imageClicked}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#141414'
  },
  panel: {
    height: width,
    width: width,
    backgroundColor: 'white'
  },
  addingPanelContainer: {
    height: 108,
    borderWidth: 1,
    borderColor: 'red',
    width: width,
  },
  buttonContainer: {
    width: width,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  }
})
export default Home