/**
 * store에 들어갈 reducer 모음
 */
import {combineReducers} from 'redux';
import counter from './counter/counter';
import common from './common/common';
import hospital from './hospital/hospital';
import location from './myLocationSetting/myLocationSetting';
import signin from './sign/signin';
import signup from './sign/signup';
import reservation from './reservation/reservation';
import review from './review/review';
import search from './search/search';
import community from './community/community';
import covid from './covid/covid';

export default combineReducers({
  counter,
  common,
  hospital,
  location,
  signin,
  signup,
  reservation,
  review,
  search,
  community,
  covid,
});
