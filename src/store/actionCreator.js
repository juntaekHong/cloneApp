/**
 * bindActionCreators 모듈화
 */
import {bindActionCreators} from 'redux';
import * as common from './modules/common/common';
import * as signin from './modules/sign/signin';
import * as signup from './modules/sign/signup';
import * as location from './modules/myLocationSetting/myLocationSetting';
import store from './index';

const {dispatch} = store;

export const CommonActions = bindActionCreators(common, dispatch);
export const SigninActions = bindActionCreators(signin, dispatch);
export const SignupActions = bindActionCreators(signup, dispatch);
export const LocationActions = bindActionCreators(location, dispatch);
