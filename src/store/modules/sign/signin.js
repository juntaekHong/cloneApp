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

    // 수정 필요
    const jsonData = await axios.post(`http://15.164.233.87:8001/signIn`, {
      headers: {Accept: 'application/json', 'Content-Type': 'application/json'},
      body: userData,
    });
    await storeData('token', jsonData.data.result.token);
    await dispatch(userDataAction(jsonData.data.result.token));
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// token 테스트 임시 생성
// export const updateHospitalSubscriber = () => async dispatch => {
//   try {
//     let hpid = 'A1110103';
//     let token = await getData('token');

//     console.log(token);

//     const jsonData = await api.put(`/hospitalSubscriber/hpid/${hpid}`, {
//       token: token,
//     });
//     console.log(jsonData);
//     return true;
//   } catch (err) {
//     console.log('error');
//     return false;
//   }
// };

export default handleActions(
  {
    [SIGNIN_USER_DATA]: (state, {payload}) =>
      produce(state, draft => {
        draft.user = payload;
      }),
  },
  initState,
);
