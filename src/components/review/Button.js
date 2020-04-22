/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText, NBGText} from '../common/Text';

const Dots = styled(BTN)``;

export const DotsBtn = ({title}) => {
  return (
    <Dots>
      <NBGLText>{title}</NBGLText>
    </Dots>
  );
};
