import {createStackNavigator} from 'react-navigation-stack';
import Search from '../../containers/search/Search';

const SearchStack = createStackNavigator(
  {
    Search: {screen: Search},
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default SearchStack;
