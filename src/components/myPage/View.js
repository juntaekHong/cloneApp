/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {LogoutBtn} from './Button';
import {RightarrowImg, MyInfoImg} from './Image';
import {Linking} from 'react-native';

// division
export const DivisionView = styled(StandardView)`
  width: 100%;
  border-width: ${({borderWidth}) =>
    borderWidth ? widthPercentageToDP(borderWidth) : widthPercentageToDP(1)};
  border-color: ${({borderColor}) => (borderColor ? borderColor : '#dbdbdb')};
`;

// 로그인 뷰
const Login = styled(StandardView)``;

export const LoginView = ({user}) => {
  return (
    <Login>
      <LogoutBtn />
    </Login>
  );
};

// 개인 정보 뷰
const MyInfo = styled(BTN)`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-left: ${({paddingLeft}) =>
    paddingLeft ? widthPercentageToDP(paddingLeft) : 0};
  padding-vertical: ${({paddingVertical}) =>
    paddingVertical
      ? widthPercentageToDP(paddingVertical)
      : widthPercentageToDP(20)};
  border-bottom-width: ${({borderWidth}) =>
    borderWidth ? widthPercentageToDP(borderWidth) : widthPercentageToDP(0)};
  border-bottom-color: #dbdbdb;
`;

// 개인정보 뷰
export const MyInfoView = ({
  paddingVertical,
  paddingLeft,
  user,
  myInfoHandler,
}) => {
  return (
    <MyInfo
      disabled={user === null ? true : user.userName ? false : true}
      paddingVertical={paddingVertical}
      paddingLeft={paddingLeft}
      onPress={() => {
        myInfoHandler();
      }}>
      <NBGText
        style={{width: widthPercentageToDP(200)}}
        color={user === null ? 'gray' : user.userName ? 'black' : 'gray'}>
        {user === null
          ? '비회원'
          : user.userName
          ? user.userName
          : user.userNickName
          ? '다양한 기능을 이용하시려면, 개인정보 추가가 필요합니다!'
          : '이메일 인증을 해주세요!'}
      </NBGText>
      <StandardView style={{flexDirection: 'row', alignItems: 'center'}}>
        <NBGText
          color={user === null ? 'gray' : user.userName ? 'black' : 'gray'}>
          개인정보 수정
        </NBGText>
        <RightarrowImg width={40} height={40} />
      </StandardView>
    </MyInfo>
  );
};

// 사용자 정보 뷰
export const MySubView = ({
  paddingVertical,
  paddingLeft,
  borderWidth,
  title,
  imgUrl,
  myInfoHandler,
}) => {
  return (
    <MyInfo
      paddingVertical={paddingVertical}
      paddingLeft={paddingLeft}
      borderWidth={borderWidth}
      onPress={() => {
        myInfoHandler();
      }}>
      <MyInfoImg width={24} height={24} source={imgUrl} />
      <StandardView style={{flexDirection: 'row', alignItems: 'center'}}>
        <NBGText>{title}</NBGText>
        <RightarrowImg width={40} height={40} />
      </StandardView>
    </MyInfo>
  );
};

// 앱 관련 정보 뷰
export const AppSubView = ({
  paddingVertical,
  paddingLeft,
  borderWidth,
  title,
  arrowImg,
  version,
  appInfoHandler,
}) => {
  return (
    <MyInfo
      disabled={!arrowImg}
      paddingVertical={paddingVertical}
      paddingLeft={paddingLeft}
      borderWidth={borderWidth}
      onPress={() => {
        appInfoHandler();
      }}>
      <NBGText>{title}</NBGText>
      {arrowImg ? (
        version ? (
          <StandardView style={{flexDirection: 'row', alignItems: 'center'}}>
            <NBGText>{version}</NBGText>
            <RightarrowImg width={40} height={40} />
          </StandardView>
        ) : (
          <RightarrowImg width={40} height={40} />
        )
      ) : (
        <NBGText color={'gray'} marginRight={20}>
          {version}
        </NBGText>
      )}
    </MyInfo>
  );
};

// 로그인 관련 정보 뷰
export const LoginOutView = ({
  paddingVertical,
  paddingLeft,
  borderWidth,
  title,
  arrowImg,
  user,
  sign,
}) => {
  return (
    <MyInfo
      disabled={true}
      paddingVertical={paddingVertical}
      paddingLeft={paddingLeft}
      borderWidth={borderWidth}>
      {user === null ? (
        <NBGText>{title}</NBGText>
      ) : user.userName === undefined ? (
        user.userNickName !== undefined ? (
          <NBGText>{user.userNickName}</NBGText>
        ) : (
          <BTN
            onPress={() => {
              const emailUrl = user.email.split('@')[1];

              Linking.openURL('https://' + emailUrl).catch(e => {
                console.log(e);
              });
            }}
            style={{
              paddingBottom: widthPercentageToDP(1),
              borderBottomWidth: widthPercentageToDP(1),
              borderColor: '#4E9DF3',
            }}>
            <NBGText color={'#4E9DF3'}>{user.email}</NBGText>
          </BTN>
        )
      ) : (
        <NBGText>{'이메일 인증 완료'}</NBGText>
      )}
      {arrowImg ? sign() : null}
    </MyInfo>
  );
};

// 회원정보 수정 페이지 - 변경안되는 값들
export const ConstMyInfoView = ({
  paddingVertical,
  paddingLeft,
  borderWidth,
  title,
  arrowImg,
  myInfoValue,
  myInfoHandler,
}) => {
  return (
    <AppSubView
      paddingVertical={paddingVertical}
      paddingLeft={paddingLeft}
      borderWidth={borderWidth}
      title={title}
      arrowImg={arrowImg}
      version={myInfoValue}
      appInfoHandler={myInfoHandler}
    />
  );
};

export const ModifyMyInfoView = props => {
  return <ConstMyInfoView {...props} />;
};
