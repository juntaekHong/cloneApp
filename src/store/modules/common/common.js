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
const COMMON_FIRST_SCREEN_LOADING = 'common/COMMON_FIRST_SCREEN_LOADING';
const COMMON_LOADING = 'common/COMMON_LOADING';
// const COMMON_APP_VERSION = "common/COMMON_APP_VERSION";
const LOCATION_LATITUDE = 'common/LOCATION_LATITUDE';
const LOCATION_LONGITUDE = 'common/LOCATION_LONGITUDE';
const ADDRESS = 'common/ADDRESS';
const HOSPITAL_LIST = 'common/HOSPITAL_LIST';
const HOSPITAL_DETAIL = 'common/HOSPITAL_DETAIL';
const PAGE_INDEX = 'common/Page_INDEX';

export const commonInit = createAction(COMMON_INIT);
export const firstScreenLoadingAction = createAction(
  COMMON_FIRST_SCREEN_LOADING,
);
export const loadingAction = createAction(COMMON_LOADING);
// const appVersionAction = createAction(COMMON_APP_VERSION);
const locationLatitudeAction = createAction(LOCATION_LATITUDE);
const locationLongitudeAction = createAction(LOCATION_LONGITUDE);
const addressAction = createAction(ADDRESS);
const hospitalListAction = createAction(HOSPITAL_LIST);
const hospitalDetailAction = createAction(HOSPITAL_DETAIL);
const pageIndexAction = createAction(PAGE_INDEX);

const initState = {
  // 앱 첫 실행 시, 보여짐.
  firstScreenLoading: true,
  loading: false,
  appVersion: {},

  // 내 위치 설정
  latitude: null,
  longitude: null,
  address: null,
  // 병원 리스트 불러오기
  hospitalList: [],
  // 병원 상세 정보 불러오기
  hospital_detail: [],

  page_index: 0,
};

export const handleFirstScreenLoading = bool => dispatch => {
  dispatch(firstScreenLoadingAction(bool));
};

export const handleLoading = value => dispatch => {
  dispatch(loadingAction(value));
};

export const handlePageIndex = number => dispatch => {
  dispatch(pageIndexAction(number));
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

// 처음 들어왔을 때, Init
export const locationInit = () => async dispatch => {
  const location_lat = await getData('location_lat');
  const location_long = await getData('location_long');

  if (location_lat !== null || location_long !== null) {
    await dispatch(locationLatitudeAction(parseFloat(location_lat)));
    await dispatch(locationLongitudeAction(parseFloat(location_long)));
  }
};

// 내 위치 설정
export const myLocation = (Lat, Long) => async dispatch => {
  const location_lat = await getData('location_lat');
  const location_long = await getData('location_long');

  if (location_lat === null || location_long === null) {
    await dispatch(locationLatitudeAction(Lat));
    await dispatch(locationLongitudeAction(Long));
    await storeData('location_lat', Lat + '');
    await storeData('location_long', Long + '');
  } else {
    // 이미 내 위치 데이터가 있는 경우
    await dispatch(locationLatitudeAction(parseFloat(location_lat)));
    await dispatch(locationLongitudeAction(parseFloat(location_long)));
  }
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
    await dispatch(hospitalListAction([]));
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

// 좌표 주소 변환
export const getMyAddress = (Long, Lat) => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.toAddress_url}?x=${Long}&y=${Lat}&output=json&epsg=epsg:4326&apiKey=${config.toAddress_ServiceKey}`,
    );

    // 좌표를 통해 주소 찾는 결과에 따라 주는 key 값이 달라져서 이렇게 처리.
    jsonData.data.NEW_JUSO === undefined
      ? await dispatch(addressAction('정확한 주소를 찾을 수 없습니다.'))
      : await dispatch(addressAction(jsonData.data.NEW_JUSO));
  } catch (e) {
    // 내 도로명 주소 공공 api 요청 실패 => 서버 연동 실패
    await dispatch(addressAction('error'));
  }
};

export default handleActions(
  {
    [COMMON_INIT]: (state, {payload}) => produce(state, draft => {}),
    [COMMON_FIRST_SCREEN_LOADING]: (state, {payload}) =>
      produce(state, draft => {
        draft.firstScreenLoading = payload;
      }),
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
    [ADDRESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.address = payload;
      }),
    [HOSPITAL_LIST]: (state, {payload}) =>
      produce(state, draft => {
        payload.map(item => {
          draft.hospitalList.push(item);
        });
      }),
    [HOSPITAL_DETAIL]: (state, {payload}) =>
      produce(state, draft => {
        draft.hospital_detail = payload;
      }),
    [PAGE_INDEX]: (state, {payload}) =>
      produce(state, draft => {
        draft.page_index = payload;
      }),
  },
  initState,
);
