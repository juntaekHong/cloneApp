/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {SelectImg} from './Image';

const LocationView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(60)};
`;

export const TopView = ({settingLocation, height}) => {
  return (
    <LocationView height={height}>
      <BTN style={{marginRight: widthPercentageToDP(5)}} onPress={() => {}}>
        <NBGBText fontSize={19}>{settingLocation}</NBGBText>
      </BTN>
      <SelectImg />
    </LocationView>
  );
};
