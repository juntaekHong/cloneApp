/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {SearchTI} from './TextInput';
import {SearchBtn} from './Button';
import {AutoCompleteList} from './FlatList';

const Search = styled(StandardView)`
  margin-horizontal: ${({marginHorizontal}) =>
    marginHorizontal
      ? widthPercentageToDP(marginHorizontal)
      : widthPercentageToDP(10)};
  margin-bottom: ${widthPercentageToDP(20)};
`;

const SearchBorder = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  border-top-left-radius: ${({borderRadius}) =>
    borderRadius ? widthPercentageToDP(borderRadius) : widthPercentageToDP(10)};
  border-top-right-radius: ${({borderRadius}) =>
    borderRadius ? widthPercentageToDP(borderRadius) : widthPercentageToDP(10)};
  border-bottom-left-radius: ${({borderRadius, value}) =>
    value !== ''
      ? widthPercentageToDP(0)
      : borderRadius
      ? widthPercentageToDP(borderRadius)
      : widthPercentageToDP(10)};
  border-bottom-right-radius: ${({borderRadius, value}) =>
    value !== ''
      ? widthPercentageToDP(0)
      : borderRadius
      ? widthPercentageToDP(borderRadius)
      : widthPercentageToDP(10)};
`;

export const SearchView = ({
  borderRadius,
  marginHorizontal,
  innerPaddingHorizontal,
  innerPaddingVertical,
  onChangeText,
  autoScroll,
  value,
  SearchHandler,
  searchData,
}) => {
  return (
    <Search marginHorizontal={marginHorizontal}>
      <SearchBorder value={value}>
        <SearchTI
          borderRadius={borderRadius}
          innerPaddingHorizontal={innerPaddingHorizontal}
          innerPaddingVertical={innerPaddingVertical}
          onChangeText={text => {
            onChangeText(text);
          }}
          value={value}
          SearchHandler={() => {
            SearchHandler();
          }}
        />
        <SearchBtn
          SearchHandler={() => {
            SearchHandler();
          }}
        />
      </SearchBorder>
      {value === '' ? null : (
        <AutoCompleteList
          data={searchData}
          onChangeText={text => {
            onChangeText(text);
            autoScroll();
          }}
        />
      )}
    </Search>
  );
};
