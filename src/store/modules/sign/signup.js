import {handleActions} from 'redux-actions';
import api from '../../../utils/api';

const initState = {};

// 회원가입
export const signUp = userData => async dispatch => {
  try {
    const jsonData = await api.post(`/user/signUp`, {
      body: userData,
    });
  } catch (e) {
    // 서버 연동 실패
    console.log('회원가입 실패...');
  }
};

// 이메일&닉네임 중복 검사
export const checkDuplicated = signUpData => async dispatch => {
  try {
    const jsonData = await api.post(`/checkDuplicated`, {
      body: signUpData,
    });

    if (jsonData.success) {
      // 중복 시 , false.
      if (jsonData.result.error) {
        return false;
      } else {
        return true;
      }
    } else {
      console.log('중복 검사 실패');
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('중복 검사 실패');
  }
};

export default handleActions({}, initState);
