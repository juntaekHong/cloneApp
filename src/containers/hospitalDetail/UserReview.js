/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {
  TopContainerView,
  StandardView,
  BTN,
} from '../../components/common/View';
import {TopView} from '../../components/common/View';
import {ReviewList} from '../../components/review/FlatList';
import {ScrollView} from 'react-native';
import {ReviewActions} from '../../store/actionCreator';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';
import {CustomModal} from '../../components/common/Modal';
import {NBGText, NBGBText} from '../../components/common/Text';

const UserReview = props => {
  const [loading, setLoading] = useState(true);

  const [nickName, setNickName] = useState();
  const [userReviewData, setUserReviewData] = useState();

  // 다트 버튼 클릭한 리뷰에 대한 유저 닉네임
  const [reviewUser, setReviewUser] = useState();
  // 댓글 내용 모두 보기 모달
  const [reviewContentModal, setReviewContentModal] = useState(false);

  useEffect(() => {
    if (
      props.navigation.state.params !== null &&
      props.navigation.state.params.userNickName
    ) {
      const promise1 = ReviewActions.getReviewByUserNickName(
        props.navigation.state.params.userNickName,
      );

      Promise.all([promise1]).then(async () => {
        await setNickName(props.navigation.state.params.userNickName);
        await setUserReviewData(props.user_review_list);
      });
    }

    setLoading(false);
  }, [props.navigation]);

  useEffect(() => {
    return async () => {
      await ReviewActions.handleUserReviewListInit();
    };
  }, []);

  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
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
      <TopView
        marginBottom={5}
        title={
          nickName !== undefined
            ? nickName + '님의 리뷰 모음'
            : '리뷰 불러오는 중'
        }
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        {loading === true ? (
          <UIActivityIndicator color={'gray'} size={widthPercentageToDP(40)} />
        ) : (
          <ReviewList
            scrollEnabled={false}
            data={props.user_review_list}
            count={props.user_review_total}
            user={props.user}
            dots={false}
            contentBtn={(bool, reviewData) => {
              setReviewContentModal(bool);
              setReviewUser(reviewData);
            }}
          />
        )}
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  user_review_total: state.review.user_review_total,
  user_review_list: state.review.user_review_list,
}))(UserReview);
