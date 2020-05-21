/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView, TopView} from '../../components/common/View';
import {WebView} from 'react-native-webview';

const UserOpinion = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'사용자 의견 보내기'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <WebView
        source={{
          uri:
            'http://ec2-15-164-250-5.ap-northeast-2.compute.amazonaws.com/auth/kakao',
        }}
      />
    </TopContainerView>
  );
};

export default UserOpinion;
