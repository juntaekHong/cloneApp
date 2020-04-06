/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';

export const AlertText = styled(NBGBText)`
  margin-left: ${widthPercentageToDP(5)};
  margin-top: ${widthPercentageToDP(5)};
  font-size: ${widthPercentageToDP(10)};
  color: red;
`;
