import {handleActions} from 'redux-actions';
import api from '../../../utils/api';

// const USER_DATA = 'signup/USER_DATA';

// export const userDataAction = createAction(USER_DATA);

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

export default handleActions(
  {
    // [USER_DATA]: (state, {payload}) =>
    //   produce(state, draft => {
    //     draft.user_data = payload;
    //   }),
  },
  initState,
);
