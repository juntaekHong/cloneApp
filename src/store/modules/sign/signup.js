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

export default handleActions({}, initState);
