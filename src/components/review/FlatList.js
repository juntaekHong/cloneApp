/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useState} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {ReviewItemView} from './View';
import {StandardView} from '../common/View';
import {UIActivityIndicator} from 'react-native-indicators';

const Review = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
  min-height: ${({count, imgCount}) =>
    count && imgCount
      ? widthPercentageToDP(imgCount * 400 + (count - imgCount) * 230 + 300)
      : 0};
`;

export const ReviewList = ({data, count}) => {
  const [imgCount, setImgCount] = useState();

  useEffect(() => {
    let imgCount = 0;
    data.map(item => {
      item.img !== null ? (imgCount = imgCount + 1) : null;
    });

    setImgCount(imgCount);
  }, []);

  return (
    <Review
      count={count}
      imgCount={imgCount}
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
      ListFooterComponent={() => {
        return <StandardView style={{marginBottom: widthPercentageToDP(70)}} />;
      }}
    />
  );
};
