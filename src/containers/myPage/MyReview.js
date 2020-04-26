/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
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

const MyReview = props => {
  // 다트 버튼 클릭한 리뷰에 대한 유저 닉네임
  const [reviewUser, setReviewUser] = useState();
  // 댓글 내용 모두 보기 모달
  const [reviewContentModal, setReviewContentModal] = useState(false);

  return (
    <TopContainerView>
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
          dots={false}
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
