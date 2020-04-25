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
import {BottomMenuModal} from '../../components/review/Modal';

const HospitalReview = ({
  hpId,
  ratingAvg,
  review_total,
  review_list,
  user,
  navigation,
  reviewCompleteModal,
}) => {
  // 다트 버튼 모달
  const [dotsModal, setDotsModal] = useState(false);
  // 다트 버튼 클릭한 리뷰에 대한 유저 닉네임
  const [reviewUser, setReviewUser] = useState();

  return (
    <TopContainerView marginTop={10}>
      <BottomMenuModal
        width={375}
        padding={10}
        visible={dotsModal}
        user={user}
        reviewUser={reviewUser}
        modifyHandler={async () => {
          await setDotsModal(false);
          await navigation.navigate('ReviewWrite', {
            modify: true,
            hpid: hpId,
            reviewData: reviewUser,
            reviewCompleteModal: reviewCompleteModal,
          });
        }}
        DeleteHandler={async () => {
          await ReviewActions.deleteReview(reviewUser.reviewIndex);
          await ReviewActions.getAllReview(hpId);
          await ReviewActions.getMyReview();
          await setDotsModal(false);
        }}
        ReviewHandler={async () => {
          await setDotsModal(false);
        }}
        closeHandler={async () => {
          await setDotsModal(false);
        }}
      />
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
            <ReviewList
              data={review_list}
              count={review_total}
              user={user}
              dotsBtn={(bool, reviewData) => {
                setDotsModal(bool);
                setReviewUser(reviewData);
              }}
            />
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
