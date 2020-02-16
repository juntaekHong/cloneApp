import {createStackNavigator} from 'react-navigation-stack';
import MyPage from '../../containers/myPage/MyPage';

const MyPageStack = createStackNavigator(
  {
    MyPage: {screen: MyPage},
  },
  {
    initialRouteName: 'MyPage',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MyPageStack;
