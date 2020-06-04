/* eslint-disable prettier/prettier */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';
import api from '../../../utils/api';
import {getData, storeData} from '../../../utils/util';

const SIGNIN_USER_DATA = 'signin/SIGNIN_USER_DATA';
const SIGNIN_ACCESS_TOKEN = 'signin/SIGNIN_ACCESS_TOKEN';

const userDataAction = createAction(SIGNIN_USER_DATA);
const accessTokenAction = createAction(SIGNIN_ACCESS_TOKEN);

const initState = {
  // 초기 사용자 정보
  user: null,

  // iamport access token
  access_token: null,
};

export const handleLoginData = value => dispatch => {
  dispatch(userDataAction(value));
};

export const signIn = (email, userPw, playerId) => async dispatch => {
  try {
    let userData = {
      email,
      userPw,
      playerId,
    };

    const jsonData = await api.post(`/user/signIn`, {
      body: userData,
    });

    // 이메일 인증 여부에 따라 데이터 저장
    if (typeof jsonData.result === 'object') {
      const result = jsonData.result;

      await storeData('token', result.token);
      await storeData('user_userNickName', result.userNickName);
      await storeData('user_name', result.userName);
      await storeData('email', result.email);
      await storeData('tel', result.tel);
      await dispatch(
        userDataAction({
          email: result.email,
          userNickName: result.userNickName,
          userName: result.userName,
          token: result.token,
          tel: result.tel,
        }),
      );
      return true;
    } else {
      if (jsonData.success) {
        await dispatch(userDataAction({email: email, result: jsonData.result}));
        return jsonData.result;
      } else {
        return false;
      }
    }
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 개인정보 수정
export const updateUserInfo = userData => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.patch(`/user`, {
      token: token,
      body: userData,
    });

    if (jsonData.success) {
      const result = Object.keys(userData).toString();

      if (jsonData.result.indexOf('중복') !== -1) {
        // 닉네임 중복
      } else {
        result === 'userNickName'
          ? await storeData('user_userNickName', userData[result])
          : result !== 'userPw'
          ? await storeData(result, userData[result])
          : null;
      }

      return jsonData.result;
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('개인정보 변경 실패...');
  }
};

// test
export const getToken = () => async dispatch => {
  try {
    const jsonData = await axios.post(`https://api.iamport.kr/users/getToken`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      imp_key: '4098980811262043',
      imp_secret:
        'rohO1SKrXGkTwpHGAUjPVI7jdXRscUREi8tk0dMYU6SrwA76urVqa3Jo0BQdwISPRl9RzWQt3IVzi2GN',
    });

    dispatch(accessTokenAction(jsonData.data.response.access_token));
  } catch (e) {
    // 서버 연동 실패
    console.log('토큰발급 실패');
  }
};

// test
// export const getSMS = () => async dispatch => {
//   try {
//     const jsonData = await api.post(`:8002/sendSMS`, {
//       body: {tel: '01034899742'},
//     });

//     console.log(jsonData);
//   } catch (e) {
//     // 서버 연동 실패
//     console.log('SMS인증 실패');
//   }
// };

export default handleActions(
  {
    [SIGNIN_USER_DATA]: (state, {payload}) =>
      produce(state, draft => {
        draft.user = payload;
      }),
    [SIGNIN_ACCESS_TOKEN]: (state, {payload}) =>
      produce(state, draft => {
        draft.access_token = payload;
      }),
  },
  initState,
);
