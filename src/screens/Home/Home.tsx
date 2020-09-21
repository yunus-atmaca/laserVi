import React from 'react'
import {
  View,
  Text,
  Dimensions,
  StyleSheet,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ViewShot, { captureRef } from "react-native-view-shot";

import BottomSheetView from '../../components/BottomSheetView'
import TextView from '../../components/TextView'
import ViewInfo from '../../components/ViewInfo'
import Header from '../../components/Header'
import UUID from '../../utils/UUID'

const { width, height } = Dimensions.get('window')

const VIEW = {
  TEXT: 'text',
  IMAGE: 'image',
  NONE: 'none'
}

import CustomizeText from '../../components/Customize'

export default class Home extends React.PureComponent<any, any> {

  customizeTextRef: any
  viewsRef: any
  viewsInfoRef: any
  panelRef: any

  bottomSheetInfo: any

  numberOfCreatedViews: number

  viewsJSON: any

  selectedView: any
  constructor(props) {
    super(props)

    this.selectedView = {
      index: -1,
      id: ''
    }

    this.numberOfCreatedViews = 0

    this.viewsJSON = []

    this.viewsRef = {}
    this.viewsInfoRef = {}

    this.state = {
      selectedButton: VIEW.NONE,
      textInputView: false,
      showBottomSheet: false,
      views: [],
      viewsInfo: []
    }
  }

  _panelClicked = (event) => {
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
          views: this.state.views.concat([this._createTextView(textInfo)]),
          viewsInfo: this.state.viewsInfo.concat([this._createViewInfo(textInfo)]),
        }, () => {
          this._setSelectedView({
            index: this.numberOfCreatedViews,
            id: id
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

    }
  }

  _textClicked = () => {
    if (this.state.selectedButton === VIEW.NONE) {
      this.setState({ selectedButton: VIEW.TEXT })
    } else {
      if (this.state.selectedButton === VIEW.IMAGE) {
        this._checkViews()
        this.setState({ selectedButton: VIEW.TEXT })
      } else {
        this._checkViews()
        this.setState({ selectedButton: VIEW.NONE })
      }
    }
  }

  _imageClicked = () => {
    if (this.state.selectedButton === VIEW.NONE) {
      this.setState({ selectedButton: VIEW.IMAGE })
    } else {
      if (this.state.selectedButton === VIEW.TEXT) {
        this._checkViews()
        this.setState({ selectedButton: VIEW.IMAGE })
      } else {
        this._checkViews()
        this.setState({ selectedButton: VIEW.NONE })
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
      console.log(this.viewsJSON[i].view.saved)
      if (!this.viewsJSON[i].view.saved) {
        this._removeViewClicked(this.viewsJSON[i].id)
      }
    }
  }

  _setSelectedView = (view) => {
    if (this.selectedView.index !== -1) {
      if (view.id !== this.selectedView.id) {
        //console.debug('FALSE: ' + view.id + ' | | ' + this.selectedView.id)
        this.viewsRef[this.selectedView.id]._setState({ selected: false })
        this.viewsInfoRef[this.selectedView.id]._setState({ selected: false })
        this.viewsJSON[this.selectedView.index].view.selected = false
      }
    }

    if (view.id !== this.selectedView.id) {
      //console.debug('TRUE: ' + view.id + ' | | ' + this.selectedView.id)
      this.viewsRef[view.id]._setState({ selected: true })
      this.viewsInfoRef[view.id]._setState({ selected: true })
      this.viewsJSON[view.index].view.selected = true
    }

    this.selectedView = view;
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
        name={props.view.text}
        saved={props.view.saved}
        type={props.type}
        saveViewClicked={this._saveViewClicked}
        removeViewClicked={this._removeViewClicked}
        onFocus={this._onFocusView}
      />
    )
  }

  _createImageView = (props) => {

  }

  _createTextView = (props) => {
    return (
      <TextView
        key={props.id}
        id={props.id}
        index={props.index}
        onRef={(ref) => {
          this.viewsRef[props.id] = ref
        }}
        selected={props.view.selected}
        text={props.view.text}
        saved={props.view.saved}
        top={props.view.top}
        left={props.view.left}
        fontSize={props.view.fontSize}
        fontFamily={props.view.fontFamily}
        saveViewClicked={this._saveViewClicked}
        removeViewClicked={this._removeViewClicked}
        onTextChange={this._onTextChange}
        onFocus={this._onFocusView}
      />
    )
  }

  _saveViewClicked = (props) => {
    this.numberOfCreatedViews += 1
    let index = this._getIndexById(props.id)
    if (index >= 0) {
      this.viewsJSON[index].view.selected = props.view.selected
      this.viewsJSON[index].view.saved = props.view.saved
      this.viewsJSON[index].view.text = props.view.text
      this.viewsJSON[index].view.fontSize = props.view.fontSize
      this.viewsJSON[index].view.fontFamily = props.view.fontFamily
      this.viewsJSON[index].view.top = props.view.top
      this.viewsJSON[index].view.left = props.view.left
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

  _onFocusView = (id) => {
    this._setSelectedView({ id: id, index: this._getIndexById(id) })
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
            <View
              ref={(ref) => {
                this.panelRef = ref
              }}
              style={{ width: width, height: width, backgroundColor: 'white' }}>
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
              <View style={{ flex: 1, flexDirection: 'row' }}>
                <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
                  <TouchableWithoutFeedback onPress={this._textClicked}>
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
                  <TouchableWithoutFeedback onPress={this._imageClicked}>
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
                  <Text style={{
                    color: 'white',
                    fontSize: 18,
                    fontFamily: 'Roboto-Regular',
                    marginVertical: 8
                  }}>
                    Views
                  </Text>
                  {/*<View style={{
                    backgroundColor: '#bfbfbf',
                    width: '100%',
                    height: 1,
                    marginTop: 4,
                    marginBottom: 8,
                  }} />*/}
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
          <TouchableWithoutFeedback onPress={() => {
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
          </TouchableWithoutFeedback>
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
                //console.log(which)
                //console.debug(data)
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