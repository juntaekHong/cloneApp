/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {TopContainerView, StandardView} from '../../components/common/View';
import {TopView} from '../../components/common/View';
import {ReviewList} from '../../components/review/FlatList';
import {ScrollView} from 'react-native';

const UserReview = props => {
  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'다른 유저 리뷰 모음'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        <ReviewList
          scrollEnabled={false}
          data={props.user_review_list}
          count={props.user_review_total}
          user={props.user}
          dots={false}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
  user_review_total: state.review.user_review_total,
  user_review_list: state.review.user_review_list,
}))(UserReview);
