import React, { Component } from 'react'
import {
  StyleSheet, View, Platform, Text, FlatList, TouchableOpacity, Image, Dimensions} from 'react-native';
import { colors, fonts } from '../styles';
import Resource from '../network/Resource';
import moment from "moment";

export default class profile extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      data: []
    }
  }
  componentDidMount() {
    this.getData();
  }

  getData() {
    this.setState({ loading: true })

    Resource.getCheckin()
      .then((res) => {
        this.setState({ loading: false, data: res.data })
      })
      .catch((err) => {
        alert(err)
      })
  }
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          refreshing={this.state.loading}
          onRefresh={() => this.getData()}
          style={{}}
          data={this.state.data}
          renderItem={({ item, index }) => (
            <TouchableOpacity onPress={() => {
              this.props.navigation.navigate("HistoryScreen", {
                data: this.state.data[index]
              })
            }
            }>
              <TouchableOpacity
                style={styles.itemTwoContainer}
              >
                <View style={styles.itemTwoContent}>
                  <Image style={styles.itemTwoImage} source={{ uri: item.imageUrl }} />
                  {item.lateStatus == 'Late' ? <View style={styles.itemTwoOverlayLate} /> : <View style={styles.itemTwoOverlayOnTime} />}
                  <View style={styles.time}>
                    <Text style={styles.itemTwoTitle}>{moment(item.time).format('LLLL')}</Text>
                  </View>
                  <View style={styles.location}>
                    <Text style={styles.itemTwoSubTitle}>{item.location}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </TouchableOpacity>
          )}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  imageIcon: {
    width: 15,
    height: 15,
    marginRight: 5,
  },
  itemTwoContainer: {
    padding: 15,
    backgroundColor: 'white',
    paddingRight: 15,
    paddingTop: 1
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  itemTwoTitle: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: colors.white,
    fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: colors.white,
    fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    height: Dimensions.get('window').width / 2 - 30,
    width: Dimensions.get('window').width * 0.92,
  },
  itemTwoOverlayOnTime: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#00e5ff',
    opacity: 0.5,
  },
  itemTwoOverlayLate: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#ff0035',
    opacity: 0.5,
  },
  badge: {
    backgroundColor: colors.secondary,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
