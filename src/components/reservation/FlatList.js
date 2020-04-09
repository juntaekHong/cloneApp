/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {ObjectsBtn} from './Button';

// 예약선택 항목별 리스트
const Objects = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
`;

export const ObjectList = ({data, onPress, selectedValue}) => {
  return (
    <Objects
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item}) => {
        return (
          <ObjectsBtn
            data={item.officeName}
            selectedValue={selectedValue}
            onPress={() => {
              onPress(item.officeName);
            }}
          />
        );
      }}
    />
  );
};
