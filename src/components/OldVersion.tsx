import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { captureRef } from "react-native-view-shot";

import BottomSheetView from './BottomSheetView'
import BottomSheetImages from './BottomSheetImages'

import TextView from './TextView'
import ViewInfo from './ViewInfo'
import ImageView from './ImageView'
import TextSize from './TextSize'

import Header from './Header'
import UUID from '../utils/UUID'

const { width, height } = Dimensions.get('window')

const VIEW = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

import CustomizeText from './Customize'

export default class Home extends React.PureComponent<any, any> {

  customizeTextRef: any
  viewsRef: any
  viewsInfoRef: any
  panelRef: any
  bottomSheetImgRef: any

  bottomSheetInfo: any

  numberOfCreatedViews: number

  viewsJSON: any

  selectedView: any

  selectedImageInfo: any

  currentTextSize: number
  constructor(props) {
    super(props)

    this.selectedView = {
      index: -1,
      id: '',
      type: VIEW.NONE
    }

    this.selectedImageInfo = false

    this.numberOfCreatedViews = 0
    this.currentTextSize = 12

    this.viewsJSON = []

    this.viewsRef = {}
    this.viewsInfoRef = {}

    this.state = {
      selectedButton: VIEW.NONE,
      textInputView: false,
      showBottomSheet: false,
      views: [],
      viewsInfo: [],
      showBottomSheetImages: false,
      showHelperText: false,
      isSelectedViewText: false
    }
  }

  _panelClicked = (event) => {
    if (this.state.showHelperText) {
      this.setState({ showHelperText: false })
    }

    if (this.state.selectedButton === VIEW.NONE) {
      console.debug('NOTHING SELECTED')
    } else if (this.state.selectedButton === VIEW.TEXT) {
      if (this.state.views.length === this.numberOfCreatedViews) {
        let id = UUID()

        let textInfo = {
          id: id,
          type: VIEW.TEXT,
          view: {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX,
            fontSize: this.customizeTextRef._getTextAttribute().size,
            fontFamily: this.customizeTextRef._getTextAttribute().font,
            selected: true,
            saved: false,
            text: ''
          }
        }

        this.viewsJSON.push(textInfo)
        this.setState({
          //views: this.state.views.concat([this._createTextView(textInfo)]),
          viewsInfo: this.state.viewsInfo.concat([this._createViewInfo(textInfo)]),
        }, () => {
          this._setSelectedView({
            index: this.numberOfCreatedViews,
            id: id,
            type: VIEW.TEXT
          });
        })

      } else {
        /*this.viewsRef[this.selectedView.id]._setState(
          {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX
          }
        )*/

        //this.viewsJSON[this.selectedView.index].view.top = event.nativeEvent.locationY;
        // this.viewsJSON[this.selectedView.index].view.left = event.nativeEvent.locationX;
      }
    } else if (this.state.selectedButton === VIEW.IMAGE) {
      if (this.state.views.length === this.numberOfCreatedViews) {
        let id = UUID()

        let ImageInfo = {
          id: id,
          type: VIEW.IMAGE,
          view: {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX,
            selected: true,
            saved: false,
            image: this.selectedImageInfo,
          }
        }

        this.viewsJSON.push(ImageInfo)
        this.setState({
          //views: this.state.views.concat([this._createImageView(ImageInfo)]),
          viewsInfo: this.state.viewsInfo.concat([this._createViewInfo(ImageInfo)]),
        }, () => {
          this._setSelectedView({
            index: this.numberOfCreatedViews,
            id: id,
            type: VIEW.IMAGE
          });
        })
      } else {

      }
    }
  }

  _getIndexById = (id) => {
    let mIndex = -1
    for (let i = 0; i < this.viewsJSON.length; ++i) {
      if (this.viewsJSON[i].id === id) {
        mIndex = i
        break;
      }
    }

    return mIndex
  }

  _checkViews = () => {
    for (let i = 0; i < this.viewsJSON.length; ++i) {
      if (!this.viewsJSON[i].view.saved) {
        this._removeViewClicked(this.viewsJSON[i].id)
      }
    }
  }

