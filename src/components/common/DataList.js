/* eslint-disable react/react-in-jsx-scope */
import React, {useState} from 'react';
import styled from 'styled-components/native';
import {ListView, ContentDataView, EvaluationView} from './View';
import {PhotoImg} from './Image';
import {NBGBText, NBGLText, NBGText} from './Text';
import {widthPercentageToDP, dayToString} from '../../utils/util';
import {CommonActions, ReviewActions} from '../../store/actionCreator';

const DataList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

// 진료시간 포맷 커스텀
const TimeFormat = () => {
  let day = 'dutyTime';
  let index = new Date().getDay();

  if (index !== 0) {
    day = day + index;
  } else {
    day = day + '7';
  }

  return day;
};

export const List = props => {
  const _renderItem = ({item, index}) => {
    const items = item.hospital === undefined ? item : item.hospital;

    return (
      <ListView
        index={index}
        padding={10}
        onPress={async () => {
          await CommonActions.loadingAction(true);
          let object = await CommonActions.getHospital(items.hpid);
          await props.navigation.navigate('HospitalDetail', {object: object});
          await CommonActions.loadingAction(false);
        }}>
        <PhotoImg
          source={require('../../../assets/image/navigation/homeblue.png')}
          width={80}
          height={80}
          radius={25}
        />
        <ContentDataView>
          <NBGBText fontSize={14} numberOfLines={1}>
            {items.dutyName}
          </NBGBText>
          <EvaluationView marginTop={3} marginBottom={3}>
            <NBGBText fontSize={12}>전화번호: {items.dutyTel}</NBGBText>
            <NBGLText>
              {dayToString(new Date().getDay())}:{' '}
              {items[TimeFormat()].indexOf('null') !== -1
                ? '휴진'
                : items[TimeFormat()]}
            </NBGLText>
          </EvaluationView>
          <NBGText
            numberOfLines={1}
            fontSize={13}
            color={'gray'}
            style={{width: widthPercentageToDP(250)}}>
            장소: {items.dutyAddr}
          </NBGText>
          <NBGText fontSize={13} color={'gray'}>
            거리: {item.distance.toFixed(2)}
            km
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
