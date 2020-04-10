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

const RESERVATION_LIST = 'reservation/RESERVATION_LIST';

const reservationListAction = createAction(RESERVATION_LIST);

const initState = {
  // 초기 사용자 정보
  reservation_list: null,
};

// 병원 측
export const reserveHospital = reservationData => async dispatch => {
  try {
    const token = await getData('token');

    // const jsonData = await api.post(`/office/officeIndex/${officeIndex}`, {
    //   token: token,
    //   body: reservationData,
    // });
    console.log(token);
    console.log({reservationData});
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

export default handleActions(
  {
    [RESERVATION_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.reservation_list = payload;
      }),
  },
  initState,
);
