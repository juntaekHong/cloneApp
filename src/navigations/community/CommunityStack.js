import {createStackNavigator} from 'react-navigation-stack';
import Community from '../../containers/community/Community';

const CommunityStack = createStackNavigator(
  {
    Community: {screen: Community},
  },
  {
    initialRouteName: 'Community',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default CommunityStack;
