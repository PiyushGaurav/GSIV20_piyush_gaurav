import {Dimensions} from 'react-native';

export class Gen {
  static getDimension() {
    return Dimensions.get('window');
  }
  static getTimeString(value) {
    return value < 10 ? `0${value}` : `${value}`;
  }
}
