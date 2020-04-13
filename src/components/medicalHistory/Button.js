/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BTN} from '../common/View';
import {NBGText, NBGLText, NBGBText} from '../common/Text';

const Cancel = styled(BTN)`
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  padding-top: ${widthPercentageToDP(10)};
  padding-bottom: ${widthPercentageToDP(10)};
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  border-radius: ${widthPercentageToDP(10)};
`;

export const CancelBtn = ({title, onPress}) => {
  return (
    <Cancel
      onPress={() => {
        onPress();
      }}>
      <NBGLText>{title}</NBGLText>
    </Cancel>
  );
};
