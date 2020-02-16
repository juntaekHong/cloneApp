import {createStackNavigator} from 'react-navigation-stack';
import Home from '../../containers/home/Home';
import HospitalList from '../../containers/home/HospitalList';
import HospitalDetail from '../../containers/home/HospitalDetail';

const HomeStack = createStackNavigator(
  {
    home: {screen: Home},
    HospitalList: {screen: HospitalList},
    HospitalDetail: {screen: HospitalDetail},
  },
  {
    initialRouteName: 'home',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack;
