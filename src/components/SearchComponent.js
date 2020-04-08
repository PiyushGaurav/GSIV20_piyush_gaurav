import React, {Component} from 'react';
import {Platform, StyleSheet, TextInput, View} from 'react-native';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/MaterialIcons';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.VeryLightGray,
    // justifyContent: 'center',
    // alignItems: 'center',
    // margin: 10,
  },

  SectionStyle: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.White,
    // borderWidth: 0.5,
    borderColor: '#000',
    height: 45,
    borderRadius: 5,
    paddingHorizontal: 5,
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.2,
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowColor: Colors.Gray,
    elevation: 10,
    zIndex: 10000,
  },
});

class SearchComponent extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string,
    onChangeText: PropTypes.func.isRequired,
  };

  static defaultProps = {
    value: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <View style={styles.SectionStyle}>
          <Icon name={'search'} size={30} color={Colors.LightGray} />
          <TextInput
            style={{flex: 1, fontSize: 20}}
            placeholder={this.props.placeholder}
            underlineColorAndroid="transparent"
            value={this.props.value}
            onChangeText={this.props.onChangeText}
          />
        </View>
      </View>
    );
  }
}

export default SearchComponent;
