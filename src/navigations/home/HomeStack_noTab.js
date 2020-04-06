import {createStackNavigator} from 'react-navigation-stack';
import HospitalDetail from '../../containers/home/HospitalDetail';
import Reservation from '../../containers/hospitalDetail/Reservation';
import Calendars from '../../containers/hospitalDetail/Calendars';

const HomeStack_noTab = createStackNavigator(
  {
    HospitalDetail: {screen: HospitalDetail},
    Reservation: {screen: Reservation},
    Calendars: {screen: Calendars},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default HomeStack_noTab;
