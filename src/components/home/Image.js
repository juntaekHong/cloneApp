/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {Img} from '../common/Image';

export const SelectImg = () => {
  return (
    <Img
      width={21}
      height={21}
      source={require('../../../assets/image/home/selection.png')}
    />
  );
};

const RatingImg = props => {
  return (
    <Img
      width={props.width ? props.width : 21}
      height={props.height ? props.height : 21}
      radius={props.borderRadius ? props.borderRadius : 0}
      source={props.source}
    />
  );
};

export const RatingPullImg = () => {
  return (
    <RatingImg source={require('../../../assets/image/home/star-1.png')} />
  );
};

export const RatingHalfImg = () => {
  return (
    <RatingImg source={require('../../../assets/image/home/star-0-5.png')} />
  );
};

export const RatingEmptyImg = () => {
  return (
    <RatingImg source={require('../../../assets/image/home/star-empty.png')} />
  );
};

export const CallImg = props => {
  return (
    <Img
      width={props.width}
      height={props.height}
      radius={props.borderRadius}
      source={require('../../../assets/image/home/phone.png')}
    />
  );
};

export const TaxiImg = props => {
  return (
    <RatingImg
      source={props.source}
      borderRadius={props.borderRadius}
      width={props.width}
      height={props.height}
    />
  );
};

// 하위 길찾기 페이지 이미지
export const StartImg = styled(TaxiImg)``;

export const ConnectionImg = styled(Img)``;

export const FinishImg = styled(Img)``;
