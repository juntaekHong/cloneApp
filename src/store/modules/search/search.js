import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';

const SEARCH_LIST = 'search/SEARCH_LIST';
const SEARCH_HISTORY_LIST = 'search/SEARCH_HISTORY_LIST';
const SEARCH_RESULT_LOADING = 'search/SEARCH_RESULT_LOADING';

const searchListAction = createAction(SEARCH_LIST);
const searchHistoryListAction = createAction(SEARCH_HISTORY_LIST);
const searchResultLoadingAction = createAction(SEARCH_RESULT_LOADING);

const initState = {
  searchList: [],
  searchHistoryList: [],
  searchResultLoading: false,
};

// 검색 기록
export const handleSearchHistoryList = list => dispatch => {
  dispatch(searchHistoryListAction(list));
};

// 검색 결과 페이지 로딩
export const handleSearchLoading = bool => dispatch => {
  dispatch(searchResultLoadingAction(bool));
};

// 병원 검색
export const searchHospital = SearchText => async dispatch => {
  try {
    const jsonData = await api.get(`/search/content/${SearchText}`);

    await dispatch(searchListAction(jsonData.result));
  } catch (e) {
    // 서버 연동 실패
    console.log('검색 실패...');
  }
};

export default handleActions(
  {
    [SEARCH_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.searchList = payload;
      }),
    [SEARCH_HISTORY_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.searchHistoryList = payload;
      }),
    [SEARCH_RESULT_LOADING]: (state, {payload}) =>
      produce(state, draft => {
        draft.searchResultLoading = payload;
      }),
  },
  initState,
);
