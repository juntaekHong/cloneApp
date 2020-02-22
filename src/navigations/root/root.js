import {createStackNavigator} from 'react-navigation-stack';
import MainTab from '../main/MainTab';
import HomeStack_noTab from '../home/HomeStack_noTab';
import NaverMap from '../../containers/home/NaverMap';

const RootStack = createStackNavigator(
  {
    main: {screen: MainTab},
    HomeStack_noTab: {screen: HomeStack_noTab},
    NaverMap: {screen: NaverMap},
  },
  {
    initialRouteName: 'main',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default RootStack;
