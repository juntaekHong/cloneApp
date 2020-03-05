import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../containers/home/Home';
import HospitalList from '../../containers/home/HospitalList';

const HomeStack = createStackNavigator(
  {
    home: {screen: Home},
    HospitalList: {screen: HospitalList},
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack;
