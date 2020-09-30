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

import TextView from '../../components/TextView'
import ImageView from '../../components/ImageView'

import UUID from '../../utils/UUID'

const { width, height } = Dimensions.get('window')

const VIEW = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

interface selectedViewProps {
  id: string,
  type: string
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

  viewsRef: any

  selectedView: selectedViewProps
  enteredText: string
  constructor(props) {
    super(props)

    this.viewsRef = {}
    this.enteredText = ''

    this.state = {
      selectedButton: VIEW.TEXT,
      showHelperText: true,
      showTempTextInput: false,
      views: [],
    }

    this.textCustomization = {
      font: 'Roboto',
      style: 'Regular',
      size: 16
    }

    this.selectedView = {
      id: '',
      type: VIEW.NONE
    }
  }

  _panelClicked = (event) => {
    console.debug('_panelClicked')

    if (this.state.showHelperText) {
      this.setState({ showHelperText: false })
    }

    if (this.selectedView.id !== '') {
      this._setUnselectedEveryThing()
      return
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

    //console.log(this.selectedView)

    if (this.selectedView.id !== '') {
      if (this.selectedView.type === VIEW.TEXT) {
        this.viewsRef[this.selectedView.id]._setState({
          fontSize: this.textCustomization.size,
          fontFamily: this.textCustomization.font,
          fontStyle: this.textCustomization.style
        })
      } else {
        console.debug('_customizationSelected')
      }
    }
  }

  _textInputDone = (text) => {
    this.setState({ showTempTextInput: false })

    if (text === '') {
      console.debug('No text entered')
      if (this.state.selectedButton === VIEW.TEXT) {
        this.setState({ showHelperText: true })
      }
      return
    }

    if (this.selectedView.type === VIEW.IMAGE) {
      console.debug('Something is wrong selectedView IMAGE')
      return;
    }

    if (this.selectedView.type === VIEW.NONE) {
      let id = UUID()

      let textInfo = {
        id: id,
        type: VIEW.TEXT,
        view: {
          textCustomization: this.textCustomization,
          selected: true,
          saved: false,
          text: text,
        }
      }

      this.setState({
        views: this.state.views.concat([this._createTextView(textInfo)]),
      }, () => {
        this._setSelectedView({
          id: id,
          type: VIEW.TEXT
        });
      })
    } else {
      //Selected TEXT
      this.viewsRef[this.selectedView.id]._setState({ text: text })
    }
  }

  _setUnselectedEveryThing = () => {
    if (this.selectedView.id !== '') {
      this.viewsRef[this.selectedView.id]._setSelected(null, false)
      this.selectedView = {
        id: '',
        type: VIEW.NONE
      }
    }
  }

  _setSelectedView = (view) => {
    if (this.selectedView.id === '') {
      this.viewsRef[view.id]._setSelected(null, true)
    } else {
      if (view.id !== this.selectedView.id) {
        //console.debug('FALSE: ' + view.id + ' | | ' + this.selectedView.id)
        this.viewsRef[this.selectedView.id]._setSelected(null, false)
        //this.viewsInfoRef[this.selectedView.id]._setState({ selected: false })
        //this.viewsJSON[this.selectedView.index].view.selected = false
      }

      if (view.id !== this.selectedView.id) {
        //console.debug('TRUE: ' + view.id + ' | | ' + this.selectedView.id)
        this.viewsRef[view.id]._setSelected(null, true)
        //this.viewsInfoRef[view.id]._setState({ selected: true })
        //this.viewsJSON[view.index].view.selected = true
      }

    }
    this.selectedView = view;
  }

  _createViewInfo = (props) => {
    /*return (
      <ViewInfo
        key={props.id}
        id={props.id}
        index={props.index}
        onRef={(ref) => {
          this.viewsInfoRef[props.id] = ref
        }}
        selected={props.view.selected}
        name={props.type === VIEW.TEXT ? props.view.text : props.view.image.title}
        saved={props.view.saved}
        type={props.type}
        saveViewClicked={this._saveViewClicked}
        removeViewClicked={this._removeViewClicked}
        onFocus={this._onFocusView}
      />
    )*/
  }

  _createImageView = (props) => {
    /*return (
      <ImageView
        key={props.id}
        id={props.id}
        index={props.index}
        onRef={(ref) => {
          //this.viewsRef[props.id] = ref
        }}
        selected={props.view.selected}
        image={props.view.image}
        saved={props.view.saved}
        top={props.view.top}
        left={props.view.left}
      //saveViewClicked={this._saveViewClicked}
      //removeViewClicked={this._removeViewClicked}
      //onFocus={this._onFocusView}
      />
    )*/
  }

  _createTextView = (props) => {
    return (
      <TextView
        key={props.id}
        id={props.id}
        onRef={(ref) => {
          this.viewsRef[props.id] = ref
        }}
        selected={props.view.selected}
        text={props.view.text}
        saved={props.view.saved}
        textCustomization={props.view.textCustomization}
        onFocus={this._setSelectedView}
        editText={(text) => {
          this.enteredText = text
          this.setState({ showTempTextInput: true })
        }}
      />
    )
  }

  render() {
    return (
      <View style={styles.container}>
        <ScrollView>
          <TouchableWithoutFeedback onPress={(event) => {
            this._panelClicked(event)
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
              {
                this.state.views.length > 0 && (
                  this.state.views.map(view => {
                    return (
                      view
                    )
                  })
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
              iconColor={this.state.selectedButton === VIEW.TEXT ?
                '#FF9900' : 'white'}
              indicatorColor={this.state.selectedButton === VIEW.TEXT ?
                '#FF9900' : '#141414'}
              action={this._textClicked}
            />
            <Button
              iconName={'image-outline'}
              iconColor={this.state.selectedButton === VIEW.IMAGE ?
                '#FF9900' : 'white'}
              indicatorColor={this.state.selectedButton === VIEW.IMAGE ?
                '#FF9900' : '#141414'}
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
              value={this.enteredText}
              selectedFont={this.textCustomization.font}
              selectedSize={this.textCustomization.size}
              selectedStyle={this.textCustomization.style}
              textInputDone={this._textInputDone}
              close={() => {
                if (this.state.selectedButton === VIEW.TEXT &&
                  this.selectedView.id === '') {
                  this.setState({
                    showTempTextInput: false,
                    showHelperText: true
                  })
                } else {
                  this.setState({ showTempTextInput: false })
                }
              }}
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
    backgroundColor: '#141414'
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