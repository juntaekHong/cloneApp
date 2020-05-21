/* eslint-disable react-native/no-inline-styles */
import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {WebView} from 'react-native-webview';

import IMP from 'iamport-react-native';
import {UIActivityIndicator} from 'react-native-indicators';
import {widthPercentageToDP} from '../../utils/util';
import {SigninActions} from '../../store/actionCreator';

const data = {
  pg: 'html5_inicis',
  merchant_uid: `mid_${new Date().getTime()}`,
};

const Certification = props => {
  useEffect(() => {
    // SigninActions.getToken();
  }, []);

  //   console.log('186d51959dabd59d07240164beb58f691f21197a');

  function callback(response) {
    console.log('123');
  }

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
      data={data} // 본인인증 데이터
      callback={callback} // 본인인증 종료 후 콜백
    />
    // IMP.Certification(
    //   {
    //     pg: 'html5_inicis',
    //     userCode: 'imp35852204',
    //     merchant_uid: `mid_${new Date().getTime()}`,
    //   },
    //   function(rsp) {
    //     if (rsp.success) {
    //       //본인인증 성공
    //       console.log(rsp);
    //     } else {
    //       //본인인증 실패 혹은 중단(팝업창이 닫히거나 화면내 X버튼/취소버튼 클릭 시)
    //       console.log(rsp);
    //     }
    //   },
    // )
    // </TopContainerView>
  );
};

export default connect(state => ({
  access_token: state.signin.access_token,
}))(Certification);
