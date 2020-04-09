/**
 * store에 들어갈 reducer 모음
 */
import {combineReducers} from 'redux';
import counter from './counter/counter';
import common from './common/common';
import location from './myLocationSetting/myLocationSetting';
import signin from './sign/signin';
import signup from './sign/signup';
import reservation from './reservation/reservation';

export default combineReducers({
  counter,
  common,
  location,
  signin,
  signup,
  reservation,
});
