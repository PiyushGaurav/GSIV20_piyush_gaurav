import React, {Component} from 'react';
import {
  ActivityIndicator,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import axios from 'axios';
import Colors from '../utils/Colors';
import Constants from '../utils/Constants';
import {Gen} from '../utils/Gen';

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, backgroundColor: Colors.White},
  imageContainer: {
    flex: 1,
    height: 400,
    margin: 10,
    backgroundColor: Colors.Gray,
  },
  detailsContainer: {
    flex: 1,
    margin: 10,
  },
  sectionContainer: {
    flexDirection: 'row',
  },
  titleStyle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  rating: {
    fontSize: 21,
    paddingLeft: 5,
    color: Colors.Gray,
  },
  yearsAndLength: {
    fontSize: 21,
    paddingVertical: 5,
  },
  overview: {
    flex: 1,
    fontSize: 21,
    paddingTop: 10,
    flexWrap: 'wrap',
  },
});

class DetailsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      movieDetails: null,
      isLoaded: false,
    };
  }

  async componentDidMount() {
    const {navigation} = this.props;
    const id = navigation.getParam('id', null);
    const response = await axios.get(
      `${Constants.API_URL}/movie/${id}?api_key=${Constants.API_KEY}`,
    );
    const details = response.data;
    console.log('details : ' ,details);
    const date = new Date(details.release_date);
    const year = date.getFullYear();
    const hours = Math.floor(details.runtime / 60);
    const minutes = details.runtime % 60;
    this.setState({
      movieDetails: details,
      isLoaded: true,
      movieLength: `${Gen.getTimeString(hours)}:${Gen.getTimeString(minutes)}`,
      year,
    });
  }

  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={Colors.Orange} />
        </View>
      );
    }
    const {original_title, vote_average, overview} = this.state.movieDetails;

    const {year, movieLength} = this.state;

    return (
      <View style={styles.container}>
        <ScrollView>
          <View style={styles.imageContainer} />
          <View style={styles.detailsContainer}>
            <View style={styles.sectionContainer}>
              <Text style={styles.titleStyle}>{original_title}</Text>
              <Text style={styles.rating}>{`(${vote_average})`}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text
                style={
                  styles.yearsAndLength
                }>{`${year} | ${movieLength} | ${'director'}`}</Text>
            </View>
            <View style={styles.sectionContainer}>
              <Text style={styles.overview}>{overview}</Text>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default DetailsScreen;
