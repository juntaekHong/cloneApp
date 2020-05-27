/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {TextInput} from 'react-native-gesture-handler';

const Search = styled(TextInput)`
  width: 90%;
  padding-horizontal: ${({paddingHorizontal}) =>
    paddingHorizontal
      ? widthPercentageToDP(paddingHorizontal)
      : widthPercentageToDP(10)};
  padding-vertical: ${({paddingVertical}) =>
    paddingVertical
      ? widthPercentageToDP(paddingVertical)
      : widthPercentageToDP(10)};
  font-size: ${widthPercentageToDP(13)};
`;

export const SearchTI = ({
  placeholder,
  innerPaddingHorizontal,
  innerPaddingVertical,
  onChangeText,
  value,
  SearchHandler,
}) => {
  return (
    <Search
      paddingHorizontal={innerPaddingHorizontal}
      paddingVertical={innerPaddingVertical}
      placeholder={
        !placeholder ? '병원명 또는 카테고리명을 입력하세요.' : placeholder
      }
      onChangeText={text => {
        onChangeText(text);
      }}
      value={value}
      returnKeyType={'search'}
      onSubmitEditing={() => {
        SearchHandler();
      }}
    />
  );
};
