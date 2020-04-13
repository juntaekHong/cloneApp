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
import {handleLoginData} from '../sign/signin';

const COMMON_INIT = 'common/COMMON_INIT';
const COMMON_FIRST_SCREEN_LOADING = 'common/COMMON_FIRST_SCREEN_LOADING';
const COMMON_LOADING = 'common/COMMON_LOADING';
// const COMMON_APP_VERSION = "common/COMMON_APP_VERSION";
const LOCATION_LATITUDE = 'common/LOCATION_LATITUDE';
const LOCATION_LONGITUDE = 'common/LOCATION_LONGITUDE';
const ADDRESS = 'common/ADDRESS';
const EXTRA_ADDRESS_INIT = 'common/EXTRA_ADDRESS_INIT';
const EXTRA_ADDRESS = 'common/EXTRA_ADDRESS';
const HOSPITAL_LIST_INIT = 'common/HOSPITAL_LIST_INIT';
const HOSPITAL_LIST = 'common/HOSPITAL_LIST';
const HOSPITAL_DETAIL = 'common/HOSPITAL_DETAIL';
const PAGE_INDEX = 'common/Page_INDEX';
const START_END_INIT = 'common/START_END_INIT';
const START_END = 'common/START_END';

export const commonInit = createAction(COMMON_INIT);
export const firstScreenLoadingAction = createAction(
  COMMON_FIRST_SCREEN_LOADING,
);
export const loadingAction = createAction(COMMON_LOADING);
// const appVersionAction = createAction(COMMON_APP_VERSION);
const locationLatitudeAction = createAction(LOCATION_LATITUDE);
const locationLongitudeAction = createAction(LOCATION_LONGITUDE);
const addressAction = createAction(ADDRESS);
const extraAddressInitAction = createAction(EXTRA_ADDRESS_INIT);
const extraAddressAction = createAction(EXTRA_ADDRESS);
const hospitalListInitAction = createAction(HOSPITAL_LIST_INIT);
const hospitalListAction = createAction(HOSPITAL_LIST);
const hospitalDetailAction = createAction(HOSPITAL_DETAIL);
const pageIndexAction = createAction(PAGE_INDEX);
export const startEndInitAction = createAction(START_END_INIT);
const startEndAction = createAction(START_END);

