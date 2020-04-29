import {createStackNavigator} from 'react-navigation-stack';
import MyPage from '../../containers/myPage/MyPage';
import MySubs from '../../containers/myPage/MySubs';
import MyReview from '../../containers/myPage/MyReview';
import MyInfo from '../../containers/myPage/MyInfo';
import TermInfo from '../../containers/myPage/TermInfo';

const MyPageStack = createStackNavigator(
  {
    MyPage: {screen: MyPage},
    MyInfo: {screen: MyInfo},
    MySubs: {screen: MySubs},
    MyReview: {screen: MyReview},
    TermInfo: {screen: TermInfo},
  },
  {
    initialRouteName: 'MyPage',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MyPageStack;
