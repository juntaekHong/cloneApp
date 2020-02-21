/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {Img} from '../common/Image';
import {widthPercentageToDP} from '../../utils/util';

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
  return <Img width={21} height={21} source={props.source} />;
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

export const CallImg = () => {
  return (
    <Img
      style={{marginRight: widthPercentageToDP(5)}}
      width={15}
      height={15}
      source={require('../../../assets/image/home/phone.png')}
    />
  );
};
