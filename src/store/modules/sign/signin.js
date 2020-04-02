import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {getData, storeData, removeAllData} from '../../../utils/util';
import config from '../../../configs/config';

const SIGNIN_USER_DATA = 'signin/SIGNIN_USER_DATA';

const userDataAction = createAction(SIGNIN_USER_DATA);

const initState = {
  // 초기 사용자 정보
  user: null,
};

export const signIn = (userId, userPw) => async dispatch => {
  try {
    let userData = {
      userId,
      userPw,
    };

    console.log(userData);

    const jsonData = await axios.get(`${config.server}/signIn`, {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: userData,
    });

    console.log(jsonData);
    // const result = jsonData.result;
    // await storeData('token', result.token);
    return true;
  } catch (err) {
    return false;
  }
};

export default handleActions(
  {
    [SIGNIN_USER_DATA]: (state, {payload}) =>
      produce(state, draft => {
        draft.user = payload;
      }),
  },
  initState,
);