  _setSelectedView = (view) => {
    if (this.selectedView.index !== -1) {
      if (view.id !== this.selectedView.id) {
        //console.debug('FALSE: ' + view.id + ' | | ' + this.selectedView.id)
        this.viewsRef[this.selectedView.id]._setSelected(null, false)
        this.viewsInfoRef[this.selectedView.id]._setState({ selected: false })
        this.viewsJSON[this.selectedView.index].view.selected = false
      }
    }

    if (view.id !== this.selectedView.id) {
      //console.debug('TRUE: ' + view.id + ' | | ' + this.selectedView.id)
      this.viewsRef[view.id]._setSelected(null, true)
      this.viewsInfoRef[view.id]._setState({ selected: true })
      this.viewsJSON[view.index].view.selected = true
    }

    this.selectedView = view;
    if (this.selectedView.type === VIEW.TEXT) {
      this.setState({ isSelectedViewText: true })
    } else {
      this.setState({ isSelectedViewText: false })
    }
  }

  _createViewInfo = (props) => {
    return (
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
    )
  }





  _saveViewClicked = (props) => {
    this.setState({ selectedButton: VIEW.NONE })
    this.numberOfCreatedViews += 1
    let index = this._getIndexById(props.id)
    if (index >= 0) {
      if (props.type === 'text') {
        this.viewsJSON[index].view.selected = props.view.selected
        this.viewsJSON[index].view.saved = props.view.saved
        this.viewsJSON[index].view.text = props.view.text
        this.viewsJSON[index].view.fontSize = props.view.fontSize
        this.viewsJSON[index].view.fontFamily = props.view.fontFamily
        this.viewsJSON[index].view.top = props.view.top
        this.viewsJSON[index].view.left = props.view.left
      } else {
        this.viewsJSON[index].view.selected = props.view.selected
        this.viewsJSON[index].view.saved = props.view.saved
        this.viewsJSON[index].view.top = props.view.top
        this.viewsJSON[index].view.left = props.view.left
      }
    }
  }

  _removeViewClicked = (id) => {
    let deletedIndex = -1
    for (let i = 0; i < this.viewsJSON.length; ++i) {
      if (this.viewsJSON[i].id === id) {
        deletedIndex = i
        break;
      }
    }

    if (deletedIndex !== -1) {
      if (this.viewsJSON[deletedIndex].view.saved) {
        this.numberOfCreatedViews -= 1
      }

      let views = [...this.state.views]
      let viewsInfo = [...this.state.viewsInfo]

      views.splice(deletedIndex, 1)
      viewsInfo.splice(deletedIndex, 1)
      this.viewsJSON.splice(deletedIndex, 1)

      if (this.selectedView.index === deletedIndex) {
        this.selectedView = {
          index: -1,
          id: ''
        }
      }

      this.setState(() => {
        return {
          views: views,
          viewsInfo: viewsInfo
        }
      })
    }
  }

  _onTextChange = (id, text) => {
    let index = this._getIndexById(id)
    if (index >= 0) {
      this.viewsInfoRef[id]._setState({ name: text })
    }
  }

  _onFocusView = (id, type) => {
    this._setSelectedView({ id: id, index: this._getIndexById(id), type: type })
  }

  _getContainerSize = (button) => {
    return button === this.state.selectedButton ? 28 : 36
  }

