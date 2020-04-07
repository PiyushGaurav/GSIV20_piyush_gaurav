import React, {Component} from 'react';
import {View, Text, TouchableOpacity, ImageBackground} from 'react-native';
import {Gen} from '../utils/Gen';
import Colors from '../utils/Colors';

const {width} = Gen.getDimension();

class Card extends Component {
  render() {
    const {title, vote_average, overview} = this.props.data;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onCardPress(this.props.data);
        }}
        style={{
          width: width / 2,
          height: 233,
          shadowRadius: 10,
          shadowOpacity: Platform.OS === 'ios' ? 0.2 : 0.1,
          shadowOffset: {
            width: 0,
            height: 10,
          },
          elevation: 10,
          zIndex: 10000,
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
              height: 63,
              marginVertical: 3,
              backgroundColor: Colors.VeryLightGray,
            }}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
                paddingHorizontal: 5,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.Blue,
                }}>
                {title}
              </Text>
              <Text
                style={{
                  fontSize: 16,
                  color: Colors.Gray,
                }}>
                {vote_average}
              </Text>
            </View>
            <View
              style={{
                flex: 2,
                paddingHorizontal: 5,
              }}>
              <Text
                style={{
                  fontSize: 12,
                  color: Colors.Gray,
                }}>
                {overview}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
}

export default Card;
