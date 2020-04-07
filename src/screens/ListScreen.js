import React, {Component} from 'react';
import {View, Text, TouchableOpacity} from 'react-native';

class ListScreen extends Component {
  render() {
    return (
      <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('Details');
          }}>
          <Text>Home screen</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ListScreen;
