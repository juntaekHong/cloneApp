/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, StandardView} from '../../components/common/View';
import {TopView} from '../../components/common/View';
import {ReviewList} from '../../components/review/FlatList';
import {ScrollView} from 'react-native';
import {ReviewActions} from '../../store/actionCreator';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';

const UserReview = props => {
  const [loading, setLoading] = useState(true);

  const [nickName, setNickName] = useState();
  const [userReviewData, setUserReviewData] = useState();

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

  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
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
