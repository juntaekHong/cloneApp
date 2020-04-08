/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BackImg} from '../common/Image';

export const UpArrowImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/reservation/up-arrow.png')}
    />
  );
};

export const DownArrowImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/reservation/down-arrow.png')}
    />
  );
};
