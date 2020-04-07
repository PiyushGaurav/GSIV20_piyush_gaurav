import React, {Component} from 'react';
import {StyleSheet, TextInput, View} from 'react-native';
import Colors from '../utils/Colors';

const styles = StyleSheet.create({
  container: {
    margin: 5,
    paddingVertical: 5,
  },
  inputStyle:{
    height: 45,
    backgroundColor: Colors.VeryLightGray,
    borderRadius: 10,
    paddingHorizontal: 10,
    fontSize: 20,
  }
});

class SearchComponent extends Component {
  static propTypes = {
    placeholder: PropTypes.string.isRequired,
    value: PropTypes.string.isRequired,
    onChangeText: PropTypes.func.isRequired,
  };

  static defaultProps = {
    iconName: '',
  };

  render() {
    return (
      <View style={styles.container}>
        <TextInput
          style={styles.inputStyle}
          onChangeText={this.props.onChangeText}
          value={this.props.value}
          placeholder={this.props.placeholder}
        />
      </View>
    );
  }
}

export default SearchComponent;
