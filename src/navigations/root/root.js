import {createStackNavigator} from 'react-navigation-stack';
import MainTab from '../main/MainTab';
import HomeStack_noTab from '../home/HomeStack_noTab';
import NaverMap from '../../containers/home/NaverMap';
import KakaoMap from '../../containers/home/KakaoMap';

const RootStack = createStackNavigator(
  {
    main: {screen: MainTab},
    HomeStack_noTab: {screen: HomeStack_noTab},
    NaverMap: {screen: NaverMap},
    KakaoMap: {screen: KakaoMap},
  },
  {
    initialRouteName: 'main',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default RootStack;
