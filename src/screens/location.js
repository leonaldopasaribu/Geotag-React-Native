import React, { Component } from 'react';
import { 
    Platform,
    Text,
    View,
    Alert,
    StyleSheet,
    TouchableOpacity
 } from 'react-native';
import Geocode from 'react-geocode';

export default class location extends Component {
  constructor(props) {
    super(props);
    this.state = {
      date: '',
      latidude: null,
      longitude: null,
      address: '',
    };
  }

  //Function Get DateTime
  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    that.setState({
      //Setting the value of the date time
      date:
        date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
    });
  }

  findCoordinates = () => {
    navigator.geolocation.getCurrentPosition(
      position =>{
        const cordinateLatitude = JSON.stringify(position.coords.latitude);
        const cordinateLongitude = JSON.stringify(position.coords.longitude);
        this.setState({cordinateLatitude, cordinateLongitude});
        // Api Key
        Geocode.setApiKey("AIzaSyB_x_Vx0JgUb08Tr8jGxfSbKrCgZ1S76QY");
        
        //Get address from latidude & longitude.
        Geocode.fromLatLng(cordinateLatitude, cordinateLongitude).then(
          response => {
            const address = response.results[0].formatted_address;
            // console.log(address);
            this.setState({address});
          },
          error => {
            alert(error);
            console.error(error);
          }
        );
      }
    )
  };

  render() {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Your Location</Text>
        
        <TouchableOpacity onPress={this.findCoordinates}>
          <Text style={styles.welcome}>Your Location</Text>
          <Text>Date: {this.state.date}</Text>
          <Text>Latitude: {this.state.cordinateLatitude}</Text>
          <Text>Longitude: {this.state.cordinateLongitude}</Text>
          <Text>sad{this.state.address}</Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#F5FCFF"
    },
    welcome: {
      fontSize: 20,
      textAlign: "center",
      margin: 10
    },
    instructions: {
      textAlign: "center",
      color: "#333333",
      marginBottom: 5
    }
  });
