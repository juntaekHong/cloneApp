import {createStackNavigator} from 'react-navigation-stack';
import MyPage from '../../containers/myPage/MyPage';
import MySubs from '../../containers/myPage/MySubs';
import MyReview from '../../containers/myPage/MyReview';

const MyPageStack = createStackNavigator(
  {
    MyPage: {screen: MyPage},
    MySubs: {screen: MySubs},
    MyReview: {screen: MyReview},
  },
  {
    initialRouteName: 'MyPage',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MyPageStack;
