/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {FlatList} from 'react-native';
import {BTN} from '../common/View';
import {Img} from '../common/Image';
import {NBGBText} from '../common/Text';

export const DataList = props => {
  const [index, setIndex] = useState(1);

  const _renderItem = ({item, index}) => {
    setIndex(index % 4);
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
        onPress={() => {
          props.navigation.navigate('HospitalList');
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
