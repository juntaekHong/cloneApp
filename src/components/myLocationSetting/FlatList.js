import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text} from 'react-native';
import {StandardView, BTN, ListView} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {ResultCountView} from './View';

const SearchResultList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

export const SearchResult = ({data}) => {
  // 검색결과 개수
  const [resultCount, setResultCount] = useState(0);

  // 검색결과 데이터가 있으면 데이터 개수 저장
  useEffect(() => {
    data !== null ? setResultCount(data.length) : null;
  }, [data]);

  const _headerView = () => {
    return <ResultCountView resultCount={resultCount} />;
  };

  const _renderItem = ({item, index}) => {
    return (
      <ListView
        style={{flexDirection: 'column', alignItems: 'flex-start'}}
        padding={15}>
        <Text>{item.nameFull}</Text>
        <Text>{item.juso}</Text>
        <Text>{item.njuso}</Text>
      </ListView>
    );
  };

  return (
    <SearchResultList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={_headerView}
      renderItem={_renderItem}
    />
  );
};
