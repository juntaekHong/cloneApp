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
  reservation_list: [],
};

// 병원 예약하기 기능
export const reserveHospital = reservationData => async dispatch => {
  try {
    const token = await getData('token');

    let data = {
      reservationDate: reservationData.reservationDate,
      reservationTime: reservationData.reservationTime,
    };

    if (reservationData.comment.length !== 0) {
      data.comment = reservationData.comment;
    }

    if (reservationData.treatmentName.indexOf('선택') === -1) {
      data.treatmentName = reservationData.treatmentName;
    }

    const jsonData = await api.post(
      `/reservation/officeIndex/${reservationData.officeIndex}`,
      {
        token: token,
        body: data,
      },
    );

    if (jsonData.success) {
      await dispatch(reservationListAction(jsonData.result));
      return true;
    } else {
      // 중복 예약
      return false;
    }
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
