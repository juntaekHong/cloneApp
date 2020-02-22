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

const COMMON_INIT = 'common/COMMON_INIT';
const COMMON_LOADING = 'common/COMMON_LOADING';
// const COMMON_APP_VERSION = "common/COMMON_APP_VERSION";
const HOSPITAL_LIST = 'common/HOSPITAL_LIST';

export const commonInit = createAction(COMMON_INIT);
const loadingAction = createAction(COMMON_LOADING);
// const appVersionAction = createAction(COMMON_APP_VERSION);
const hospitalListAction = createAction(HOSPITAL_LIST);

const initState = {
  loading: false,
  appVersion: {},

  // 병원 리스트 불러오기
  hospitalList: null,
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

const parseXml = data => {
  return new Promise((resolve, reject) => {
    parseString(data, async (err, result) => {
      if (err) reject(err);
      else resolve(result);
    });
  });
};

// 병원 리스트 호출
export const getHospitalList = () => async dispatch => {
  try {
    const jsonData = await axios.get(
      `http://apis.data.go.kr/B552657/HsptlAsembySearchService/getHsptlMdcncLcinfoInqire?WGS84_LON=127.085156592737&WGS84_LAT=37.4881325624879&pageNo=1&numOfRows=1&ServiceKey=I2F%2B1Oce6drCgGSm33cvy%2F3uLnHQ4BY46ALKDYUbKqPqslTOBJTUzx1yH%2FPt%2FsnttC0mZeVuTudJWDJ70xLCnw%3D%3D`,
    );
    const {result} = await parseXml(jsonData.data);
    await dispatch(hospitalListAction(result));
  } catch (e) {
    await dispatch(hospitalListAction('asdsad'));
  }
};

export default handleActions(
  {
    [COMMON_INIT]: (undefined, {}) => {},
    [COMMON_LOADING]: (state, {payload}) =>
      produce(state, draft => {
        draft.loading = payload;
      }),
    // [COMMON_APP_VERSION]: (state, {payload}) =>
    //   produce(state, draft => {
    //     draft.appVersion = payload;
    //   }),
    [HOSPITAL_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.hospitalList = payload;
      }),
  },
  initState,
);
