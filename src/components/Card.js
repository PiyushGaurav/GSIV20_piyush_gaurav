import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Gen} from '../utils/Gen';

const {width, height} = Gen.getDimension();

class Card extends Component {
  componentDidMount() {
    console.log('card data : ', this.props.data);
  }

  render() {
    const {title, popularity, overview} = this.props.data;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onCardPress(this.props.data);
        }}
        style={{
          width: width / 2,
          height: 250,
        }}>
        <View
          style={{
            flex: 1,
            margin: 5,
            borderRadius: 10,
            overflow: 'hidden',
          }}>
          <View
            style={{
              flex: 3,
              backgroundColor: 'red',
            }}
          />
          <View
            style={{
              flex: 1,
              backgroundColor: 'gray',
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
              }}>
              <Text>{title}</Text>
              <Text>{popularity}</Text>
            </View>
            <View
              style={{
                flex: 2,
                padding: 5,
              }}>
              <Text>{overview}</Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Card;
