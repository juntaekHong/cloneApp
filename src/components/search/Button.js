/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useCallback} from 'react';
import {BTN, StandardView} from '../common/View';
import styled from 'styled-components';
import {widthPercentageToDP} from '../../utils/util';
import {Img} from '../common/Image';
import {NBGLText, NBGBText} from '../common/Text';
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

export const AutoCompelteBtn = ({
  searchText,
  hospitalName,
  hpId,
  onChangeText,
}) => {
  const stringMatch = useCallback(
    hospital => {
      let searchString = [];

      hospital = hospital.split('');

      for (let i = 0; i < hospital.length; i++) {
        if (searchText.indexOf(hospital[i]) !== -1) {
          searchString.push(
            <NBGBText color={'rgb(96, 169, 243)'}>{hospital[i]}</NBGBText>,
          );
        } else {
          searchString.push(<NBGLText>{hospital[i]}</NBGLText>);
        }
      }

      return searchString;
    },
    [searchText],
  );

  return (
    <AutoCompelte>
      {searchText !== hospitalName ? (
        <StandardView
          style={{
            flexDirection: 'row',
            width: widthPercentageToDP(240),
          }}>
          {stringMatch(hospitalName)}
        </StandardView>
      ) : (
        <NBGBText
          style={{width: widthPercentageToDP(240)}}
          color={'rgb(96, 169, 243)'}>
          {hospitalName}
        </NBGBText>
      )}
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
