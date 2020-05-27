/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {SearchTI} from '../search/TextInput';

export const BDSearchTI = ({
  innerPaddingHorizontal,
  innerPaddingVertical,
  onChangeText,
  value,
  searchHandler,
}) => {
  return (
    <SearchTI
      innerPaddingHorizontal={innerPaddingHorizontal}
      innerPaddingVertical={innerPaddingVertical}
      placeholder={'제목 또는 태그명을 입력하세요.'}
      onChangeText={text => {
        onChangeText(text);
      }}
      value={value}
      returnKeyType={'search'}
      SearchHandler={() => {
        searchHandler();
      }}
    />
  );
};
