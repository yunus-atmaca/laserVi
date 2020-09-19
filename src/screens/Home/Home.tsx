import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  TextInput
} from 'react-native'
import { ScrollView, } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import BottomSheetView from '../../components/BottomSheetView'
import TextView from '../../components/TextView'
import Header from '../../components/Header'

const { width, height } = Dimensions.get('window')

const button = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

import CustomizeText from '../../components/Customize'

export default class Home extends React.PureComponent<any, any> {

  customizeTextRef: any

  textInputPos: any
  bottomSheetInfo: any

  numberOfCreatedViews: number

  views: any
  viewsJSON: any
  constructor(props) {
    super(props)

    this.numberOfCreatedViews = 0
    this.textInputPos = {}

    this.views = []
    this.viewsJSON = []

    this.state = {
      selectedButton: button.NONE,
      textInputView: false,
      showBottomSheet: false,
      views: [],
      selectedViewId: -1
    }
  }

  _panelClicked = (event) => {
    //console.debug('_panelClicked')

    console.debug('Number of created view: ', this.numberOfCreatedViews)

    if (this.state.selectedButton === button.NONE) {
      console.debug('NOTHING SELECTED')
    } else if (this.state.selectedButton === button.TEXT) {
      if (this.viewsJSON.length === this.numberOfCreatedViews) {
        //console.debug('viewsJSON: ', this.viewsJSON.length)
        let textInfo = {
          ref: this.numberOfCreatedViews,
          type: button.TEXT,
          view: {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX,
            fontSize: this.customizeTextRef._getTextAttribute().size,
            fontFamily: this.customizeTextRef._getTextAttribute().font,
            saved: false,
            text: ''
          }
        }

        this.viewsJSON.push(textInfo)
        this.views.push(this._createTextView(textInfo))

        this.setState({ views: [] }, () => {
          this.setState({ views: this.views })
        })
      } else if (this.numberOfCreatedViews < this.viewsJSON.length) {
        //console.debug('viewsJSON: ', this.viewsJSON.length)

        this.viewsJSON.splice(-1, 1)
        this.views.splice(-1, 1)

        let textInfo = {
          ref: this.views.length,
          type: button.TEXT,
          view: {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX,
            fontSize: this.customizeTextRef._getTextAttribute().size,
            fontFamily: this.customizeTextRef._getTextAttribute().font,
            saved: false,
            text: ''
          }
        }

        this.viewsJSON.push(textInfo)
        this.views.push(this._createTextView(textInfo))

        this.setState({ views: [] }, () => {
          this.setState({ views: this.views })
        })
      }
    } else if (this.state.selectedButton === button.IMAGE) {

    }
  }

  _textClicked = () => {
    //console.debug('_textClicked')
    /*if (this.state.textInputView) {
      this.textInputPos = {}
      this.setState({ textInputView: false })
    }*/

    if (this.state.selectedButton === button.NONE) {
      this.setState({ selectedButton: button.TEXT })
    } else {
      if (this.state.selectedButton === button.IMAGE) {
        this.setState({ selectedButton: button.TEXT })
      } else {
        this.setState({ selectedButton: button.NONE })
      }
    }
  }

  _imageClicked = () => {
    //console.debug('_imageClicked')

    /*if (this.state.textInputView) {
      this.textInputPos = {}
      this.setState({ textInputView: false })
    }*/

    if (this.state.selectedButton === button.NONE) {
      this.setState({ selectedButton: button.IMAGE })
    } else {
      if (this.state.selectedButton === button.TEXT) {
        this.setState({ selectedButton: button.IMAGE })
      } else {
        this.setState({ selectedButton: button.NONE })
      }
    }
  }

  _createTextView = (props) => {
    return (
      <TextView
        key={props.ref}
        id={props.ref}
        onRef={(ref) => {
          props.ref = ref
        }}
        text={props.view.text}
        saved={props.view.saved}
        top={props.view.top}
        left={props.view.left}
        fontSize={props.view.fontSize}
        fontFamily={props.view.fontFamily}
        saveViewClicked={this._saveViewClicked}
        removeViewClicked={this._removeViewClicked}
      />
    )
  }

  _saveViewClicked = (props) => {
    console.debug('_saveViewClicked: ', props.id)
    this.numberOfCreatedViews += 1
    this.viewsJSON[props.id].view.saved = props.saved
    this.viewsJSON[props.id].view.text = props.text

    this.views[props.id] = this._createTextView(this.viewsJSON[props.id])
    //console.debug(this.viewsJSON)
  }

