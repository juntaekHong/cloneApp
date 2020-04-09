/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {OfficesBtn, ObjectsBtn} from './Button';

const Objects = styled(FlatList)`
  flex-grow: 1;
  width: 100%;
`;

// 진료실 선택 리스트
export const OfficeList = ({data, onPress, selectedValue}) => {
  return (
    <Objects
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item}) => {
        return (
          <OfficesBtn
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

// 진료항목 선택 리스트
export const ObjectList = ({data, onPress, selectedValue}) => {
  return (
    <Objects
      scrollEnabled={false}
      numColumns={3}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item}) => {
        return (
          <ObjectsBtn
            data={item.treatment}
            selectedValue={selectedValue}
            onPress={() => {
              onPress(item.treatment);
            }}
          />
        );
      }}
    />
  );
};
