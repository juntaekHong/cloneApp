import {createStackNavigator} from 'react-navigation-stack';
import MainTab from '../main/MainTab';

const RootStack = createStackNavigator(
  {
    main: {screen: MainTab},
  },
  {
    initialRouteName: 'main',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default RootStack;
