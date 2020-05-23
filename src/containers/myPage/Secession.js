/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView, TopView} from '../../components/common/View';

const Secession = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'회원탈퇴 페이지'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
      />
    </TopContainerView>
  );
};

export default Secession;
