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
        ) : (
          <EmptyNickNameCheckImg width={16} height={16} />
        )
      ) : type === 'email' ? (
        <EmailCheckImg width={16} height={16} />
      ) : (
        <NickNameCheckImg width={16} height={16} />
      )}
    </CheckDuplicated>
  );
};
