/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {ReviewItemView} from './View';
import {StandardView} from '../common/View';

const Review = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
`;

export const ReviewList = ({data}) => {
  return (
    <Review
      scrollEnabled={false}
      data={data}
      keyExtractor={(item, index) => {
        index.toString();
      }}
      ListHeaderComponent={() => {
        return (
          <StandardView
            style={{height: widthPercentageToDP(1), backgroundColor: '#dbdbdb'}}
          />
        );
      }}
      renderItem={({item, index}) => {
        return <ReviewItemView index={index} item={item} />;
      }}
    />
  );
};
