/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {ListView, ContentDataView, EvaluationView} from './View';
import {PhotoImg, StarImg} from './Image';
import {NBGBText, NBGLText, NBGText} from './Text';
import {widthPercentageToDP} from '../../utils/util';

// 데이터 형식
// const DATA = [
//     {
//       hospitalName: '서울정형외과',
//       image: 'image',
//       rating: 5,
//       reviewCount: 10,
//       location: '서울 강남',
//       time: '5분',
//     },
//  ]

const DataList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

export const List = props => {
  const _renderItem = ({item, index}) => {
    return (
      <ListView
        index={index}
        padding={10}
        onPress={() => {
          props.navigation.navigate('HospitalDetail');
        }}>
        <PhotoImg
          source={require('../../../assets/image/navigation/homeblue.png')}
          width={80}
          height={80}
          radius={25}
        />
        <ContentDataView>
          <NBGBText fontSize={16}>{item.hospitalName}</NBGBText>
          <EvaluationView marginTop={3} marginBottom={3}>
            <StarImg
              source={require('../../../assets/image/home/star-0.png')}
              width={19}
              height={19}
            />
            <NBGBText fontSize={12}>{item.rating}</NBGBText>
            <NBGLText>({item.reviewCount}+)</NBGLText>
          </EvaluationView>
          <NBGText fontSize={13} color={'#b7b7b7'}>
            장소: {item.location}
          </NBGText>
          <NBGText fontSize={13} color={'#b7b7b7'}>
            소요시간: {item.time}
          </NBGText>
        </ContentDataView>
      </ListView>
    );
  };

  return (
    <DataList
      data={props.data}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
    />
  );
};