const initState = {
  // 앱 첫 실행 시, 보여짐.
  firstScreenLoading: true,
  loading: false,
  appVersion: {},

  // 내 위치 설정
  latitude: null,
  longitude: null,
  address: null,
  // 임시 현 위치 주소 저장
  extra_address: null,
  // 병원 리스트 불러오기
  hospitalList: [],
  // 병원 상세 정보 불러오기
  hospital_detail: null,
  // 내 위치에서 병원 길찾기
  start_end: null,

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

export const handleHospitalListInit = () => dispatch => {
  dispatch(hospitalListInitAction());
};

export const handleExtraAddressInit = () => dispatch => {
  dispatch(extraAddressInitAction());
};

export const handleTimeInfo = value => dispatch => {
  dispatch(hospitalDetailAction(value));
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

// 앱 실행하여 들어왔을 때, Init
export const locationInit = () => async dispatch => {
  const location_lat = await getData('location_lat');
  const location_long = await getData('location_long');
  const email = await getData('email');
  const user_name = await getData('user_name');
  const token = await getData('token');

  if (location_lat !== null || location_long !== null) {
    await dispatch(locationLatitudeAction(parseFloat(location_lat)));
    await dispatch(locationLongitudeAction(parseFloat(location_long)));
  }

  if (email !== null && user_name !== null && token !== null) {
    await dispatch(
      handleLoginData({email: email, userName: user_name, token: token}),
    );
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

// 위치 설정 페이지를 통한 내 위치 재설정
export const resetMyLocation = () => async dispatch => {
  await removeData('location_lat');
  await removeData('location_long');
};

// 병원 리스트 호출
// export const getHospitalList = (Long, Lat, rows) => async dispatch => {
//   try {
//     const jsonData = await axios.get(
//       `${config.hospital_url}?WGS84_LON=${Long}&WGS84_LAT=${Lat}&pageNo=1&numOfRows=${rows}&ServiceKey=${config.hospital_ServiceKey}`,
//     );

//     await dispatch(hospitalListAction(jsonData.data.response.body.items.item));
//   } catch (e) {
//     // 병원 리스트 공공 api 요청 실패 => 서버 연동 실패
//     await dispatch(hospitalListInitAction());
//     console.log('hospital list insert fail');
//   }
// };

// 병원 리스트 호출
export const getHospitalList = (Long, Lat) => async dispatch => {
  let filter = {lon: Long, lat: Lat};

  filter = JSON.stringify(filter);

  try {
    const jsonData = await api.get(`/hospital/?filter=${filter}`);

    await dispatch(hospitalListAction(jsonData.result));
  } catch (e) {
    // 서버 연동 실패
    await dispatch(hospitalListInitAction());
    console.log('hospital list insert fail');
  }
};

// 병원 상세페이지 정보 요청 - 공공 API
// export const getHospitalDetail = hpid => async dispatch => {
//   try {
//     const jsonData = await axios.get(
//       `${config.hospital_detail_url}?HPID=${hpid}&ServiceKey=${config.hospital_ServiceKey}`,
//     );
//     await dispatch(
//       hospitalDetailAction(jsonData.data.response.body.items.item),
//     );
//   } catch (e) {
//     // 병원 상세 정보 공공 api 요청 실패 => 서버 연동 실패
//   }
// };

// 좌표 주소 변환
export const getMyAddress = (
  Long,
  Lat,
  boolean,
  const_address,
) => async dispatch => {
  let customAddress = '';

  try {
    const jsonData = await axios.get(
      `${
        config.toAddress_url
      }?x=${Long}&y=${Lat}&output=json&epsg=epsg:4326&apiKey=${
        config.toAddress_ServiceKey
      }`,
    );

    // 좌표를 통해 주소 찾는 결과에 따라 주는 key 값이 달라져서 이렇게 처리.
    if (jsonData.data.NEW_JUSO === undefined) {
      const jsonData2 = await axios.get(
        `${
          config.googleMaps_url
        }origin=${Lat},${Long}&destination=${37.5525774},${126.9337294}&mode=transit&departure_time=now&language=ko&key=${
          config.googleMaps_ServiceKey
        }`,
      );

      if (boolean === undefined) {
        let address = jsonData2.data.routes[0].legs[0].start_address.split(' ');

        for (let i = 2; i < address.length; i++) {
          customAddress += address[i] + ' ';
        }

        await dispatch(addressAction(customAddress));
      } else {
        await dispatch(
          extraAddressAction(jsonData2.data.routes[0].legs[0].start_address),
        );
      }
    } else {
      if (boolean === undefined) {
        let address = jsonData.data.NEW_JUSO.split(' ');

        for (let i = 2; i < address.length; i++) {
          customAddress += address[i] + ' ';
        }

        await dispatch(addressAction(customAddress));
      } else {
        await dispatch(extraAddressAction(jsonData.data.NEW_JUSO));
      }
    }
  } catch (e) {
    // 내 도로명 주소 공공 api 요청 실패 => 서버 연동 실패
    if (const_address !== undefined) {
      await dispatch(addressAction(const_address));
    } else {
      await dispatch(addressAction('주소 지정할 수 없습니다.'));
    }
  }
};

// 병원 상세 페이지에서 길찾기
export const getDirection = (
  startLat,
  startLong,
  endLat,
  endLong,
) => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${
        config.googleMaps_url
      }origin=${startLat},${startLong}&destination=${endLat},${endLong}&mode=transit&departure_time=now&language=ko&key=${
        config.googleMaps_ServiceKey
      }`,
    );

    await dispatch(startEndAction(jsonData.data.routes));
  } catch (e) {
    //
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
    [EXTRA_ADDRESS_INIT]: (state, {payload}) =>
      produce(state, draft => {
        draft.extra_address = null;
      }),
    [EXTRA_ADDRESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.extra_address = payload;
      }),
    [HOSPITAL_LIST_INIT]: (state, {payload}) =>
      produce(state, draft => {
        draft.hospitalList = [];
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
    [START_END_INIT]: (state, {payload}) =>
      produce(state, draft => {
        draft.start_end = null;
      }),
    [START_END]: (state, {payload}) =>
      produce(state, draft => {
        draft.start_end = payload;
      }),
  },
  initState,
);
