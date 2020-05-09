import {createStackNavigator} from 'react-navigation-stack';
import Search from '../../containers/search/Search';
import SearchResult from '../../containers/search/SearchResult';

const SearchStack = createStackNavigator(
  {
    Search: {screen: Search},
    SearchResult: {screen: SearchResult},
  },
  {
    initialRouteName: 'Search',
    defaultNavigationOptions: {
      header: null,
    },
  },
);

export default SearchStack;
