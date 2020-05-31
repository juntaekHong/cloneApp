/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {
  EmailCheckImg,
  EmptyEmailCheckImg,
  NickNameCheckImg,
  EmptyNickNameCheckImg,
  SMSImg,
  SMSCertificationImg,
} from './Image';

const CheckDuplicated = styled(BTN)`
  padding-right: ${widthPercentageToDP(10)};
`;

export const CheckDuplicatedBtn = ({type, data, dataValid, checkHandler}) => {
  return (
    <CheckDuplicated
      onPress={() => {
        checkHandler();
      }}>
      {data.length === 0 || dataValid.length !== 0 ? (
        type === 'email' ? (
          <EmptyEmailCheckImg width={16} height={16} />
        ) : type === 'nickName' ? (
          <EmptyNickNameCheckImg width={16} height={16} />
        ) : type === 'SMS' ? (
          <SMSImg width={24} height={24} />
        ) : (
          <SMSCertificationImg width={24} height={24} />
        )
      ) : type === 'email' ? (
        <EmailCheckImg width={16} height={16} />
      ) : type === 'nickName' ? (
        <NickNameCheckImg width={16} height={16} />
      ) : type === 'SMS' ? (
        <SMSImg width={24} height={24} />
      ) : (
        <SMSCertificationImg width={24} height={24} />
      )}
    </CheckDuplicated>
  );
};
