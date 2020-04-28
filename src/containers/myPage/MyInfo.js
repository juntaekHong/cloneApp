/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {
  ConstMyInfoView,
  ModifyMyInfoView,
  DivisionView,
} from '../../components/myPage/View';
import {ScrollView} from 'react-native';
import {MyInfoMdal} from '../../components/myPage/Modal';

const MyInfo = props => {
  // 개인정보 변경 모달
  const [MyInfoModal, setMyInfoModal] = useState(false);
  // 모달 타이틀
  const [title, setTitle] = useState('');
  // 개인 정보
  const [MyInfoData, setMyInfoData] = useState();
  // 비밀번호 변경일 경우
  const [changePass, setChangePass] = useState(false);

  return (
    <TopContainerView>
      <MyInfoMdal
        width={300}
        height={300}
        visible={MyInfoModal}
        title={title}
        closeHandler={async () => {
          await setMyInfoModal(false);
          await setMyInfoData();

          changePass ? await setChangePass(false) : null;
        }}
        userData={MyInfoData}
        setUserData={setMyInfoData}
        changePass={changePass}
        changeHandler={async () => {
          await setMyInfoModal(false);
        }}
      />
      <TopView
        marginBottom={5}
        title={'개인정보 수정'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack();
        }}
        closeBtn={false}
        searchBtn={false}
      />
      <ScrollView>
        <ConstMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'이름'}
          arrowImg={false}
          myInfoValue={props.user ? props.user.userName : ''}
        />
        <ConstMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'이메일'}
          arrowImg={false}
          myInfoValue={props.user ? props.user.email : ''}
        />
        <DivisionView borderWidth={3} borderColor={'#F6F7F9'} />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'닉네임'}
          arrowImg={true}
          myInfoValue={props.user ? props.user.userNickName : ''}
          myInfoHandler={async () => {
            await setTitle('닉네임 변경');
            await setMyInfoData(props.user.userNickName);
            await setMyInfoModal(true);
          }}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'전화번호'}
          arrowImg={true}
          myInfoValue={props.user ? props.user.tel : ''}
          myInfoHandler={async () => {
            await setTitle('전화번호 변경');
            await setMyInfoData(props.user.tel);
            await setMyInfoModal(true);
          }}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'비밀번호 변경'}
          arrowImg={true}
          myInfoHandler={async () => {
            await setTitle('비밀번호 변경');
            await setChangePass(true);
            await setMyInfoModal(true);
          }}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
}))(MyInfo);
