import React, { Component } from 'react';
import { Platform, StyleSheet, View, ImageBackground, Image, PermissionsAndroid, Alert } from 'react-native';
import { Button, Text, Content, H1, H3 } from 'native-base';
import { CameraKitCameraScreen } from 'react-native-camera-kit';

export default class main extends React.Component {
  state = { isPermitted: false };
  constructor(props) {
    super(props);
  }
  //Function to access camera and your gallery
  onPress() {
    var that = this;
    if (Platform.OS === 'android') {
      async function requestCameraPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.CAMERA,
            {
              title: 'CameraExample App Camera Permission',
              message: 'CameraExample App needs access to your camera ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If CAMERA Permission is granted
            //Calling the WRITE_EXTERNAL_STORAGE permission function
            requestExternalWritePermission();
          } else {
            alert('CAMERA permission denied');
          }
        } catch (err) {
          alert('Camera permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalWritePermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App External Storage Write Permission',
              message:
                'CameraExample App needs access to Storage data in your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If WRITE_EXTERNAL_STORAGE Permission is granted
            //Calling the READ_EXTERNAL_STORAGE permission function
            requestExternalReadPermission();
          } else {
            alert('WRITE_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Write permission err', err);
          console.warn(err);
        }
      }
      async function requestExternalReadPermission() {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            {
              title: 'CameraExample App Read Storage Read Permission',
              message: 'CameraExample App needs access to your SD Card ',
            }
          );
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //If READ_EXTERNAL_STORAGE Permission is granted
            //changing the state to re-render and open the camera
            //in place of activity indicator
            that.setState({ isPermitted: true });
          } else {
            alert('READ_EXTERNAL_STORAGE permission denied');
          }
        } catch (err) {
          alert('Read permission err', err);
          console.warn(err);
        }
      }
      //Calling the camera permission function
      requestCameraPermission();
    } else {
      this.setState({ isPermitted: true });
    }
  }
  onBottomButtonPressed(event) {
    const captureImages = JSON.stringify(event.captureImages);
    var id = Object.keys(event.captureImages).length - 1;
    if (event.type === 'left') {
      this.setState({ isPermitted: false });
    } else {
      this.props.navigation.navigate("CheckinScreen", { uriImage: event.captureImages[id].uri })
      // alert(Object.keys(event.captureImages).length)
    }
  }

  render() {
    if (this.state.isPermitted) {
      // alert(this.state.isPermitted);
      return (
        <CameraKitCameraScreen
          // Buttons to perform action done and cancel
          actions={{ leftButtonText: 'Cancel' }}
          onBottomButtonPressed={event => this.onBottomButtonPressed(event)}
          // onBottomButtonPressed={(uri) => this.props.navigation.navigate("ImageScreen")}
          flashImages={{
            // Flash button images
            on: require('../../assets/images/icons-photo/flashon2.png'),
            off: require('../../assets/images/icons-photo/flashoff2.png'),
            auto: require('../../assets/images/icons-photo/flashauto2.png'),
          }}
          cameraFlipImage={require('../../assets/images/icons-photo/flip2.png')}
          captureButtonImage={require('../../assets/images/icons-photo/capture2.png')}
          cameraOptions={{
            flashMode: 'auto',
            focusMode: 'on',
            zoomMode: 'on',
            ratioOverlay: '1:1',
            ratioOverlayColor: '#00000077'
          }}
        />
      );
    } else {
      return (
        <View style={styles.container}>
          <ImageBackground
            source={require('../../assets/images/background.png')}
            style={styles.bgImage}
            resizeMode="cover"
          >
            <View style={styles.center}>
              <Image
                source={require('../../assets/images/gallery.png')}
                style={styles.icon}
              >
              </Image>
            </View>
            <Content>
              <H1
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingTop: 60,
                  fontWeight: 'bold',
                }}
              >TAKE YOUR PHOTO
              </H1>
              <H3
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingTop: 20,
                  fontSize: 20,
                }}
              >So we can know your location and time checkin.
              </H3>
              <H3
                style={{
                  textAlign: 'center',
                  color: '#fff',
                  paddingTop: 10,
                  fontSize: 18,
                }}
              >Checkin Now!
              </H3>
            </Content>
            <Button
              rounded
              light
              block
              style={styles.demoButton}
              onPress={this.onPress.bind(this)}
            >
              <Text style={styles.textButton}>Take your photo here</Text>
            </Button>
          </ImageBackground>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#254F6E',
    paddingHorizontal: 15,
  },
  bgImage: {
    flex: 1,
    marginHorizontal: -20,
  },
  demoButton: {
    bottom: 20,
    marginLeft: 20,
    marginRight: 20,
    height: 50,
    borderColor: '#5A81F7',
    borderWidth: 1,
    borderRadius: 5,
  },
  demoItem: {
    marginVertical: 15,
  },
  textButton: {
    color: '#5A81F7',
    fontSize: 14,
    fontWeight: 'bold',
  },
  icon: {
    marginTop: 50,
    width: 200,
    height: 200,
    tintColor: '#fff',
    paddingBottom: 50,
  },
  center: {
    alignItems: 'center',
    justifyContent: 'center'
  }
});

