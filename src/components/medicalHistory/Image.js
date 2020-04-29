/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {BackImg} from '../common/Image';

export const HpImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/reservation/healthcare-and-medical.png')}
    />
  );
};

export const RefreshImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/reservation/reload.png')}
    />
  );
};
