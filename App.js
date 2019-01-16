/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import { Platform, StyleSheet, Text,TextInput, View, TouchableOpacity, TouchableWithoutFeedback, Image, Alert, CameraRoll } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import ViewShot from "react-native-view-shot";
import OptionsMenu from "react-native-options-menu";

type Props = {};
const memeOverlay = require('./app/images/memeoverlay.png');
const saveIcon = require('./app/images/save.png');
const infoIcon = require('./app/images/info.png');

export default class App extends Component<Props> {
  constructor(props) {
    super(props)
    this.state = {
      imageSource: null,
      crop: null,
      saveImageUri: null,
      text: 'Ah, thats hot',
      menuOptions: ["Camera", "Photo Library", "Cancel"]
    }
    
  }

  onCapture = () => {
    this.refs.viewShot.capture().then(uri => {
      //console.log(uri);
      var promise = CameraRoll.saveToCameraRoll(uri);
      promise.then(function(result) {
       // console.log('Save succeeded ' + result);
        alert('Imaged has been saved to your gallery')
      }).catch(function(error) {
        //console.log('Save failed ' + error);
        alert('Imaged was not saved. Maybe try to restart the app')
      });
    });
  
  }
  saveImage = () => {
    Alert.alert(
      'Would you like to save this image?',
      'Image will be saved to your photo gallery',
      [
        {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
        {text: 'Save', onPress: this.onCapture},
      ],
      { cancelable: false }
    )
  }
  info = () => {
    Alert.alert(
      'How to use?',
      '1. Change text by clicking on the text in the image. \n\n 2. Add funny image. \n\n 3. Save the image by long pressing the image or clicking on save button.',
      [
        {text: 'Got it!', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
      ],
      { cancelable: false }
    )
  }

  openLibrary = () => {
    ImagePicker.openPicker({
      width: 350,
      height: 150,
      cropping: true
    }).then(image => {
      const source = { uri: image.path };
      
      this.setState({
       imageSource: source
      });

      console.log(image)
    });
  }
  
  openCamera = () => {
    ImagePicker.openCamera({
      width: 350,
      height: 150,
      cropping: true
    }).then(image => {
      const cameraimage = { uri: image.path };
      
      this.setState({
       imageSource: cameraimage
      });

      console.log(image)
    });
  }
  render() {
    return (
      <View style={styles.container}>

      <View style={styles.header}>
        <Text style={styles.welcome}>Make a cool meme</Text>
      </View>

      <View style={{marginTop:30}}>
      <ViewShot ref="viewShot" options={{ format: "jpg", quality: 0.9 }}>
      <View style={styles.mid}>
          <Image
            style={{width:350,height:150,top:264,padding:10}}
            source={this.state.imageSource}
            resizeMode = 'cover'
          /> 
      </View>
      <TouchableWithoutFeedback onLongPress={this.saveImage}>
      <View style={styles.overlay}>
            <TextInput
            style={styles.text}
            onChangeText={(text) => this.setState({text})}
            value={this.state.text}
          />
          <Image
            style={styles.memeOverlay}
            source={memeOverlay}
          />
      </View>
      </TouchableWithoutFeedback>



      </ViewShot>     
       </View>
    

      <View style={styles.buttonField}>
      <OptionsMenu
        button="Add image"
        buttonStyle={styles.button}
        options={this.state.menuOptions}
        actions={[this.openCamera, this.openLibrary]}/>
      </View>

      <View style={styles.footer}>
        <TouchableOpacity onPress={this.info}>
          <Image source={infoIcon} style={{width:40,height:40, flex:1,resizeMode: 'contain'}} />
        </TouchableOpacity> 
        
        <TouchableOpacity onPress={this.saveImage}>
          <Image source={saveIcon} style={{width:25,height:25, top:-5, flex:1, resizeMode: 'contain'}}/>
        </TouchableOpacity>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center'
  },
  text: {
    position: 'relative',
    top:70,
    fontSize:25,
    textAlign: 'center',
    color: '#fff',
    zIndex: 999
  },
  buttonField: {
    top:-120,
    borderRadius:5,
    backgroundColor:'#ffc048',
    flexDirection: 'row',
    justifyContent: 'center'
  }, 
  header: {
    top:50,
  },
  button: {
    fontSize:20,
    width:150,
    padding:10,
    color:'#fff',
    textAlign: 'center'
  },
  tips: {
    top:-120
  },
  saveButton: {
    width:132,
    margin:10, 
    padding:5,
    borderRadius:50,
    borderRadius:5,
    backgroundColor:'#ffc048',
  },
  mid: {
    marginTop:50
  },
  welcome: {
    top:20,
    fontSize: 30,
    fontWeight: 'bold'
  },
  image: {
    flex:1,
    width:100
  },
  memeOverlay: {
    zIndex:1,
    top:-150,
    width:350,
    height:400
  },
  footer: {
    padding:15,
    position: 'absolute',
    flexDirection: 'row',
    justifyContent:'space-between',
    bottom:0,
    width:350,
    height:100,

  }
});