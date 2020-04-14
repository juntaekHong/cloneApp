/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {ReservationHistoryItem} from './View';

const ReservationHistory = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
  margin-right: ${({marginRight}) =>
    marginRight ? widthPercentageToDP(marginRight) : 0};
`;

// 진료내역 페이지 - 리스트 뷰
export const HistoryList = ({data, navigation}) => {
  return (
    <ReservationHistory
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item}) => {
        return <ReservationHistoryItem item={item} navigation={navigation} />;
      }}
    />
  );
};
