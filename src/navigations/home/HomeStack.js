import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../containers/home/Home';

const HomeStack = createStackNavigator(
  {
    home: {screen: Home},
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack;
