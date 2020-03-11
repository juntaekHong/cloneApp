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
const SEARCH_TOTAL = 'myLocationSetting/SEARCH_TOTAL';

export const searchAddressAction = createAction(SEARCH_ADDRESS);
export const searchAddressInitAction = createAction(SEARCH_ADDRESS_INIT);
const searchTotalAction = createAction(SEARCH_TOTAL);

const initState = {
  search_address: [],
  search_total: null,
};

// 검색했던 주소 데이터 삭제
export const handleSearchAddressInit = () => dispatch => {
  dispatch(searchAddressInitAction(null));
};

// 주소 검색
export const searchAddress = (place, page, count) => async dispatch => {
  try {
    const jsonData = await axios.get(
      `${config.searchAddress_url}query=${place}&page=${page}&size=${count}`,
      {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: config.searchAddress_ServiceKey,
        },
      },
    );

    console.log(jsonData.data);
    await dispatch(searchAddressAction(jsonData.data.documents));
    await dispatch(searchTotalAction(jsonData.data.meta.total_count));
  } catch (e) {
    console.log('fail');
    // 주소 검색 공공 api 요청 실패 => 서버 연동 실패
    await dispatch(searchAddressAction([]));
  }
};

export default handleActions(
  {
    [SEARCH_ADDRESS_INIT]: (state, {payload}) =>
      produce(state, draft => {
        draft.search_address = [];
        draft.search_total = null;
      }),
    [SEARCH_ADDRESS]: (state, {payload}) =>
      produce(state, draft => {
        payload.map(item => {
          draft.search_address.push(item);
        });
      }),
    [SEARCH_TOTAL]: (state, {payload}) =>
      produce(state, draft => {
        draft.search_total = payload;
      }),
  },
  initState,
);
