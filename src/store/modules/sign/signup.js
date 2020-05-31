import {handleActions} from 'redux-actions';
import api from '../../../utils/api';
import {storeData, removeAllData, getData} from '../../../utils/util';

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

// 카카오톡 회원가입
export const kakaoSignUp = userData => async dispatch => {
  const data = JSON.stringify(userData);

  try {
    const jsonData = await api.post(`/kakao/signIn`, {
      body: data,
    });

    if (jsonData.success) {
      await storeData('token', jsonData.token.token);
      await storeData('provider', 'kakao');
      return jsonData.token.token;
    }
    return false;
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

// SMS 인증번호 요청
export const smsRequest = tel => async dispatch => {
  const data = JSON.stringify(tel);
  try {
    const jsonData = await api.post(`/sendSMS`, {
      body: data,
    });

    console.log(jsonData);

    if (jsonData.success) {
      // 중복 시 , false.
      return true;
    } else {
      console.log('SMS 요청 실패');
      return false;
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('SMS 요청 실패');
  }
};

// SMS 인증
export const verifyPhoneNumber = telData => async dispatch => {
  const data = JSON.stringify(telData);

  try {
    const jsonData = await api.post(`/verifyPhoneNumber`, {
      body: data,
    });

    console.log(jsonData);

    if (jsonData.success) {
      // 중복 시 , false.
      return true;
    } else {
      console.log('SMS 인증 실패');
      return false;
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('SMS 인증 실패');
  }
};

// 회원탈퇴
export const closeAccount = passData => async dispatch => {
  try {
    let jsonData;
    const token = await getData('token');

    // 앱이면
    if (passData) {
      jsonData = await api.post(`/user/closeAccount`, {
        token: token,
        body: JSON.stringify(passData),
      });
      // 카톡이면
    } else {
      jsonData = await api.post(`/user/closeAccount`, {
        token: token,
      });
    }

    console.log(jsonData);

    if (jsonData.success) {
      await removeAllData();
      // 중복 시 , false.
      return true;
    } else {
      return false;
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('회원탈퇴 실패');
  }
};

export default handleActions({}, initState);
