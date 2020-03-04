import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {Img} from '../common/Image';
import {Text} from 'react-native';

const Search = styled(BTN)`
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(40)};
  height: ${widthPercentageToDP(40)};
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
`;

export const SearchBtn = ({marginLeft, onPress}) => {
  return (
    <Search marginLeft={marginLeft} onPress={() => onPress()}>
      <Img
        width={20}
        height={20}
        source={require('../../../assets/image/home/search.png')}
      />
    </Search>
  );
};

const AutoLocationSetting = styled(BTN)`
  justify-content: center;
  align-items: center;
  height: ${widthPercentageToDP(40)};
  margin-top: ${({marginTop}) =>
    marginTop ? widthPercentageToDP(marginTop) : 0};
  margin-right: ${widthPercentageToDP(17)};
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
`;

export const AutoBtn = ({marginTop, title, onPress}) => {
  return (
    <AutoLocationSetting
      marginTop={marginTop}
      onPress={() => {
        onPress();
      }}>
      <NBGLText fontSize={12}>{title}</NBGLText>
    </AutoLocationSetting>
  );
};
