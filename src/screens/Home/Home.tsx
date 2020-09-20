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

  bottomSheetInfo: any

  numberOfCreatedViews: number

  viewsJSON: any

  selectedViewId: any
  constructor(props) {
    super(props)

    this.selectedViewId = -1
    this.numberOfCreatedViews = 0

    this.viewsJSON = []

    this.state = {
      selectedButton: VIEW.NONE,
      textInputView: false,
      showBottomSheet: false,
      views: [],
    }
  }

  _panelClicked = (event) => {
    if (this.state.selectedButton === VIEW.NONE) {
      console.debug('NOTHING SELECTED')
    } else if (this.state.selectedButton === VIEW.TEXT) {
      if (this.state.views.length === this.numberOfCreatedViews) {
        this.selectedViewId = UUID();
        console.log(this.selectedViewId)
        let textInfo = {
          id: this.selectedViewId,
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
        this.setState({
          views: this.state.views.concat([this._createTextView(textInfo)])
        })
      } else {
        this[this.selectedViewId]._setState(
          {
            top: event.nativeEvent.locationY,
            left: event.nativeEvent.locationX
          }
        )
      }
    } else if (this.state.selectedButton === VIEW.IMAGE) {

    }
  }

  _textClicked = () => {
    if (this.state.selectedButton === VIEW.NONE) {
      this.setState({ selectedButton: VIEW.TEXT })
    } else {
      if (this.state.selectedButton === VIEW.IMAGE) {
        this.setState({ selectedButton: VIEW.TEXT })
      } else {
        this.setState({ selectedButton: VIEW.NONE })
      }
    }
  }

  _imageClicked = () => {
    if (this.state.selectedButton === VIEW.NONE) {
      this.setState({ selectedButton: VIEW.IMAGE })
    } else {
      if (this.state.selectedButton === VIEW.TEXT) {
        this.setState({ selectedButton: VIEW.IMAGE })
      } else {
        this.setState({ selectedButton: VIEW.NONE })
      }
    }
  }

  _checkViews = () => {

  }

  _setSelectedView = (id) => {

  }

  _createImageView = (props) => {

  }

  _createTextView = (props) => {
    return (
      <TextView
        key={props.id}
        id={props.id}
        onRef={(ref) => {
          this[props.id] = ref
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
      />
    )
  }

  _saveViewClicked = (props) => {
    this.numberOfCreatedViews += 1
    this.viewsJSON.push(props)
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
      this.numberOfCreatedViews -= 1
      let views = [...this.state.views]
      views.splice(deletedIndex, 1)
      this.viewsJSON.splice(deletedIndex, 1)
      this.setState(() => {
        return {
          views: views
        }
      })
    }
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
              <View style={styles.buttonContainer}>
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
              this.state.selectedButton === VIEW.TEXT && (
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