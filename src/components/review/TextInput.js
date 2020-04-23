/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView} from '../common/View';
import {TextInput} from 'react-native';
import fonts from '../../configs/fonts';

const Review = styled(TextInput)`
  padding-horizontal: ${({paddingHorizontal}) =>
    paddingHorizontal ? widthPercentageToDP(paddingHorizontal) : 0};
  min-height: ${widthPercentageToDP(100)};
  max-height: 65%;
  font-family: ${fonts.nanumBarunGothic};
  font-size: ${widthPercentageToDP(13)};
`;

export const ReviewTI = ({}) => {
  return (
    <Review
      textAlignVertical={'top'}
      placeholder={'1000자 이내로 작성해주세요!'}
      placeholderTextColor={'#707070'}
      underlineColorAndroid={'transparent'}
      maxLength={1000}
      scrollEnabled={true}
      autoCapitalize={'none'}
      multiline={true}
      returnKeyType={'next'}
      //   onChangeText={}
      //   value={}
    />
  );
};
