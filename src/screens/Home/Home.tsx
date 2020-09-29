import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Header from '../../components/Header'
import Button from '../../components/Button'
import TextCustomization from '../../components/TextCustomization'
import HelperText from '../../components/HelperText'

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
      selectedButton: VIEW.TEXT,
      showHelperText: true
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
        <ScrollView>
          <Header header={'Panel'} backgroundColor={'#141414'} />
          <View style={styles.panel}>
            {
              this.state.showHelperText && (
                <HelperText
                  selectedView={this.state.selectedButton}
                />
              )
            }
          </View>
          <View style={styles.addingPanelContainer}>
            {
              this.state.selectedButton === VIEW.TEXT ?
                (
                  <TextCustomization
                    height={styles.addingPanelContainer.height}
                  />
                )
                :
                (
                  <TextCustomization
                    height={styles.addingPanelContainer.height}
                  />
                )
            }
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

          <View style={{
            alignSelf: 'center',
            backgroundColor: '#FF9900',
            height: 36,
            width: 144,
            borderRadius: 18,
            marginVertical: 18,
            alignItems: 'center',
            justifyContent: 'center'
          }}>
            <Text style={{
              color: 'white',
              fontSize: 18,
              fontFamily: 'Roboto-Bold',
            }}>
              Preview
            </Text>
          </View>
        </ScrollView>
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
    height: 150,
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