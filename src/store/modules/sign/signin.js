/* eslint-disable prettier/prettier */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {
  getData,
  storeData,
  removeAllData,
  removeData,
} from '../../../utils/util';
import config from '../../../configs/config';

const SIGNIN_USER_DATA = 'signin/SIGNIN_USER_DATA';

const userDataAction = createAction(SIGNIN_USER_DATA);

const initState = {
  // 초기 사용자 정보
  user: null,
};

export const handleLoginData = (value) => (dispatch) => {
  dispatch(userDataAction(value));
};

export const signIn = (userId, userPw) => async (dispatch) => {
  try {
    let userData = {
      userId,
      userPw,
    };

    // 수정 필요
    const jsonData = await api.post(`/signIn`, {
      body: userData,
    });

    const result = jsonData.result;

    await storeData('token', result.token);
    await storeData('user_id', result.userId);
    await storeData('user_name', result.userName);
    await dispatch(
      userDataAction({userId: result.userId, userName: result.userName}),
    );
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

export default handleActions(
  {
    [SIGNIN_USER_DATA]: (state, {payload}) =>
      produce(state, (draft) => {
        draft.user = payload;
      }),
  },
  initState,
);
