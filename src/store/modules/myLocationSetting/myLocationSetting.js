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

const SEARCH_ADDRESS_INIT = 'myLocationSetting/SEARCH_ADDRESS_INIT';
const SEARCH_ADDRESS = 'myLocationSetting/SEARCH_ADDRESS';

export const searchAddressAction = createAction(SEARCH_ADDRESS);
export const searchAddressInitAction = createAction(SEARCH_ADDRESS_INIT);

const initState = {
  search_address: null,
};

// 검색했던 주소 데이터 삭제
export const handleSearchAddressInit = () => dispatch => {
  dispatch(searchAddressInitAction(null));
};

// 주소 검색
export const searchAddress = (place, count, page) => async dispatch => {
  try {
    // 장소 검색
    const jsonData = await axios.get(
      `${config.searchAddress_url}category=poi&q=${place}&pageunit=${count}&output=json&pageindex=${page}&apiKey=${config.searchAddress_ServiceKey}`,
    );
    // // 지번 검색
    // const jsonData2 = await axios.get(
    //   `${config.searchAddress_url}category=jibun&q=성남시 분당구 삼평동 624-1&pageunit=10&output=json&pageindex=1&apiKey=${config.searchAddress_ServiceKey}`,
    // );
    // // 도로명 검색
    // const jsonData3 = await axios.get(
    //   `${config.searchAddress_url}category=juso&q=성남시 분당구 판교로 242&pageunit=10&output=json&pageindex=1&apiKey=${config.searchAddress_ServiceKey}`,
    // );

    await dispatch(searchAddressAction(jsonData.data.LIST));
    console.log(jsonData.data.LIST);
  } catch (e) {
    // 주소 검색 공공 api 요청 실패 => 서버 연동 실패
    await dispatch(searchAddressAction([]));
  }
};

export default handleActions(
  {
    [SEARCH_ADDRESS_INIT]: (state, {payload}) =>
      produce(state, draft => {
        draft.search_address = payload;
      }),
    [SEARCH_ADDRESS]: (state, {payload}) =>
      produce(state, draft => {
        draft.search_address = payload;
      }),
  },
  initState,
);
