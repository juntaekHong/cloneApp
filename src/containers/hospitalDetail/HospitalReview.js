import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, StandardView} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {
  RatingAvgView,
  ReviewCountView,
  EmptyReviewView,
} from '../../components/review/View';
import {ReviewActions} from '../../store/actionCreator';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';
import {ReviewList} from '../../components/review/FlatList';

const HospitalReview = ({hpId, ratingAvg, review_total, review_list}) => {
  return (
    <TopContainerView marginTop={10}>
      {review_list === null ? (
        <UIActivityIndicator color={'gray'} size={widthPercentageToDP(30)} />
      ) : (
        <StandardView>
          {/* 병원 별점(평점) 뷰 */}
          <RatingAvgView
            title={'평균 평점'}
            marginHorizontal={50}
            marginVertical={30}
            paddingVertical={30}
            ratingScore={
              ratingAvg !== null ? parseFloat(ratingAvg).toFixed(2) : 0
            }
          />
          {/* 리뷰 총 개수 뷰 */}
          <ReviewCountView paddingVertical={10} total={review_total} />
          {/* 리뷰 리스트 뷰 */}
          {review_total === 0 ? (
            <EmptyReviewView
              title={'아직 작성된 리뷰가 없습니다!\n먼저 리뷰 작성을 해보세요.'}
            />
          ) : (
            <ReviewList data={review_list} count={review_total} />
          )}
        </StandardView>
      )}
    </TopContainerView>
  );
};

export default connect(state => ({
  review_list: state.review.review_list,
  review_total: state.review.review_total,
}))(HospitalReview);
