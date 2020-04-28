/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {BTN} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {TextInput} from 'react-native-gesture-handler';

export const MyInfo = styled(TextInput)`
  padding-vertical: ${widthPercentageToDP(10)};
  padding-horizontal: ${widthPercentageToDP(10)};
  margin-horizontal: ${widthPercentageToDP(30)};
  border-width: ${widthPercentageToDP(1)};
  border-radius: ${widthPercentageToDP(15)};
  border-color: #dbdbdb;
`;

export const MyInfoTI = props => {
  return <MyInfo {...props} />;
};
