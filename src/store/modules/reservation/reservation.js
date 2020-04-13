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
const HISTORY_LIST = 'reservation/HISTORY_LIST';

const reservationListAction = createAction(RESERVATION_LIST);
const historyListActions = createAction(HISTORY_LIST);

const initState = {
  // 예약 내역 리스트
  reservation_list: [],
  // 진료 내역 리스트
  history_list: [],
};

// 로그아웃 시, 진료내역 관련 리스트들 초기화
export const handleReservationListInit = () => dispatch => {
  dispatch(reservationListAction([]));
  dispatch(historyListActions([]));
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

// 현재 진행중인 예약 조회
export const getReservation = () => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.get(`/reservation`, {
      token: token,
    });

    if (jsonData.success) {
      await dispatch(reservationListAction(jsonData.result.rows));
      return true;
    } else {
      // 불러오기 실패.
      return false;
    }
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 진료 내역 리스트 조회 - 지난 내역들
export const getReservationLog = () => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.get(`/reservation/history`, {
      token: token,
    });

    if (jsonData.success) {
      await dispatch(historyListActions(jsonData.result.rows));
      return true;
    } else {
      // 불러오기 실패.
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
    [HISTORY_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.history_list = payload;
      }),
  },
  initState,
);
