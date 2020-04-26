/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {BackImg, Img} from '../common/Image';

export const RightarrowImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/myPage/grayarrow.png')}
    />
  );
};

export const MyInfoImg = ({width, height, source}) => {
  return <Img width={width} height={height} source={source} />;
};
