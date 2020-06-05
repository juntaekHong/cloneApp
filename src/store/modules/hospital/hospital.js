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
  } catch (e) {
    // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
    console.log('erm list insert fail');
  }
};

// 불러온 약국 상세 정보 불러오기
export const getErmDetail = hpid => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.erm_detail_url}serviceKey=${
        config.erm_serviceKey
      }&HPID=${hpid}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
      },
    );

    const result = jsonData.data.response.body.items.item;

    const ermTimeFormat = time => {
      time = String(time);
      return time[0] + time[1] + ':' + time[2] + time[3];
    };

    const dataFomrat = {
      type: 'erm',
      hpid: result.hpid,
      dutyAddr: result.dutyAddr,
      dutyMapimg: result.dutyMapimg ? result.dutyMapimg : undefined,
      img: result.dutyImg ? result.dutyImg : null,
      dutyName: result.dutyName,
      dutyTel: result.dutyTel1,
      wgs84Lat: result.wgs84Lat,
      wgs84Lon: result.wgs84Lon,
      dutyInf: result.dutyInf ? result.dutyInf : null,
      dutyTime1: result.dutyTime1s
        ? ermTimeFormat(result.dutyTime1s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime1c)
        : '휴진',
      dutyTime2: result.dutyTime2s
        ? ermTimeFormat(result.dutyTime2s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime2c)
        : '휴진',
      dutyTime3: result.dutyTime3s
        ? ermTimeFormat(result.dutyTime3s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime3c)
        : '휴진',
      dutyTime4: result.dutyTime4s
        ? ermTimeFormat(result.dutyTime4s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime4c)
        : '휴진',
      dutyTime5: result.dutyTime5s
        ? ermTimeFormat(result.dutyTime5s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime5c)
        : '휴진',
      dutyTime6: result.dutyTime6s
        ? ermTimeFormat(result.dutyTime6s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime6c)
        : '휴진',
      dutyTime7: result.dutyTime7s
        ? ermTimeFormat(result.dutyTime7s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime7c)
        : '휴진',
      dutyTime8: result.dutyTime8s
        ? ermTimeFormat(result.dutyTime8s) +
          ' ~ ' +
          ermTimeFormat(result.dutyTime8c)
        : '휴진',
    };

    return dataFomrat;
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
