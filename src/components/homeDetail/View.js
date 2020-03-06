import React, {useCallback, useState, useEffect} from 'react';
import {View, Text, Platform} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import Communications from 'react-native-communications';
import {StartImg, ConnectionImg, FinishImg} from '../home/Image';

// 길찾기 페이지 - 대략적 길 정보 뷰
const Leg = styled(StandardView)`
  margin-left: ${widthPercentageToDP(10)};
  margin-right: ${widthPercentageToDP(10)};
  margin-top: ${widthPercentageToDP(10)};
  margin-bottom: ${widthPercentageToDP(10)};
  align-items: center;
`;

const LegInnerView = styled(StandardView)`
  flex-direction: ${({flexDirection}) =>
    flexDirection ? flexDirection : 'column'};
  margin-left: ${({marginLeft}) =>
    marginLeft ? widthPercentageToDP(marginLeft) : 0};
  margin-right: ${({marginRight}) =>
    marginRight ? widthPercentageToDP(marginRight) : 0};
  align-items: ${({align}) => (align ? align : 'flex-start')};
`;

const LegText = styled(NBGBText)`
  margin-bottom: ${({marginBottom}) =>
    marginBottom ? widthPercentageToDP(marginBottom) : 0};
`;

export const LegView = ({legs}) => {
  return legs !== null ? (
    <Leg>
      <LegText marginBottom={10}>간략 길찾기 정보</LegText>
      <LegInnerView flexDirection={'row'} align={'center'}>
        <LegInnerView align={'center'} marginRight={5}>
          <StartImg
            width={32}
            height={32}
            source={require('../../../assets/image/home/start.png')}
          />
          <LegText fontSize={12}>
            {Platform.OS === 'android'
              ? '오전 ' + legs.start.substring(0, legs.start.length - 2)
              : legs.start}
          </LegText>
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5} align={'center'}>
          <LegText fontSize={10}>{legs.distance + '\n'}</LegText>
          <LegText fontSize={10}>
            {Platform.OS === 'android'
              ? legs.duration.substring(0, legs.start.length - 4) + '분'
              : legs.duration}
          </LegText>
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView marginRight={5}>
          <ConnectionImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/connection.png')}
          />
        </LegInnerView>
        <LegInnerView align={'center'} marginRight={5}>
          <FinishImg
            style={{marginBottom: widthPercentageToDP(2)}}
            width={26}
            height={26}
            source={require('../../../assets/image/home/finish.png')}
          />
          <LegText fontSize={12}>
            {Platform.OS === 'android'
              ? '오후 ' + legs.end.substring(0, legs.end.length - 2)
              : legs.end}
          </LegText>
        </LegInnerView>
      </LegInnerView>
    </Leg>
  ) : null;
};

// 간략정보 출발&도착 주소 뷰
export const AddressView = styled(LegInnerView)``;

// 하위 상세 길찾기 정보 뷰
const DetailList = styled.FlatList`
  flex-grow: 1;
  width: 100%;
  height: 100%;
`;

export const DetailView = ({detail}) => {
  const _renderItem = (item, index) => {
    return (
      <StandardView>
        <NBGBText>{item.travel_mode}</NBGBText>
      </StandardView>
    );
  };

  return (
    <DetailList
      data={detail}
      keyExtractor={(item, index) => index.toString()}
      renderItem={_renderItem}
    />
  );
};
