import {createStackNavigator} from 'react-navigation-stack';
import SignUp from '../../containers/myPage/SignUp';

const MyPage_noTab = createStackNavigator(
  {
    SignUp: {screen: SignUp},
  },
  {
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MyPage_noTab;
