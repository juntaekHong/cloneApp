/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {WebView} from 'react-native-webview';

import IMP from 'iamport-react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';
import {SigninActions} from '../../store/actionCreator';

const Certification = props => {
  useEffect(() => {
    // SigninActions.getToken();
  }, []);

  console.log('186d51959dabd59d07240164beb58f691f21197a');

  const data = {
    app_scheme: 'TeamFour',
    merchant_uid: `mid_${new Date().getTime()}`,
    company: '뽀듬',
    carrier: 'KT',
    name: '홍준택',
    phone: '01034899742',
    min_age: '19',
  };

  return (
    // <TopContainerView>
    //   <TopView
    //     marginBottom={5}
    //     title={'핸드폰 인증'}
    //     backBtn={true}
    //     backHandler={() => {
    //       props.navigation.goBack();
    //     }}
    //     closeBtn={false}
    //     searchBtn={false}
    //   />
    <IMP.Certification
      userCode={'imp35852204'} // 가맹점 식별코드
      loading={
        <UIActivityIndicator color={'gray'} size={widthPercentageToDP(30)} />
      } // 웹뷰 로딩 컴포넌트
      data={data} // 본인인증 데이터
      callback={response => {
        console.log(response);
      }} // 본인인증 종료 후 콜백
    />
    // </TopContainerView>
  );
};

export default connect(state => ({
  access_token: state.signin.access_token,
}))(Certification);
