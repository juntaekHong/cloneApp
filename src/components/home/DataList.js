/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {BTN} from '../common/View';
import {Img} from '../common/Image';
import {NBGBText} from '../common/Text';

export const DataList = props => {
  const _renderItem = ({item, index}) => {
    return (
      <BTN
        style={{
          width: widthPercentageToDP(60),
          height: widthPercentageToDP(80),
          marginTop: widthPercentageToDP(15),
          marginBottom: widthPercentageToDP(15),
          marginLeft: widthPercentageToDP(17),
          marginRight: widthPercentageToDP(17),
        }}
        onPress={async () => {
          // 서버 연동 시에는 여기서 항목 걸러서 페이지 이동하는 방향으로 작업하기.

          props.navigation.navigate('HospitalList', {object: item.title});
        }}>
        <Img
          width={60}
          height={60}
          source={require('../../../assets/image/home/schedule.png')}
        />
        <NBGBText marginTop={7} align={'center'}>
          {item.title}
        </NBGBText>
      </BTN>
    );
  };

  return (
    <FlatList
      numColumns={4}
      style={{
        flexGrow: 1,
        flexDirection: 'row',
        width: '100%',
        height: '100%',
      }}
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
    />
  );
};
