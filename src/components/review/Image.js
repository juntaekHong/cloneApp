/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {BackImg} from '../common/Image';

// 별 이미지
export const PullStarImg = ({size}) => {
  return (
    <BackImg
      width={size}
      height={size}
      source={require('../../../assets/image/review/star-1.png')}
    />
  );
};

export const HalfMoreStarImg = ({size}) => {
  return (
    <BackImg
      width={size}
      height={size}
      source={require('../../../assets/image/review/star-0-75.png')}
    />
  );
};

export const HalfStarImg = ({size}) => {
  return (
    <BackImg
      width={size}
      height={size}
      source={require('../../../assets/image/review/star-0-5.png')}
    />
  );
};

export const HalfBelowStarImg = ({size}) => {
  return (
    <BackImg
      width={size}
      height={size}
      source={require('../../../assets/image/review/star-0-25.png')}
    />
  );
};

export const EmptyStarImg = ({size}) => {
  return (
    <BackImg
      width={size}
      height={size}
      source={require('../../../assets/image/review/star-0.png')}
    />
  );
};

export const ReviewImg = ({width, height, source}) => {
  return <BackImg width={width} height={height} source={source} />;
};

export const DotsImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/review/menu.png')}
    />
  );
};
