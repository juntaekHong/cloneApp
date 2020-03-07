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
  padding-left: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  padding-top: ${widthPercentageToDP(20)};
`;

// 상세 길찾기 정보 헤더 뷰
const ListHeaderView = styled(Leg)``;

// 상세 길찾기 정보 이동수단(도보 or 버스) 단위별 뷰

export const DetailView = ({detail}) => {
  const _headerView = () => {
    return (
      <ListHeaderView>
        <NBGBText>상세 길찾기 정보</NBGBText>
      </ListHeaderView>
    );
  };

  const _renderItem = ({item, index}) => {
    // 다시 파싱
    let items = JSON.parse(item);
    return items.travel_mode === 'WALKING' ? (
      <StandardView>
        <NBGBText>{items.travel_mode}</NBGBText>
        <NBGBText>{items.distance}</NBGBText>
        <NBGBText>{items.duration}</NBGBText>
        <NBGBText>{items.html_instructions}</NBGBText>
      </StandardView>
    ) : (
      <StandardView>
        <NBGBText>{items.travel_mode}</NBGBText>
        {/* 거리, 소요 시간, xx행 */}
        <NBGBText>{items.distance}</NBGBText>
        <NBGBText>{items.duration}</NBGBText>
        <NBGBText>{items.html_instructions}</NBGBText>
        {/* 출발 정류장 이름, 출발 시간 */}
        <NBGBText>{items.departure_stop_name}</NBGBText>
        <NBGBText>{items.departure_time_text}</NBGBText>
        {/* 도착 정류장 이름, 도착 시간 */}
        <NBGBText>{items.arrival_stop_name}</NBGBText>
        <NBGBText>{items.arrival_time_text}</NBGBText>
        {/* 예상 대기시간, 정류장 개수 */}
        <NBGBText>{items.headway}</NBGBText>
        <NBGBText>{items.num_stops}</NBGBText>
        {/* 타야되는 버스명 */}
        <NBGBText>{items.short_name}</NBGBText>
      </StandardView>
    );
  };

  return (
    <DetailList
      scrollEnabled={false}
      data={detail}
      keyExtractor={(item, index) => index.toString()}
      ListHeaderComponent={_headerView}
      renderItem={_renderItem}
    />
  );
};
