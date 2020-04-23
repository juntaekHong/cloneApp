/* eslint-disable prettier/prettier */
import {createAction, handleActions} from 'redux-actions';
import {produce} from 'immer';
import api from '../../../utils/api';
import axios from 'axios';
import {
  getData,
  storeData,
  removeAllData,
  removeData,
  showMessage,
} from '../../../utils/util';
import config from '../../../configs/config';

const REVIEW_LIST = 'review/REVIEW_LIST';
const REVIEW_TOTAL = 'review/REVIEW_TOTAL';

const MY_REVIEW_LIST = 'review/MY_REVIEW_LIST';

const reviewListAction = createAction(REVIEW_LIST);
const reviewTotalAction = createAction(REVIEW_TOTAL);

const myReviewListAction = createAction(MY_REVIEW_LIST);

const initState = {
  review_list: null,
  review_total: null,

  my_review_list: [],
};

// 병원 리스트 뷰 초기화
export const handleReviewListInit = () => dispatch => {
  dispatch(reviewListAction(null));
  dispatch(reviewTotalAction(null));
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
export const postReview = image => async dispatch => {
  try {
    const token = await getData('token');

    const reviewData = {
      contents: '이미지 테스트',
      url: image,
      rating: '5',
    };

    const jsonData = await api.post(`/review/hpid/A1100008`, {
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

export default handleActions(
  {
    [REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.review_list = payload;

        if (draft.review_list !== null) {
          draft.review_list.reverse();
        }
      }),
    [REVIEW_TOTAL]: (state, {payload}) =>
      produce(state, draft => {
        draft.review_total = payload;
      }),
    [MY_REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.my_review_list = payload;
      }),
  },
  initState,
);
