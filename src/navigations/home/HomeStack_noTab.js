import {createStackNavigator} from 'react-navigation-stack';
import MyLocationSetting from '../../containers/home/MyLocationSetting';

const HomeStack_noTab = createStackNavigator(
  {
    MyLocationSetting: {screen: MyLocationSetting},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack_noTab;
