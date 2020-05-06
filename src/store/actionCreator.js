/**
 * bindActionCreators 모듈화
 */
import {bindActionCreators} from 'redux';
import * as common from './modules/common/common';
import * as hospital from './modules/hospital/hospital';
import * as signin from './modules/sign/signin';
import * as signup from './modules/sign/signup';
import * as location from './modules/myLocationSetting/myLocationSetting';
import * as reservation from './modules/reservation/reservation';
import * as review from './modules/review/review';
import * as search from './modules/search/search';
import store from './index';

const {dispatch} = store;

export const CommonActions = bindActionCreators(common, dispatch);
export const HospitalActions = bindActionCreators(hospital, dispatch);
export const SigninActions = bindActionCreators(signin, dispatch);
export const SignupActions = bindActionCreators(signup, dispatch);
export const LocationActions = bindActionCreators(location, dispatch);
export const ReservationActions = bindActionCreators(reservation, dispatch);
export const ReviewActions = bindActionCreators(review, dispatch);
export const SearchActions = bindActionCreators(search, dispatch);
