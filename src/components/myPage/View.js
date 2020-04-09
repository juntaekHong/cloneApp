/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {LogoutBtn} from './Button';

// 로그인 뷰
const Login = styled(StandardView)``;

export const LoginView = ({user}) => {
  return (
    <Login>
      <NBGBText
        style={{
          marginLeft: widthPercentageToDP(30),
          padding: widthPercentageToDP(10),

          marginVertical: widthPercentageToDP(30),
        }}>
        {user !== null ? user.userName : ''}님 안녕하세요~
      </NBGBText>
      <LogoutBtn />
    </Login>
  );
};
