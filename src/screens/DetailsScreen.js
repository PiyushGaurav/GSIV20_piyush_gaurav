import React, {Component} from 'react';
import {Text, View} from 'react-native';

class DetailsScreen extends Component {
  render() {
    const {navigation} = this.props;
    const data = navigation.getParam('data', null);
    const {title, popularity, overview} = data;
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <Text>{title}</Text>
        <Text>{popularity}</Text>
        <Text>{overview}</Text>
      </View>
    );
  }
}

export default DetailsScreen;
