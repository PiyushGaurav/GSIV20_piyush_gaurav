import React, {Component} from 'react';
import {
  ActivityIndicator,
  Platform,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import Colors from '../utils/Colors';
import SearchComponent from '../components/SearchComponent';
import _ from 'lodash';
import Constants from '../utils/Constants';

const styles = StyleSheet.create({
  activityContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {flex: 1, backgroundColor: Colors.White},
  searchContainer: {
    backgroundColor: Colors.White,
    shadowRadius: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.2,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: Colors.Gray,
    elevation: 10,
    zIndex: 10000,
  },
  listContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 5,
  },
});

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoaded: false,
    };
    this.getMoviesDebounced = _.debounce(this.getMovies, 500);
  }

  async componentDidMount() {
    const response = await axios.get(
      `${Constants.API_URL}/movie/upcoming?api_key=${Constants.API_KEY}`,
    );
    this.setState({
      listData: response.data.results,
      isLoaded: true,
    });
  }

  onCardPress = (data) => {
    this.props.navigation.navigate('Details', {id: data.id});
  };

  getMovies = async (searchText) => {
    const response = await axios.get(
      `${Constants.API_URL}/search/movie?api_key=${Constants.API_KEY}&query=${searchText}`,
    );
    this.setState({
      listData: response.data.results,
      isLoaded: true,
    });
  };

  onChangeText = (value) => {
    this.setState(
      {
        value,
        isLoaded: true,
      },
      async () => {
        await this.getMoviesDebounced(this.state.value);
      },
    );
  };
  render() {
    if (!this.state.isLoaded) {
      return (
        <View style={styles.activityContainer}>
          <ActivityIndicator size="large" color={Colors.Orange} />
        </View>
      );
    }

    return (
      <View style={{flex: 1, backgroundColor: Colors.White}}>
        <View style={styles.searchContainer}>
          <SearchComponent
            onChangeText={this.onChangeText}
            value={this.state.value}
            placeholder={'Search'}
          />
        </View>
        <ScrollView
          style={{
            backgroundColor: Colors.White,
            paddingTop: 45,
          }}>
          <View style={styles.listContainer}>
            {this.state.listData.map((listItem) => (
              <Card
                data={listItem}
                onCardPress={this.onCardPress}
                key={listItem.id}
              />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default ListScreen;
