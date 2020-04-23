import {createStackNavigator} from 'react-navigation-stack';
import MainTab from '../main/MainTab';
import HomeStack_noTab from '../home/HomeStack_noTab';
import NaverMap from '../../containers/home/NaverMap';
import KakaoMap from '../../containers/home/KakaoMap';
import MyLocationSetting from '../../containers/home/MyLocationSetting';
import LocationSearch from '../../containers/home/LocationSearch';
import MyPage_noTab from '../myPage/MyPage_noTab';
import Reservation from '../../containers/hospitalDetail/Reservation';
import Calendars from '../../containers/hospitalDetail/Calendars';
import ReviewWrite from '../../containers/hospitalDetail/ReviewWrite';

const RootStack = createStackNavigator(
  {
    main: {screen: MainTab},
    HomeStack_noTab: {screen: HomeStack_noTab},
    NaverMap: {screen: NaverMap},
    KakaoMap: {screen: KakaoMap},
    MyLocationSetting: {screen: MyLocationSetting},
    LocationSearch: {screen: LocationSearch},
    MyPage_noTab: {screen: MyPage_noTab},
    Reservation: {screen: Reservation},
    Calendars: {screen: Calendars},
    ReviewWrite: {screen: ReviewWrite},
  },
  {
    initialRouteName: 'main',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default RootStack;