  _getButtonSize = (button) => {
    return button === this.state.selectedButton ? 24 : 32
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
            <View
              ref={(ref) => {
                this.panelRef = ref
              }}
              style={{ width: width, height: width, backgroundColor: 'white' }}>
              {
                this.state.showHelperText && (
                  <View
                    pointerEvents={'none'}
                    style={{
                      flex: 1,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text style={{
                      color: 'rgba(128,128,128, .7)',
                      fontSize: 24,
                      marginHorizontal: 48,
                      textAlign: 'center',
                      fontFamily: 'KronaOne-Regular'
                    }}>
                      {this.state.selectedButton === VIEW.TEXT ?
                        'Tab to add text' : 'Tab to add selected image'
                      }
                    </Text>
                  </View>
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
              {this.state.isSelectedViewText && (
                <View style={{
                  position: 'absolute',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  width: 24,
                  height: '100%',
                  justifyContent: 'center',
                }}>
                  <View style={{
                    width: '100%',
                    height: 150,
                  }}>
                    <TextSize
                      onSizeRelease={(size) => {

                        this.currentTextSize += (-size / 5)

                        this.currentTextSize = this.currentTextSize + (-size / 5) > 42 ?
                          42 : this.currentTextSize + (-size / 5)


                        console.debug(this.currentTextSize)
                      }}
                      onSizeChanged={(size) => {
                        console.debug('onSizeChanged: ', size)

                        this.viewsRef[this.selectedView.id]._setState({
                          fontSize: this.currentTextSize + (-size / 5)
                        })

                      }} />
                  </View>
                </View>
              )}
              {
                <View style={{
                  position: 'absolute',
                  bottom: 0,
                  left: 0,
                  right: 0,
                  height: 48,
                  backgroundColor: 'red'
                }}>

                </View>
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
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => {

                  }}>
                    <View style={[styles.button, {
                      width: this._getContainerSize(VIEW.TEXT),
                      height: this._getContainerSize(VIEW.TEXT),
                      backgroundColor: '#bfbfbf',
                    }]}>
                      <MaterialCommunityIcons
                        name={'format-text'}
                        size={this._getButtonSize(VIEW.TEXT)}
                        color={'black'} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 3, paddingStart: 8 }}>
                  <CustomizeText
                    onRef={(ref) => { this.customizeTextRef = ref }}
                    openBottomSheet={(info) => {
                      this.bottomSheetInfo = info
                      this.setState({ showBottomSheet: true })
                    }} />
                </View>
              </View>
              <View style={{
                backgroundColor: '#FF9900',
                width: 1,
                height: '100%',
              }} />
              <View style={{ flex: 1, flexDirection: 'row', paddingStart: 6 }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback onPress={() => {

                  }}>
                    <View style={[styles.button, {
                      width: this._getContainerSize(VIEW.IMAGE),
                      height: this._getContainerSize(VIEW.IMAGE),
                      backgroundColor: '#bfbfbf',
                    }]}>
                      <MaterialCommunityIcons
                        name={'image-outline'}
                        size={this._getButtonSize(VIEW.IMAGE)}
                        color={'black'} />
                    </View>
                  </TouchableWithoutFeedback>
                </View>
                <View style={{ flex: 3, paddingStart: 8 }}>
                  {/*Image*/}
                </View>
              </View>
            </View>
            <View style={{
              backgroundColor: '#FF9900',
              width: '100%',
              height: 1,
              marginTop: 8
            }} />
            {
              this.state.viewsInfo.length > 0 && (
                <View>
                  <View style={{
                    marginVertical: 8,
                    justifyContent: 'space-between',
                    width: '100%',
                    flexDirection: 'row',
                  }}>
                    <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                      <Text style={{
                        color: 'white',
                        fontSize: 18,
                        fontFamily: 'Roboto-Regular',
                      }}>
                        Views
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                      <TouchableOpacity>
                        <View style={{
                          height: 32,
                          width: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <MaterialCommunityIcons name={'check-circle'} size={25} color={'green'} />
                        </View>
                      </TouchableOpacity>
                      <TouchableOpacity>
                        <View style={{
                          height: 32,
                          width: 32,
                          justifyContent: 'center',
                          alignItems: 'center',
                        }}>
                          <MaterialCommunityIcons name={'close-circle'} size={25} color={'red'} />
                        </View>
                      </TouchableOpacity>
                    </View>
                  </View>
                  {
                    this.state.viewsInfo.map(view => {
                      return (
                        view
                      )
                    })
                  }
                </View>
              )
            }
          </View>
          <TouchableOpacity onPress={() => {
            const preview = () => {
              captureRef(this.panelRef, {
                format: "jpg",
                quality: 1
              }).then(
                uri => {
                  console.log("Image saved to", uri)
                  this.props.navigation.navigate('Preview', {
                    uri: uri
                  })
                },
                error => console.error("Oops, snapshot failed", error)
              );
            }

            for (const [key, value] of Object.entries(this.viewsInfoRef)) {
              if (this.viewsInfoRef[key]._setState !== null) {
                this.viewsInfoRef[key]._setState({ selected: false })
                //console.debug(this.viewsInfoRef[key])
              }
            }

            for (const [key, value] of Object.entries(this.viewsRef)) {
              if (this.viewsRef[key]._setSelected !== null) {
                this.viewsRef[key]._setSelected(preview, false)
              }
            }
          }}>
            <View style={{
              height: 44,
              width: 108,
              borderRadius: 22,
              backgroundColor: '#FF9900',
              alignSelf: 'center',
              marginVertical: 12,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <Text style={{
                color: 'white',
                fontSize: 18,
                fontWeight: 'bold',
                fontFamily: 'Roboto-Regular',
              }}>Preview</Text>
            </View>
          </TouchableOpacity>
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
        {
          this.state.showBottomSheetImages && (
            <BottomSheetImages
              onRef={(ref) => {
                this.bottomSheetImgRef = ref
              }}
              onImageSelected={(image) => {
                this.selectedImageInfo = image
                this.setState({ showHelperText: true })
              }}
              onCloseEnd={() => {
                if (!this.selectedImageInfo) {
                  this.setState({ selectedButton: VIEW.NONE })
                }
                //this.setState({ showBottomSheetImages: false })
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
    flexDirection: 'row'
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