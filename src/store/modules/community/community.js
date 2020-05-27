import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';

const HASH_TAG_LIST = 'community/HASH_TAG_LIST';
const POST_LIST = 'community/POST_LIST';

const hashTagListAction = createAction(HASH_TAG_LIST);
const postListAction = createAction(POST_LIST);

const initState = {
  hashTagList: [],
  postList: [],
};

// 해쉬태그 전체 리스트 조회
export const listHashtag = () => async dispatch => {
  try {
    const jsonData = await api.get(`/hashTag`);

    if (jsonData.success) {
      await dispatch(hashTagListAction(jsonData.result.rows));
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('검색 실패...');
  }
};

// 게시글 검색 조회
export const postList = (filter, pn) => async dispatch => {
  try {
    const Pn = JSON.stringify(pn);

    const jsonData = await api.get(`/posts?filter=${filter}&pn=${Pn}`);

    if (jsonData.success) {
      await dispatch(postListAction(jsonData.result));
    }
  } catch (e) {
    // 서버 연동 실패
    console.log('검색 실패...');
  }
};

export default handleActions(
  {
    [HASH_TAG_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.hashTagList = payload;
      }),
    [POST_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.postList = payload;
      }),
  },
  initState,
);
