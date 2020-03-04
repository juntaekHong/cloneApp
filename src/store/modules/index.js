/**
 * store에 들어갈 reducer 모음
 */
import {combineReducers} from 'redux';
import counter from './counter/counter';
import common from './common/common';
import location from './myLocationSetting/myLocationSetting';

export default combineReducers({
  counter,
  common,
  location,
});
