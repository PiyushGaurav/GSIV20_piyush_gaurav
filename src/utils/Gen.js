import {Dimensions} from 'react-native';

export class Gen {
  static getDimension() {
    return Dimensions.get('window');
  }
}
