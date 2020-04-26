/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {NBGBText, NBGText} from '../../components/common/Text';
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
import {CustomModal} from '../../components/common/Modal';
import {ScrollView} from 'react-native';

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
  // 삭제 후, 삭제 알림 모달
  const [reviewDeleteModal, setReviewDeleteModal] = useState(false);
  // 댓글 내용 모두 보기 모달
  const [reviewContentModal, setReviewContentModal] = useState(false);

  console.log(reviewUser);

  return (
    <TopContainerView marginTop={10}>
      {/* 리뷰 content 모달 */}
      <CustomModal
        width={300}
        height={400}
        visible={reviewContentModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={17}>
              {reviewUser !== undefined
                ? reviewUser.user.userNickName + '님의 리뷰'
                : '리뷰 더 보기'}
            </NBGBText>
            <ScrollView style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={13}>
                {reviewUser !== undefined ? reviewUser.contents : ''}
              </NBGText>
            </ScrollView>
          </StandardView>
        }
        renderFooter={() => {
          return (
            <StandardView
              style={{
                marginTop: widthPercentageToDP(25),
                flexDirection: 'row',
                justifyContent: 'flex-end',
              }}>
              <BTN
                style={{
                  marginRight: widthPercentageToDP(30),
                  marginBottom: widthPercentageToDP(20),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={async () => {
                  await setReviewContentModal(false);
                }}>
                <NBGText fontSize={15}>닫기</NBGText>
              </BTN>
            </StandardView>
          );
        }}
      />
      {/* 리뷰 삭제 모달 */}
      <CustomModal
        width={300}
        height={200}
        visible={reviewDeleteModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={17}>리뷰 삭제 왼료</NBGBText>
            <StandardView style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={13}>
                정상적으로 해당 리뷰가 삭제되었습니다.
              </NBGText>
            </StandardView>
          </StandardView>
        }
        renderFooter={() => {
          return (
            <StandardView
              style={{flexDirection: 'row', justifyContent: 'flex-end'}}>
              <BTN
                style={{
                  marginRight: widthPercentageToDP(30),
                  marginBottom: widthPercentageToDP(20),
                  justifyContent: 'flex-end',
                  alignItems: 'flex-end',
                }}
                onPress={async () => {
                  await setReviewDeleteModal(false);
                }}>
                <NBGText fontSize={15}>닫기</NBGText>
              </BTN>
            </StandardView>
          );
        }}
      />
      {/* 다트 모달 */}
      <BottomMenuModal
        width={375}
        padding={10}
        visible={dotsModal}
        user={user ? user : '비회원'}
        reviewUser={reviewUser}
        // 수정
        modifyHandler={async () => {
          await setDotsModal(false);
          await navigation.navigate('ReviewWrite', {
            modify: true,
            hpid: hpId,
            reviewData: reviewUser,
            reviewCompleteModal: reviewCompleteModal,
          });
        }}
        // 삭제
        DeleteHandler={async () => {
          await setDotsModal(false);

          await ReviewActions.deleteReview(reviewUser.reviewIndex);
          await ReviewActions.getAllReview(hpId);

          let timeout = setInterval(async () => {
            await setReviewDeleteModal(true);
            clearInterval(timeout);
          }, 500);

          await ReviewActions.getMyReview();
        }}
        // 다른 유저 리뷰
        ReviewHandler={async () => {
          await setDotsModal(false);
          navigation.navigate('UserReview', {
            userNickName: reviewUser.user.userNickName,
          });
        }}
        // 취소
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
              dots={true}
              dotsBtn={(bool, reviewData) => {
                setDotsModal(bool);
                setReviewUser(reviewData);
              }}
              contentBtn={(bool, reviewData) => {
                setReviewContentModal(bool);
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
