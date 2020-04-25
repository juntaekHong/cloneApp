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
import {NBGBText} from '../common/Text';

const Review = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
  min-height: ${({count, imgCount}) =>
    count && imgCount
      ? widthPercentageToDP(imgCount * 410 + (count - imgCount) * 150 + 400)
      : 0};
`;

export const ReviewList = ({data, count, user, dotsBtn}) => {
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
        return (
          <ReviewItemView
            index={index}
            item={item}
            user={user}
            dotsBtn={(bool, reviewData) => {
              dotsBtn(bool, reviewData);
            }}
          />
        );
      }}
      ListFooterComponent={() => {
        return (
          <StandardView
            style={{
              paddingTop: widthPercentageToDP(30),
              paddingLeft: widthPercentageToDP(15),
              borderTopWidth: widthPercentageToDP(1),
              borderTopColor: '#dbdbdb',
            }}>
            <NBGBText color={'gray'} fontSize={15}>
              * 리뷰가 더 이상 없습니다.
            </NBGBText>
          </StandardView>
        );
      }}
    />
  );
};
