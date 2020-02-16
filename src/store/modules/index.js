/**
 * store에 들어갈 reducer 모음
 */
import {combineReducers} from 'redux';
import counter from './counter/counter';
import common from './common/common';

export default combineReducers({
  counter,
  common,
});
