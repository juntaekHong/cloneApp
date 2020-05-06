/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {BackImg} from '../common/Image';

export const DiagonalImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/search/diagonal-arrow.png')}
    />
  );
};
