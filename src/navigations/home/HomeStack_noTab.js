import {createStackNavigator} from 'react-navigation-stack';
import HospitalDetail from '../../containers/home/HospitalDetail';

const HomeStack_noTab = createStackNavigator(
  {
    HospitalDetail: {screen: HospitalDetail},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack_noTab;
