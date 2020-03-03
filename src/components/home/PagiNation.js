/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {BTN} from '../common/View';
import {NBGBText} from '../common/Text';

const TabView = styled.View`
  margin-top: ${widthPercentageToDP(10)};
  flex-direction: row;
  width: 100%;
`;

export const PagiNationTab = ({index, page1, page2, page3, onPress}) => {
  return (
    <TabView>
      <BTN
        onPress={() => {
          onPress(page1.index);
        }}>
        <NBGBText
          align={'center'}
          fontSize={15}
          color={index === 0 ? '#259ffa' : 'black'}
          style={{width: widthPercentageToDP(375 / 3)}}>
          {page1.title}
        </NBGBText>
      </BTN>
      <BTN
        onPress={() => {
          onPress(page2.index);
        }}>
        <NBGBText
          align={'center'}
          fontSize={15}
          color={index === 1 ? '#259ffa' : 'black'}
          style={{width: widthPercentageToDP(375 / 3)}}>
          {page2.title}
        </NBGBText>
      </BTN>
      <BTN
        onPress={() => {
          onPress(page3.index);
        }}>
        <NBGBText
          align={'center'}
          fontSize={15}
          color={index === 2 ? '#259ffa' : 'black'}
          style={{width: widthPercentageToDP(375 / 3)}}>
          {page3.title}
        </NBGBText>
      </BTN>
    </TabView>
  );
};
