import {createStackNavigator} from 'react-navigation-stack';
import MyPage from '../../containers/myPage/MyPage';
import MyInfo from '../../containers/myPage/MyInfo';
import MySubs from '../../containers/myPage/MySubs';
import MyReview from '../../containers/myPage/MyReview';
import UserOpinion from '../../containers/myPage/UserOpinion';
import TermInfo from '../../containers/myPage/TermInfo';
import Certification from '../../containers/myPage/Certification';

const MyPageStack = createStackNavigator(
  {
    MyPage: {screen: MyPage},
    MyInfo: {screen: MyInfo},
    MySubs: {screen: MySubs},
    MyReview: {screen: MyReview},
    UserOpinion: {screen: UserOpinion},
    TermInfo: {screen: TermInfo},
    // Certification: {screen: Certification},
  },
  {
    initialRouteName: 'MyPage',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default MyPageStack;
