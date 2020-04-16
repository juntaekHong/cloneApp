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

const MY_REVIEW_LIST = 'review/MY_REVIEW_LIST';

const myReviewListAction = createAction(MY_REVIEW_LIST);

const initState = {
  my_review_list: [],
};

// 사진 서버 주소 지정으로 변경 테스트
export const uploadImg = formData => async dispatch => {
  try {
    const token = await getData('token');

    const jsonData = await api.post(`/img`, {
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

// 사진 업로드 테스트 - 업로드 정상
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
      console.log('success');
      console.log(jsonData.result);
    } else {
      console.log('fail');
    }

    return true;
  } catch (err) {
    console.log('error');
    return false;
  }
};

// 내 리뷰 모아보기 테스트
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
    [MY_REVIEW_LIST]: (state, {payload}) =>
      produce(state, draft => {
        draft.my_review_list = payload;
      }),
  },
  initState,
);
