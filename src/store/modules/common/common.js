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
import {Platform} from 'react-native';
import {
  getData,
  storeData,
  removeData,
  removeAllData,
} from '../../../utils/util';

const COMMON_INIT = 'common/COMMON_INIT';
const COMMON_LOADING = 'common/COMMON_LOADING';
// const COMMON_APP_VERSION = "common/COMMON_APP_VERSION";
const LOCATION_LATITUDE = 'common/LOCATION_LATITUDE';
const LOCATION_LONGITUDE = 'common/LOCATION_LONGITUDE';
const HOSPITAL_LIST = 'common/HOSPITAL_LIST';
const HOSPITAL_DETAIL = 'common/HOSPITAL_DETAIL';

export const commonInit = createAction(COMMON_INIT);
export const loadingAction = createAction(COMMON_LOADING);
// const appVersionAction = createAction(COMMON_APP_VERSION);
const locationLatitudeAction = createAction(LOCATION_LATITUDE);
const locationLongitudeAction = createAction(LOCATION_LONGITUDE);
const hospitalListAction = createAction(HOSPITAL_LIST);
const hospitalDetailAction = createAction(HOSPITAL_DETAIL);

const initState = {
  loading: false,
  appVersion: {},

  // 내 위치 설정
  latitude: null,
  longitude: null,
  // 병원 리스트 불러오기
  hospitalList: [],
  // 병원 상세 정보 불러오기
  hospital_detail: [],
};

export const handleLoading = value => dispatch => {
  dispatch(loadingAction(value));
};

// export const getAppVersion = () => async dispatch => {
//   try {
//     const jsonData = await api.get(`/version`);
//     if (jsonData.statusCode == 200) {
//       const { result } = jsonData;
//       dispatch(appVersionAction(result));
//     } else {
//     }
//   } catch (e) {}
// };

// const parseXml = data => {
//   return new Promise((resolve, reject) => {
//     parseString(data, async (err, result) => {
//       if (err) reject(err);
//       else resolve(result);
//     });
//   });
// };

// 내 위치 설정
export const myLocation = (Lat, Long) => async dispatch => {
  // await removeAllData();
  // const location_lat = getData('location_lat');
  // const location_long = getData('location_long');

  // if (location_lat === null || location_long === null) {
  await dispatch(locationLatitudeAction(Lat + ''));
  await dispatch(locationLongitudeAction(Long + ''));
  //   await storeData('location_lat', Lat + '');
  //   await storeData('location_long', Long + '');
  // } else {
  //   // 이미 내 위치 데이터가 있는 경우
  // await dispatch(locationLatitudeAction(Lat + ''));
  // await dispatch(locationLongitudeAction(Long + ''));
  // }
};

// 병원 리스트 호출
export const getHospitalList = (Long, Lat, rows) => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.hospital_url}?WGS84_LON=${Long}&WGS84_LAT=${Lat}&pageNo=1&numOfRows=${rows}&ServiceKey=${config.hospital_ServiceKey}`,
    );
    await dispatch(hospitalListAction(jsonData.data.response.body.items.item));
  } catch (e) {
    // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
  }
};

// 병원 상세페이지 정보 요청
export const getHospitalDetail = hpid => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.hospital_detail_url}?HPID=${hpid}&ServiceKey=${config.hospital_ServiceKey}`,
    );
    await dispatch(
      hospitalDetailAction(jsonData.data.response.body.items.item),
    );
  } catch (e) {
    // 병원 상세 정보 공공 api 요청 실패 => 서버 연동 실패
  }
};

export default handleActions(
  {
    [COMMON_INIT]: (state, {payload}) => produce(state, draft => {}),
    [COMMON_LOADING]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = payload;
      }),
    // [COMMON_APP_VERSION]: (state, {payload}) =>
    //   produce(state, draft => {
    //     draft.appVersion = payload;
    //   }),
    [LOCATION_LATITUDE]: (state, {payload}) =>
      produce(state, draft => {
        draft.latitude = payload;
      }),
    [LOCATION_LONGITUDE]: (state, {payload}) =>
      produce(state, draft => {
        draft.longitude = payload;
      }),
    [HOSPITAL_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.hospitalList = payload;
      }),
    [HOSPITAL_DETAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.hospital_detail = payload;
      }),
  },
  initState,
);
