/* eslint-disable prettier/prettier */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import {getData} from '../../../utils/util';

const REVIEW_LIST = 'review/REVIEW_LIST';
const REVIEW_TOTAL = 'review/REVIEW_TOTAL';

const MY_REVIEW_LIST = 'review/MY_REVIEW_LIST';

const USER_REVIEW_LIST = 'review/USER_REVIEW_LIST';
const USER_REVIEW_TOTAL = 'review/USER_REVIEW_TOTAL';

const reviewListAction = createAction(REVIEW_LIST);
const reviewTotalAction = createAction(REVIEW_TOTAL);

const myReviewListAction = createAction(MY_REVIEW_LIST);

const userReviewListAction = createAction(USER_REVIEW_LIST);
const userReviewTotalAction = createAction(USER_REVIEW_TOTAL);

const initState = {
  review_list: null,
  review_total: null,

  my_review_list: [],

  user_review_list: [],
  user_review_total: null,
};

// 병원 리스트 초기화
export const handleReviewListInit = () => dispatch => {
  dispatch(reviewListAction(null));
  dispatch(reviewTotalAction(null));
};

// 다른 유저 리스트 초기화
export const handleUserReviewListInit = () => dispatch => {
  dispatch(userReviewListAction([]));
  dispatch(userReviewTotalAction(null));
};

// 다른 유저 리스트 초기화
export const handleMyReviewListInit = () => dispatch => {
  dispatch(myReviewListAction([]));
};

// S3 주소로 이미지 저장
export const uploadImg = formData => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.post(`/review/img`, {
      header: {
        'Content-Type': 'multipart/form-data',
      },
      token: token,
      body: formData,
    });

    return jsonData.url;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 병원 리뷰 리스트
export const getAllReview = hpid => async dispatch => {
  try {
    const jsonData = await api.get(`/review/hpid/${hpid}`);

    if (jsonData.success) {
      await dispatch(reviewTotalAction(jsonData.result.count));
      await dispatch(reviewListAction(jsonData.result.rows));
    } else {
      console.log('fail');
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 리뷰 쓰기
export const postReview = (hpid, reviewData) => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.post(`/review/hpid/${hpid}`, {
      token: token,
      body: reviewData,
    });

    if (jsonData.success) {
    } else {
      console.log('fail');
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 내 리뷰 수정
export const updateReview = (reviewIndex, reviewData) => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.patch(`/review/reviewIndex/${reviewIndex}`, {
      token: token,
      body: reviewData,
    });

    if (jsonData.success) {
      // 성공
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 내 리뷰 삭제
export const deleteReview = reviewIndex => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.delete(`/review/reviewIndex/${reviewIndex}`, {
      token: token,
    });

    if (jsonData.success) {
      // 성공
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 내 리뷰 리스트
export const getMyReview = () => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.get(`/review`, {
      token: token,
    });

    if (jsonData.success) {
      await dispatch(myReviewListAction(jsonData.result.rows));
    }
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 다른 유저 리뷰 리스트 보기
export const getReviewByUserNickName = useNickName => async dispatch => {
  try {
    const jsonData = await api.get(`/review/userNickName/${useNickName}`);

    if (jsonData.success) {
      await dispatch(userReviewTotalAction(jsonData.result.count));
      await dispatch(userReviewListAction(jsonData.result.rows));
    }
    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

export default handleActions(
  {
    [REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.review_list = payload;
      }),
    [REVIEW_TOTAL]: (state, {payload}) =>
      produce(state, draft => {
        draft.review_total = payload;
      }),
    [MY_REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.my_review_list = payload;
      }),
    [USER_REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.user_review_list = payload;
      }),
    [USER_REVIEW_TOTAL]: (state, {payload}) =>
      produce(state, draft => {
        draft.user_review_total = payload;
      }),
  },
  initState,
);
