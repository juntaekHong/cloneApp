/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {connect} from 'react-redux';
import {TopContainerView, TopView} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';
import {
  ConstMyInfoView,
  ModifyMyInfoView,
  DivisionView,
} from '../../components/myPage/View';
import {ScrollView} from 'react-native';

const MyInfo = props => {
  return (
    <TopContainerView>
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
          myInfoHandler={() => {}}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'전화번호'}
          arrowImg={true}
          myInfoValue={props.user ? props.user.tel : ''}
          myInfoHandler={() => {}}
        />
        <ModifyMyInfoView
          paddingVertical={20}
          paddingLeft={20}
          borderWidth={1}
          title={'비밀번호 변경'}
          arrowImg={true}
          myInfoHandler={() => {}}
        />
      </ScrollView>
    </TopContainerView>
  );
};

export default connect(state => ({
  user: state.signin.user,
}))(MyInfo);
