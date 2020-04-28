/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  TopView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {ScrollView} from 'react-native';
import {ReviewList} from '../../components/review/FlatList';
import {CustomModal} from '../../components/common/Modal';
import {widthPercentageToDP} from '../../utils/util';
import {NBGText, NBGBText} from '../../components/common/Text';
import {ReviewActions} from '../../store/actionCreator';
import {BottomMenuModal} from '../../components/review/Modal';

const MyReview = props => {
  // 다트 버튼 모달
  const [dotsModal, setDotsModal] = useState(false);
  // 리뷰 수정 완료 모달
  const [reviewCompleteModal, setReviewCompleteModal] = useState(false);
  // 삭제 후, 삭제 알림 모달
  const [reviewDeleteModal, setReviewDeleteModal] = useState(false);
  // 다트 버튼 클릭한 리뷰에 대한 유저 닉네임
  const [reviewUser, setReviewUser] = useState();
  const user = {user: {userNickName: props.user.userNickName}};
  // 댓글 내용 모두 보기 모달
  const [reviewContentModal, setReviewContentModal] = useState(false);

  return (
    <TopContainerView>
      {/* 다트 모달 */}
      <BottomMenuModal
        width={375}
        padding={10}
        visible={dotsModal}
        user={props.user ? props.user : '비회원'}
        reviewUser={user}
        // 수정
        modifyHandler={async () => {
          await setDotsModal(false);
          await props.navigation.navigate('ReviewWrite', {
            modify: true,
            hpid: reviewUser.hpid,
            reviewData: reviewUser,
            reviewCompleteModal: setReviewCompleteModal,
            from: 'myPage',
          });
        }}
        // 삭제
        DeleteHandler={async () => {
          await setDotsModal(false);

          let timeout = setInterval(async () => {
            await setReviewDeleteModal(true);
            clearInterval(timeout);
          }, 500);

          await ReviewActions.deleteReview(reviewUser.reviewIndex);
          await ReviewActions.getAllReview(reviewUser.hpid);

          await ReviewActions.getMyReview();
        }}
        // 취소
        closeHandler={async () => {
          await setDotsModal(false);
        }}
      />
      {/* 리뷰 수정 모달 */}
      <CustomModal
        width={300}
        height={200}
        visible={reviewCompleteModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={17}>리뷰 수정완료</NBGBText>
            <StandardView style={{marginTop: widthPercentageToDP(30)}}>
              <NBGText fontSize={13}>정상적으로 리뷰가 수정되었습니다.</NBGText>
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
                  await setReviewCompleteModal(false);
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
            <NBGBText fontSize={17}>리뷰 삭제 완료</NBGBText>
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
      {/* 리뷰 content 모달 */}
      <CustomModal
        width={300}
        height={400}
        visible={reviewContentModal}
        close={false}
        children={
          <StandardView style={{marginLeft: widthPercentageToDP(20)}}>
            <NBGBText fontSize={17}>리뷰 더 보기</NBGBText>
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
      <TopView
        marginBottom={5}
        title={'리뷰 목록'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        <ReviewList
          scrollEnabled={false}
          data={props.my_review_list}
          count={0}
          user={props.user}
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
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  my_review_list: state.review.my_review_list,
}))(MyReview);
