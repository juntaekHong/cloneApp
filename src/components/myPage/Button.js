/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BTN} from '../common/View';
import {NBGText} from '../common/Text';
import {removeData} from '../../utils/util';
import {
  SigninActions,
  ReservationActions,
  HospitalActions,
  ReviewActions,
} from '../../store/actionCreator';
import {RightarrowImg} from './Image';

// 로그인 버튼
export const LoginBtn = ({loginModal}) => {
  return (
    <BTN
      onPress={() => {
        loginModal();
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <NBGText>로그인 및 회원가입</NBGText>
      <RightarrowImg width={40} height={40} />
    </BTN>
  );
};

// 로그아웃 버튼
export const LogoutBtn = props => {
  return (
    <BTN
      onPress={async () => {
        await removeData('token');
        await removeData('email');
        await removeData('user_name');
        await removeData('user_userNickName');
        await removeData('tel');

        // await setUserData(null);
        // 진료내역 페이지 및 즐겨찾는 병원 데이터 정보 초기화.
        await ReservationActions.handleReservationListInit();
        await HospitalActions.handlerSubscriberListInit();
        await ReviewActions.handleReviewListInit();
        await SigninActions.handleLoginData(null);
      }}
      style={{
        flexDirection: 'row',
        alignItems: 'center',
      }}>
      <NBGText>로그아웃</NBGText>
      <RightarrowImg width={40} height={40} />
    </BTN>
  );
};
