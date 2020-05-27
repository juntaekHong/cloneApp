/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BDSearchTI} from './TextInput';
import {SearchBorder} from '../search/View';
import {SearchBtn} from '../search/Button';

const BoardSearch = styled(SearchBorder)`
  border-bottom-left-radius: ${({borderRadius}) =>
    borderRadius ? widthPercentageToDP(borderRadius) : widthPercentageToDP(10)};
  border-bottom-right-radius: ${({borderRadius}) =>
    borderRadius ? widthPercentageToDP(borderRadius) : widthPercentageToDP(10)};
`;

export const BoardSearchView = ({
  innerPaddingHorizontal,
  innerPaddingVertical,
  onChangeText,
  value,
  searchHandler,
}) => {
  return (
    <BoardSearch marginHorizontal={30}>
      <BDSearchTI
        innerPaddingHorizontal={innerPaddingHorizontal}
        innerPaddingVertical={innerPaddingVertical}
        onChangeText={text => {
          onChangeText(text);
        }}
        value={value}
        searchHandler={() => {
          searchHandler();
        }}
      />
      <SearchBtn
        SearchHandler={() => {
          searchHandler();
        }}
      />
    </BoardSearch>
  );
};
