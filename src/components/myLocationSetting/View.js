import React from 'react';
import styled from 'styled-components/native';
import {Keyboard} from 'react-native';
import {StandardView} from '../common/View';
import {NBGBText, NBGText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import {SearchInput} from './Input';
import {AutoBtn} from './Button';

// 하위 검색창 뷰
const Search = styled(StandardView)`
  margin-horizontal: ${widthPercentageToDP(14)};
`;

export const SearchView = ({marginTop, search, autoOnpress}) => {
  return (
    <Search>
      <NBGBText fontSize={18}>지번, 도로명을 입력하세요</NBGBText>
      <SearchInput marginTop={marginTop} fontSize={13} search={search} />
      <AutoBtn
        marginTop={10}
        title={'현 위치로 주소 설정'}
        onPress={async () => {
          Keyboard.dismiss();
          await autoOnpress();
        }}
      />
    </Search>
  );
};

// 검색결과 개수 뷰
const ResultCount = styled(StandardView)`
  justify-content: center;
  height: ${widthPercentageToDP(30)};
  background-color: #f8f8f8;
  margin-top: ${widthPercentageToDP(20)};
  padding-left: ${widthPercentageToDP(15)};
`;

export const ResultCountView = ({resultCount}) => {
  return (
    <ResultCount>
      <NBGText fontSize={12}>검색결과 ({resultCount})</NBGText>
    </ResultCount>
  );
};

// 위치 설정 확인 페이지(지도뷰있는 것) 뷰
