/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {BTN} from '../common/View';
import styled from 'styled-components';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../common/Image';
import {NBGLText} from '../common/Text';
import {DiagonalImg} from './Image';

const Search = styled(BTN)`
  margin-right: ${widthPercentageToDP(10)};
`;

export const SearchBtn = ({SearchHandler}) => {
  return (
    <Search
      onPress={() => {
        SearchHandler();
      }}>
      <Img
        width={20}
        height={20}
        source={require('../../../assets/image/home/search.png')}
      />
    </Search>
  );
};

// 자동 완성? 추천 검색어? 버튼 뷰?
const AutoCompelte = styled(BTN)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding-horizontal: ${widthPercentageToDP(10)};
  padding-vertical: ${widthPercentageToDP(10)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
`;

export const AutoCompelteBtn = ({hospitalName, hpId, onChangeText}) => {
  return (
    <AutoCompelte>
      <NBGLText>{hospitalName}</NBGLText>
      <BTN
        style={{
          paddingHorizontal: widthPercentageToDP(10),
          paddingVertical: widthPercentageToDP(10),
        }}
        onPress={() => {
          onChangeText(hospitalName);
        }}>
        <DiagonalImg width={16} height={16} />
      </BTN>
    </AutoCompelte>
  );
};
