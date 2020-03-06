/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';

export const Img = styled.Image`
  width: ${props =>
    props.width ? widthPercentageToDP(props.width) : widthPercentageToDP(30)};
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(30)};
  border-radius: ${props =>
    props.radius ? widthPercentageToDP(props.radius) : 0};
  background-color: ${props => (props.radius ? 'gray' : 'white')};
  margin-right: ${props =>
    props.marginRight ? widthPercentageToDP(props.marginRight) : 0};
`;

export const BackImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const CloseImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const PhotoImg = ({source, width, height, radius}) => {
  return <Img source={source} width={width} height={height} radius={radius} />;
};

export const StarImg = ({source, width, height}) => {
  return <Img source={source} width={width} height={height} />;
};

export const MapImg = ({source, width, height, borderRadius}) => {
  return (
    <Img source={source} width={width} height={height} radius={borderRadius} />
  );
};
