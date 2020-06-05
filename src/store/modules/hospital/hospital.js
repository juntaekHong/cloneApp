/* eslint-disable prettier/prettier */
/**
 * 액션 타입, 액션 생성자, redux-thunk, immer 예제
 */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import axios from 'axios';
import api from '../../../utils/api';
import {getData} from '../../../utils/util';
import config from '../../../configs/config';

const SUBSCRIBER_LIST = 'hospital/SUBSCRIBER_LIST';
const ERM_LIST = 'hospital/ERM_LIST';

const subscriberListAction = createAction(SUBSCRIBER_LIST);
const ermListAction = createAction(ERM_LIST);

const initState = {
  // 내가 즐겨찾는 병원(즐겨찾기 리스트)
  subscriber_list: [],

  ermList: [],
};

export const handlerSubscriberListInit = () => dispatch => {
  dispatch(subscriberListAction([]));
};

// 병원 즐겨찾기 추가 및 삭제
export const updateHospitalSubscriber = hpid => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.put(`/hospitalSubscriber/hpid/${hpid}`, {
      token: token,
    });

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 병원 즐겨찾기 리스트 조회
export const getAllHospitalSubscribers = () => async dispatch => {
  try {
    const token = await getData('token');

    if (token !== null) {
      const Long = await getData('location_long');
      const Lat = await getData('location_lat');

      let location = {lon: Long, lat: Lat};
      location = JSON.stringify(location);

      const jsonData = await api.get(
        `/allHospitalSubscriber/?location=${location}`,
        {
          token: token,
        },
      );

      await dispatch(subscriberListAction(jsonData.result));
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 약국 위치기반 정보 불러오기
export const getErmList = (lon, lat) => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.erm_url}serviceKey=${
        config.erm_serviceKey
      }&WGS84_LON=${lon}&WGS84_LAT=${lat}&pageNo=1&numOfRows=50`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    await dispatch(ermListAction(jsonData.data.response.body.items.item));
    console.log(jsonData.data.response.body.items.item);
  } catch (e) {
    // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
    console.log('erm list insert fail');
  }
};

export default handleActions(
  {
    [SUBSCRIBER_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.subscriber_list = payload;
      }),
    [ERM_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.ermList = payload;
      }),
  },
  initState,
);
