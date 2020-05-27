/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {BTN} from '../common/View';
import {NBGText} from '../common/Text';
import {FlatList} from 'react-native';

const HashList = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
  height: ${widthPercentageToDP(40)};
  margin-top: ${widthPercentageToDP(10)};
  padding-horizontal: ${widthPercentageToDP(10)};
`;

export const HashListView = ({data}) => {
  return (
    <HashList
      horizontal={true}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item, index}) => {
        return (
          <BTN
            style={{
              justifyContent: 'center',
              paddingHorizontal: widthPercentageToDP(10),
              marginHorizontal: widthPercentageToDP(10),
            }}>
            {/* item.hashtagIndex */}
            <NBGText color={'#0066CC'}>#{item.hashtagName}</NBGText>
          </BTN>
        );
      }}
    />
  );
};
