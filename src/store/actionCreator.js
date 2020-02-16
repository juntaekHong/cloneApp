/**
 * bindActionCreators 모듈화
 */
import {bindActionCreators} from 'redux';
import * as common from './modules/common/common';
import store from './index';

const {dispatch} = store;

export const CommonActions = bindActionCreators(common, dispatch);
