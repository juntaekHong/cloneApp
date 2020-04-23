/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView, StandardView} from '../../components/common/View';
import {TopView} from '../../components/common/View';

const ReviewWrite = props => {
  return (
    <TopContainerView style={{flex: 1, backgroundColor: 'white'}}>
      <TopView
        marginBottom={5}
        title={'리뷰 작성'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
    </TopContainerView>
  );
};

export default ReviewWrite;
