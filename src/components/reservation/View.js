/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView} from '../common/View';

// 구분선
export const DivisionView = styled(StandardView)`
  border-bottom-width: ${widthPercentageToDP(10)}
  border-bottom-color: #F6F7F9;
  margin-bottom: ${widthPercentageToDP(20)};
`;
