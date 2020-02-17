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
