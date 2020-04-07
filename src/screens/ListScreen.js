import React, {Component} from 'react';
import {ActivityIndicator, Platform, ScrollView, View} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import Colors from '../utils/Colors';
import SearchComponent from '../components/SearchComponent';
import _ from 'lodash';
import Constants from '../utils/Constants';

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
        <View style={{
            backgroundColor:Colors.White,
            shadowRadius: 10,
            shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.2,
            shadowOffset: {
                width: 0,
                height: 5,
            },
            shadowColor: Colors.Gray,
            elevation: 10,
            zIndex: 10000,
        }}>
        <SearchComponent
          onChangeText={this.onChangeText}
          value={this.state.value}
          placeholder={'Search'}
        />
        </View>
        <ScrollView>
          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
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
