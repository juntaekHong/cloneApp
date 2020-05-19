/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {EmailCheckImg, EmptyEmailCheckImg} from './Image';

const CheckDuplicated = styled(BTN)`
  padding-right: ${widthPercentageToDP(10)};
`;

export const CheckDuplicatedBtn = ({email, emailValid, checkHandler}) => {
  return (
    <CheckDuplicated
      onPress={() => {
        checkHandler();
      }}>
      {email.length === 0 || emailValid.length !== 0 ? (
        <EmptyEmailCheckImg width={16} height={16} />
      ) : (
        <EmailCheckImg width={16} height={16} />
      )}
    </CheckDuplicated>
  );
};
