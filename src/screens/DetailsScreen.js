import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, Text, View} from 'react-native';
import axios from 'axios';
import Colors from '../utils/Colors';

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: null,
      isLoaded: false,
    };
  }

  getTimeString = (value) => {
    return value < 10 ? `0${value}` : `${value}`;
  };

  async componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', null);
    const response = await axios.get(
      `https://api.themoviedb.org/3/movie/${id}?api_key=b69c9a799da383c62ab9a321a6f7a3d1`,
    );
    console.log('DATA : ', response);
    const details = response.data;
    const date = new Date(details.release_date);
    const year = date.getFullYear();
    const runtime = details.runtime;
    const hours = Math.floor(runtime / 60);
    const minutes = runtime % 60;
    this.setState({
      movieDetails: details,
      isLoaded: true,
      movieLength: `${this.getTimeString(hours)}:${this.getTimeString(
        minutes,
      )}`,
      year,
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator size="large" color={Colors.Orange} />
        </View>
      );
    }
    const {original_title, vote_average, overview} = this.state.movieDetails;

    const {year, movieLength} = this.state;

    return (
      <View style={{flex: 1, backgroundColor: Colors.White}}>
        <ScrollView>
          <View
            style={{
              flex: 1,
              height: 400,
              margin: 10,
              backgroundColor: Colors.Gray,
            }}
          />
          <View
            style={{
              flex: 1,
              margin: 10,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: 'bold',
                }}>
                {original_title}
              </Text>
              <Text
                style={{
                  fontSize: 21,
                  color: Colors.Gray,
                }}>{`(${vote_average})`}</Text>
            </View>
            <Text
              style={{
                fontSize: 21,
                paddingVertical: 5,
              }}>{`${year} | ${movieLength} | ${'director'}`}</Text>
            <View style={{flexDirection: 'row' }}>
              <Text
                style={{
                  flex: 1,
                  fontSize: 21,
                  paddingTop: 10,
                  flexWrap: 'wrap',
                }}>
                {overview}
              </Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DetailsScreen;
