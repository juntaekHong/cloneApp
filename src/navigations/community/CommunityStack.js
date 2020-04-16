import {createStackNavigator} from 'react-navigation-stack';
import Community from '../../containers/community/Community';
import CommunityDetail from '../../containers/community/CommunityDetail';

const CommunityStack = createStackNavigator(
  {
    Community: {screen: Community},
    CommunityDetail: {screen: CommunityDetail},
  },
  {
    initialRouteName: 'Community',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default CommunityStack;
