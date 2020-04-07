import React, {Component} from 'react';
import {ActivityIndicator, ScrollView, View} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import {Gen} from '../utils/Gen';
import Colors from '../utils/Colors';
import SearchComponent from '../components/SearchComponent';
import _ from 'lodash';

const {width, height} = Gen.getDimension();

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
      isLoaded: false,
    };
    this.getMoviesDebounced = _.debounce(this.getMovies, 1000);
  }

  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=b69c9a799da383c62ab9a321a6f7a3d1',
    );
    console.log('DATA : ', response.data);
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
      `https://api.themoviedb.org/3/search/?api_key=b69c9a799da383c62ab9a321a6f7a3d1&query=${searchText}`,
    );
    console.log('SEARCH DATA = ', response);
  };

  onChangeText = (value) => {
    console.log('value : ', value);
    this.setState(
      {
        value,
      },
      async () => {
        await this.getMoviesDebounced(this.state.value);
      },
    );
  };
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

    return (
      <View style={{flex: 1, backgroundColor: Colors.White}}>
        <SearchComponent
          onChangeText={this.onChangeText}
          value={this.state.value}
          placeholder={'Search'}
        />
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            {this.state.listData.map((listItem) => (
              <Card data={listItem} onCardPress={this.onCardPress} />
            ))}
          </View>
        </ScrollView>
      </View>
    );
  }
}
export default ListScreen;