  _removeViewClicked = (id) => {
    console.debug('_removeViewClicked: ', id)
  }

  _getContainerSize = (button) => {
    return button === this.state.selectedButton ? 32 : 36
  }

  _getButtonSize = (button) => {
    return button === this.state.selectedButton ? 28 : 32
  }

  render() {
    return (
      <View style={{ flex: 1, backgroundColor: '#141414' }}>
        <Header header={'Panel'} />
        <ScrollView
          keyboardShouldPersistTaps={'always'}
          showsVerticalScrollIndicator={false}>
          <TouchableWithoutFeedback onPress={(event) => {
            this._panelClicked(event)
          }}>
            <View style={{ width: width, height: width, backgroundColor: 'white' }}>
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
          <View style={{
            paddingHorizontal: 12,
            paddingTop: 12,
            marginBottom: 24,
            backgroundColor: '#141414'
          }}>
            <View style={{ flexDirection: 'row', height: 72 }}>
              <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this._textClicked}>
                  <View style={[styles.button, {
                    width: this._getContainerSize(button.TEXT),
                    height: this._getContainerSize(button.TEXT),
                    backgroundColor: '#bfbfbf',
                  }]}>
                    <MaterialCommunityIcons
                      name={'format-text'}
                      size={this._getButtonSize(button.TEXT)}
                      color={'black'} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableWithoutFeedback onPress={this._imageClicked}>
                  <View style={[styles.button, {
                    width: this._getContainerSize(button.IMAGE),
                    height: this._getContainerSize(button.IMAGE),
                    backgroundColor: '#bfbfbf',
                  }]}>
                    <MaterialCommunityIcons
                      name={'image-outline'}
                      size={this._getButtonSize(button.IMAGE)}
                      color={'black'} />
                  </View>
                </TouchableWithoutFeedback>
              </View>
            </View>
            {
              this.state.views.length > 0 && (
                <View style={{}}>
                  <Text style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Roboto-Regular',
                  }}>
                    Views
                  </Text>
                  <View style={{
                    backgroundColor: '#bfbfbf',
                    width: '100%',
                    height: 1,
                    marginTop: 4
                  }} />
                  <View style={{ width: '100%', paddingVertical: 4 }}>
                    <View style={{ flexDirection: 'row' }}>
                      <View style={{
                        flex: 5,
                        justifyContent: 'center',
                      }}>
                        <Text
                          ellipsizeMode={'tail'}
                          numberOfLines={1}
                          style={{
                            marginHorizontal: 4,
                            color: 'white',
                            fontSize: 14,
                            fontFamily: 'Roboto-Regular'
                          }}>
                          Text</Text>
                      </View>
                      <View style={{ flex: 2 }}>
                        <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                          <View style={{
                            height: 24,
                            width: 24,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <MaterialCommunityIcons name={'drag-variant'} size={18} color={'white'} />
                          </View>
                          <View style={{
                            height: 24,
                            width: 24,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <MaterialCommunityIcons name={'check-circle'} size={18} color={'green'} />
                          </View>
                          <View style={{
                            height: 24,
                            width: 24,
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                            <MaterialCommunityIcons name={'close-circle'} size={18} color={'red'} />
                          </View>
                        </View>
                      </View>
                    </View>
                  </View>
                </View>
              )
            }
            {
              this.state.selectedButton === button.TEXT && (
                <CustomizeText
                  onRef={(ref) => { this.customizeTextRef = ref }}
                  openBottomSheet={(info) => {
                    this.bottomSheetInfo = info
                    this.setState({ showBottomSheet: true })
                  }} />
              )
            }
          </View>
        </ScrollView>
        {
          this.state.showBottomSheet && (
            <BottomSheetView
              data={this.bottomSheetInfo.data}
              navigatedFrom={this.bottomSheetInfo.navigatedFrom}
              font={this.bottomSheetInfo.font}
              onCloseEnd={() => {
                this.setState({ showBottomSheet: false })
              }}
              selectedData={(which, data) => {
                this.customizeTextRef._updateState(which, data)
              }}
            />
          )
        }
      </View >
    )
  }
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center'
  },
  buttonContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    paddingTop: 0,
    paddingBottom: 0,
    textAlign: 'center'
  },
  textSectionLeft: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  textSectionRight: {
    color: 'white',
    fontSize: 16,
    marginStart: 12
  },
})