import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ScrollView} from 'react-native';
import axios from 'axios';
import Card from '../components/Card';
import {Gen} from '../utils/Gen';
const {width, height} = Gen.getDimension();

class ListScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listData: [],
    };
  }
  async componentDidMount() {
    const response = await axios.get(
      'https://api.themoviedb.org/3/movie/upcoming?api_key=b69c9a799da383c62ab9a321a6f7a3d1',
    );
    console.log('DATA : ', response.data);
    this.setState({
      listData: response.data.results,
    });
  }

  onCardPress = (data) => {
    this.props.navigation.navigate('Details', {data});
  };

  render() {
    return (
      <View style={{flex: 1}}>
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
