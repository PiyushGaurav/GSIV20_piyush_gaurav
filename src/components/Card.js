import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Platform,
  StyleSheet,
  Image,
} from 'react-native';
import {Gen} from '../utils/Gen';
import Colors from '../utils/Colors';
import PropTypes from 'prop-types';
import Constants from '../utils/Constants';

const {width} = Gen.getDimension();

const styles = StyleSheet.create({
  container: {
    width: width / 2,
    height: 250,
    shadowRadius: 10,
    shadowOpacity: Platform.OS === 'ios' ? 0.5 : 0.2,
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowColor: Colors.Gray,
    elevation: 10,
    zIndex: 10,
  },
  innerContainer: {
    flex: 1,
    margin: 7,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: Colors.White,
  },
  imageContainer: {
    flex: 3,
  },
  detailsContainer: {
    height: 63,
    paddingVertical: 3,
    backgroundColor: Colors.VeryLightGray,
    justifyContent: 'space-around',
  },
  firstInnerContent: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  secondInnerContent: {
    flex: 2,
    paddingHorizontal: 5,
    paddingTop: 5,
  },
  titleStyle: {
    flex: 8,
    fontSize: 16,
    color: Colors.Blue,
  },
  ratingStyle: {
    flex: 1.5,
    fontSize: 16,
    textAlign: 'right',
    color: Colors.Gray,
  },
  descriptionStyle: {
    fontSize: 12,
    color: Colors.Gray,
  },
});

class Card extends Component {
  static propTypes = {
    data: PropTypes.object.isRequired,
    onCardPress: PropTypes.func.isRequired,
  };
  render() {
    const {title, vote_average, overview, poster_path} = this.props.data;
    return (
      <TouchableOpacity
        onPress={() => {
          this.props.onCardPress(this.props.data);
        }}
        style={styles.container}>
        <View style={styles.innerContainer}>
          <View style={styles.imageContainer}>
            <Image
              style={{
                width: '100%',
                height: '100%',
                resizeMode: 'cover',
              }}
              source={{uri: `${Constants.POSTER_DIR}${poster_path}`}}
            />
          </View>
          <View style={styles.detailsContainer}>
            <View style={styles.firstInnerContent}>
              <Text style={styles.titleStyle} numberOfLines={1}>
                {title}
              </Text>
              <Text style={styles.ratingStyle}>{vote_average}</Text>
            </View>
            <View style={styles.secondInnerContent}>
              <Text style={styles.descriptionStyle} numberOfLines={2}>
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
