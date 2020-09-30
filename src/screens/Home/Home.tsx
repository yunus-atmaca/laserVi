import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

import Header from '../../components/Header'
import Button from '../../components/Button'
import TextCustomization from '../../components/TextCustomization'
import HelperText from '../../components/HelperText'
import TempTextInput from '../../components/TempTextInput'

const { width, height } = Dimensions.get('window')

const VIEW = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

interface TextCustomizationProps {
  font: string,
  style: string,
  size: number
}

interface HomeProps {

}

class Home extends React.Component<HomeProps, any>{
  panelRef: any
  textCustomization: TextCustomizationProps
  constructor(props) {
    super(props)

    this.state = {
      selectedButton: VIEW.TEXT,
      showHelperText: true,
      showTempTextInput: false,
    }

    this.textCustomization = {
      font: 'Roboto',
      style: 'Regular',
      size: 14
    }
  }

  _panelClicked = () => {
    if (this.state.showHelperText) {
      this.setState({ showHelperText: false })
    }

    if (this.state.selectedButton === VIEW.NONE) {
      console.debug('NOTHING SELECTED')
    } else if (this.state.selectedButton === VIEW.TEXT) {
      console.debug('TEXT SELECTED')

      this.setState({ showTempTextInput: true })
    } else if (this.state.selectedButton === VIEW.IMAGE) {
      console.debug('IMAGE SELECTED')

    }
  }

  _textClicked = () => {
    this.setState({ selectedButton: VIEW.TEXT })
  }

  _imageClicked = () => {
    this.setState({ selectedButton: VIEW.IMAGE })
  }

  _customizationSelected = (props) => {
    if (props.font) {
      this.textCustomization.font = props.font
    } else if (props.style) {
      this.textCustomization.style = props.style
    } else if (props.size) {
      this.textCustomization.size = props.size
    }
  }

  _textInputDone = (text) => {
    console.debug(text)
    this.setState({ showTempTextInput: false })
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <Header header={'Panel'} backgroundColor={'#141414'} />
          <TouchableWithoutFeedback onPress={() => {
            this._panelClicked()
          }}>
            <View
              ref={(ref) => {
                this.panelRef = ref
              }}
              style={styles.panel}>
              {
                this.state.showHelperText && (
                  <HelperText
                    selectedView={this.state.selectedButton}
                  />
                )
              }
            </View>
          </TouchableWithoutFeedback>
          <View style={styles.addingPanelContainer}>
            {
              this.state.selectedButton === VIEW.TEXT ?
                (
                  <TextCustomization
                    height={styles.addingPanelContainer.height}
                    customizationSelected={this._customizationSelected}
                  />
                )
                :
                (
                  null
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
        {
          this.state.showTempTextInput && (
            <TempTextInput
              value={'Yunus ATMACA'}
              selectedFont={this.textCustomization.font}
              selectedSize={this.textCustomization.size}
              selectedStyle={this.textCustomization.style}
              textInputDone={this._textInputDone}
            />
          )
        }
      </View >
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