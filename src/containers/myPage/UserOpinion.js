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
          uri: 'https://forms.gle/mXNu17ejpZUTr87R8',
        }}
      />
    </TopContainerView>
  );
};

export default UserOpinion;
