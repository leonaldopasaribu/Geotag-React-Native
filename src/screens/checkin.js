import React, { Component } from 'react';
import { Platform, StyleSheet, View, Image, TouchableOpacity, ScrollView, Alert, Dimensions, PermissionsAndroid } from 'react-native';
import { Text } from 'native-base';
import Geocode from 'react-geocode';
import openMap from 'react-native-open-maps';
import moment from "moment";
import { Button } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import LinearGradient from 'react-native-linear-gradient';
import Resource from '../network/Resource';

export default class checkin extends React.Component {
  constructor(props) {
    super(props);
    this.uriImage = this.props.navigation.getParam('uriImage', '');

    this.state = {
      ImageUrl: "",
      Location: this.findCoordinates(),
      Time: "",
      isPermitted: false
    };
  }

  //Function Get location
  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position => {
        const cordinateLatitude = JSON.stringify(position.coords.latitude);
        const cordinateLongitude = JSON.stringify(position.coords.longitude);
        this.setState({ cordinateLatitude, cordinateLongitude });
        // Api Key
        Geocode.setApiKey("AIzaSyB_x_Vx0JgUb08Tr8jGxfSbKrCgZ1S76QY");

        //Get address from latidude & longitude.
        Geocode.fromLatLng(cordinateLatitude, cordinateLongitude).then(
          response => {
            var address = response.results[0].formatted_address;
            this.setState({
              location: address,
            })
          },
          error => {
            alert(error);
            console.error(error);
          }
        );
      }
    )
  };

  submitCheckin() {
    let body = new FormData();
    console.log(this.uriImage)
    body.append('Location', this.state.location);
    body.append('Image', {
      uri: 'file://' + this.uriImage,
      type: 'image/jpeg', //This is the file type .. you can define according to your requirement
      name: 'Image.jpg',   //File name you want to pass
    })

    Resource.createCheckin(body)
      .then((res) => {
        this.resetForm();
        //alert("Submit Sukses")
        Alert.alert(
          '',
          'Checkin Success',
          [
            { text: 'OK', onPress: () => this.props.navigation.navigate("MainScreen") },
          ],
          { cancelable: false },
        );
      })
      .catch((err) => {
        alert(JSON.stringify(err))
      })
  }

  resetForm() {
    this.setState({
      Location: "",
      Image: "",
    })
  }

  //Open Gmaps Function
  openGmaps() {
    openMap({ latitude: this.cordinateLatitude, longitude: this.cordinateLongitude });
  }

  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.componentsImageSection}>
            <Text style={styles.componentSectionHeader}>Your Photo</Text>
            <Image
              source={{ uri: 'file://' + this.uriImage }}
              style={styles.image}
            />
            {/* <Button
              warning
              style={styles.buttonRetake}
              onPress={() => this.props.navigation.navigate("MainScreen")}
            >
              <Text style={styles.textBold}>RETAKE</Text>
            </Button> */}
            <Button
              icon={
                <Icon
                  name="refresh"
                  size={15}
                  color="white"
                />
              }
              title=" RETAKE"
              onPress={() => this.props.navigation.navigate("MainScreen")}
              ViewComponent={LinearGradient} // Don't forget this!
              linearGradientProps={{
                colors: ['#ED9A25', '#FFC05D'],
                start: { x: 0, y: 0.5 },
                end: { x: 1, y: 0.5 },
              }}
              
            />
          </View>
          <View style={styles.componentsSection}>
            <Text style={styles.componentSectionHeader}>Your Location & Time</Text>
            <TouchableOpacity
              onPress={this.openGmaps}
            >
              <View style={styles.time}>
                <Image
                  source={require("../assets/images/location.png")}
                  style={styles.imageIcon}
                ></Image>
                <Text style={styles.text}>LOCATION  : </Text>
                <Text style={styles.textBold}>{this.state.location}</Text>
              </View>
            </TouchableOpacity>
            <View style={styles.time}>
              <Image
                source={require("../assets/images/clock.png")}
                style={styles.imageIcon}
              ></Image>
              <Text style={styles.text}>CHECK IN TIME : </Text>
              <Text style={styles.textBold}>{moment().format('dddd, LL, LTS')}</Text>
            </View>
            <View style={styles.demoButtonsContainer}>
              {/* <Button
                info
                style={styles.buttonCheckin}
                onPress={() => this.submitCheckin()}
              >
                <Text style={styles.textBold}>CHECKIN</Text>
              </Button> */}
              <Button
                icon={
                  <Icon
                    name="paper-plane"
                    size={15}
                    color="white"
                  />
                }
                title=" CHECKIN"
                onPress={() => this.submitCheckin()}
                ViewComponent={LinearGradient} // Don't forget this!
                linearGradientProps={{
                  colors: ['#47C9FF', '#82E9FF'],
                  start: { x: 0, y: 0.5 },
                  end: { x: 1, y: 0.5 },
                }}
              />
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const screenWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F1F1F7',
    paddingHorizontal: 15,
    paddingTop: 20,
  },
  componentsSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
  },
  componentsImageSection: {
    backgroundColor: '#fff',
    padding: 15,
    marginBottom: 20,
    borderRadius: 5,
    paddingBottom: 20,
  },
  componentSectionHeader: {
    color: '#686868',
    fontSize: 20,
    marginBottom: 20,
    fontWeight: 'bold'
  },
  demoButtonsContainer: {
    marginTop: 20,
  },
  demoIconsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  buttonRetake: {
    marginTop: 20,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  buttonCheckin: {
    marginTop: 8,
    marginBottom: 8,
    height: 40,
    justifyContent: 'center',
    borderRadius: 5,
  },
  demoItem: {
    marginVertical: 15,
  },
  text: {
    color: '#fff',
    fontSize: 13,
  },
  textBold: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
  image: {
    width: screenWidth * 0.83,
    height: 260,
    marginBottom: 10,
  },
  location: {
    backgroundColor: '#6DD0A3',
    borderRadius: 5,
    padding: 5,
  },
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  time: {
    backgroundColor: '#49D2D0',
    borderRadius: 5,
    marginTop: 15,
    padding: 5,
    flexDirection: 'row',
    flexWrap: 'wrap',
  }
});

