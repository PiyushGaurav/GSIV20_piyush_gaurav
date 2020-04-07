import {createStackNavigator} from 'react-navigation-stack';
import ListScreen from '../screens/ListScreen';
import DetailsScreen from '../screens/DetailsScreen';

const AppNavigator = createStackNavigator(
  {
    List: ListScreen,
    Details: DetailsScreen,
  },
  {
    initialRouteName: 'List',
  },
);

export default AppNavigator;
