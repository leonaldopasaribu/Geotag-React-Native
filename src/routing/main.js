import React, { Component } from 'react'
import { Text, View, Image, Button, TouchableOpacity} from 'react-native'

import { createStackNavigator, createMaterialTopTabNavigator, NavigationActions } from 'react-navigation'
import mainScreen from '../screens/main'
import locationScreen from '../screens/location'
import checkinScreen from '../screens/checkin'
import historyScreen from '../screens/history'

const HeaderStyle = () => ({
  headerStyle: {
    backgroundColor: '#254F6E',
    textAlign: 'center',
    fontWeight: 'normal'
  },
  headerTintColor: '#deffffff',
})

export default Main = createStackNavigator({
  MainScreen: {
    screen: mainScreen,
    navigationOptions: ({navigation}) => ({
      title: "Checkin",
      headerRight: (
      <TouchableOpacity
        onPress={() => navigation.navigate("HistoryScreen")}
      >
        <Image
          source={require('../assets/images/history.png')}
          style={{ width: 28, height: 28, marginRight: 10, tintColor: '#fff' }}
        />
      </TouchableOpacity>
      ),
    })
  },
  LocationScreen: {
    screen: locationScreen,
    navigationOptions: (props) => ({
      title: "Location",
    })
  },
  CheckinScreen: {
    screen: checkinScreen,
    navigationOptions: (props) => ({
      title: "Checkin Detail",
    })
  },
  HistoryScreen: {
    screen: historyScreen,
    navigationOptions: (props) => ({
      title: "History",
    })
  },
},
  {
    initialRouteName: "MainScreen",
    defaultNavigationOptions: HeaderStyle,
  });
