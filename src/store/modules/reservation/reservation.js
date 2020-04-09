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
  showMessage,
} from '../../../utils/util';
import config from '../../../configs/config';

const OFFICE_DATA = 'reservation/OFFICE_DATA';

const officeDataAction = createAction(OFFICE_DATA);

const initState = {
  // 초기 사용자 정보
  office: null,
};

// 병원 측
// export const getOfficeData = hpid => async dispatch => {
//   try {
//     const token = await getData('token');

//     const jsonData = await api.post(`/office/hpid/${hpid}`, {
//       token,
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
    [OFFICE_DATA]: (state, {payload}) =>
      produce(state, draft => {
        draft.office = payload;
      }),
  },
  initState,
);
