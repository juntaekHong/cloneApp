/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BTN} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP, removeData} from '../../utils/util';
import {
  SigninActions,
  ReservationActions,
  HospitalActions,
} from '../../store/actionCreator';

// 로그인 버튼
export const LoginBtn = ({loginModal}) => {
  return (
    <BTN
      onPress={() => {
        loginModal();
      }}
      style={{
        width: widthPercentageToDP(200),
        marginLeft: widthPercentageToDP(30),
        padding: widthPercentageToDP(10),
        borderWidth: widthPercentageToDP(1),
        borderColor: '#dbdbdb',
        borderRadius: widthPercentageToDP(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: widthPercentageToDP(30),
      }}>
      <NBGBText>로그인 및 회원가입</NBGBText>
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

        // await setUserData(null);
        // 진료내역 페이지 및 즐겨찾는 병원 데이터 정보 초기화.
        await ReservationActions.handleReservationListInit();
        await HospitalActions.handlerSubscriberListInit();
        await SigninActions.handleLoginData(null);
      }}
      style={{
        width: widthPercentageToDP(200),
        marginLeft: widthPercentageToDP(30),
        padding: widthPercentageToDP(10),
        borderWidth: widthPercentageToDP(1),
        borderColor: '#dbdbdb',
        borderRadius: widthPercentageToDP(15),
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: widthPercentageToDP(30),
      }}>
      <NBGBText>로그아웃</NBGBText>
    </BTN>
  );
};
