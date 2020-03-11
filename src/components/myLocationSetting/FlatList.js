import React, {useCallback, useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {View, Text, FlatList} from 'react-native';
import {StandardView, BTN, ListView} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {ResultCountView} from './View';
import {LocationActions} from '../../store/actionCreator';
import {UIActivityIndicator} from 'react-native-indicators';

const SearchResultList = styled.FlatList`
  flex-grow: 1;
  width 100%;
  height: 100%;
  margin-bottom: ${widthPercentageToDP(10)};
`;

export const SearchResult = ({data, totalCount, searchText, navigation}) => {
  // 검색결과 개수
  const [resultCount, setResultCount] = useState(0);

  // 페이지네이션
  const [loading, setLoading] = useState(false);

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
        padding={15}
        onPress={() => {
          navigation.navigate('LocationSearch', {
            x: parseFloat(item.x),
            y: parseFloat(item.y),
            address: item.address_name,
          });
        }}>
        <NBGBText fontSize={13}>주소: {item.address_name}</NBGBText>
      </ListView>
    );
  };

  const _footerView = () => {
    return loading ? (
      <UIActivityIndicator
        size={20}
        color={'gray'}
        style={{marginVertical: widthPercentageToDP(30)}}
      />
    ) : null;
  };

  return (
    <SearchResultList
      data={data}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={_headerView}
      renderItem={_renderItem}
      onEndReachedThreshold={0.01}
      onEndReached={async () => {
        if (totalCount > resultCount) {
          await setLoading(true);
          await LocationActions.searchAddress(
            searchText,
            data.length / 10 + 1,
            10,
          );
          await setLoading(false);
        }
      }}
      ListFooterComponent={_footerView}
    />
  );
};
