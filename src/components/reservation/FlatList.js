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
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
  margin-right: ${({marginRight}) =>
    marginRight ? widthPercentageToDP(marginRight) : 0};
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
      marginLeft={20}
      marginRight={20}
      numColumns={3}
      scrollEnabled={false}
      keyExtractor={(item, index) => index.toString()}
      data={data}
      renderItem={({item, index}) => {
        return (
          <ObjectsBtn
            index={index}
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
