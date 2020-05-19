/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {BackImg} from '../common/Image';

export const EmptyEmailCheckImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/sign/note.png')}
    />
  );
};

export const EmailCheckImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/sign/note-2.png')}
    />
  );
};

export const EmptyNickNameCheckImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/sign/business.png')}
    />
  );
};

export const NickNameCheckImg = ({width, height}) => {
  return (
    <BackImg
      width={width}
      height={height}
      source={require('../../../assets/image/sign/business-2.png')}
    />
  );
};
