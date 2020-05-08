import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';

const SEARCH_LIST = 'search/SEARCH_LIST';
const SEARCH_HISTORY_LIST = 'search/SEARCH_HISTORY_LIST';

const searchListAction = createAction(SEARCH_LIST);
const searchHistoryListAction = createAction(SEARCH_HISTORY_LIST);

const initState = {
  searchList: [],
  searchHistoryList: [],
};

// 검색 기록
export const handleSearchHistoryList = list => dispatch => {
  dispatch(searchHistoryListAction(list));
};

// 병원 검색
export const searchHospital = SearchText => async dispatch => {
  try {
    const jsonData = await api.get(`/search/content/${SearchText}`);

    console.log(jsonData);

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
  },
  initState,
);
