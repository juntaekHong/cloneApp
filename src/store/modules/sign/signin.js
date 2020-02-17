import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {getData, storeData, removeAllData} from '../../../utils/util';
import config from '../../../configs/config';
import {Platform} from 'react-native';

const SIGNIN_USER_DATA = 'signin/SIGNIN_USER_DATA';

const userDataAction = createAction(SIGNIN_USER_DATA);

const initState = {
  // 초기 사용자 정보
  user: {},
};

export const postSingIn = (userId, userPw, appId) => async dispatch => {
  try {
    let userData = {
      userId,
      userPw,
      appId,
    };
    const jsonData = await api.post('/signIn', {body: userData});
    if (jsonData.statusCode == 200) {
      const result = jsonData.result;
      await storeData('token', result.token);
      await storeData('userId', result.userId);
      dispatch(userDataAction(result));
      return true;
    } else {
      throw 'error';
    }
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
