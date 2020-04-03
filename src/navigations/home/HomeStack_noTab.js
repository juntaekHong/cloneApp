import {createStackNavigator} from 'react-navigation-stack';
import HospitalDetail from '../../containers/home/HospitalDetail';
import Reservation from '../../containers/hospitalDetail/Reservation';

const HomeStack_noTab = createStackNavigator(
  {
    HospitalDetail: {screen: HospitalDetail},
    Reservation: {screen: Reservation},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack_noTab;
