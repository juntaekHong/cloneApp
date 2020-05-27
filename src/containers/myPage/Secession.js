/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import {TopContainerView, TopView} from '../../components/common/View';
import KakaoLogins from '@react-native-seoul/kakao-login';

const Secession = props => {
  // const [provider, setProvider] = useState('app');

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
