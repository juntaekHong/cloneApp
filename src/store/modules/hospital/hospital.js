/* eslint-disable prettier/prettier */
/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {parseString} from 'xml2js';
import config from '../../../configs/config';
import {
  getData,
  storeData,
  removeData,
  removeAllData,
} from '../../../utils/util';

const initState = {
  // 내가 즐겨찾는 병원(즐겨찾기 리스트)
  mySubscriberList: [],
};

// 병원 즐겨찾기 추가 및 삭제
export const updateHospitalSubscriber = hpid => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.put(`/hospitalSubscriber/hpid/${hpid}`, {
      token: token,
    });

    console.log(jsonData);
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

export default handleActions(
  {
    //   [COMMON_INIT]: (state, {payload}) => produce(state, draft => {}),
  },
  initState,
);
