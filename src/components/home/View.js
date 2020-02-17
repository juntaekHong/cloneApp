/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {NBGBText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {SelectImg} from './Image';
import Carousel from 'react-native-looped-carousel';
import FastImage from 'react-native-fast-image';

const LocationView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(60)};
`;

export const TopView = ({settingLocation, height}) => {
  return (
    <LocationView height={height}>
      <BTN style={{marginRight: widthPercentageToDP(5)}} onPress={() => {}}>
        <NBGBText fontSize={19}>{settingLocation}</NBGBText>
      </BTN>
      <SelectImg />
    </LocationView>
  );
};

// 홈 광고 배너
export const HomeAd = ({list = []}) => {
  return list.length > 0 ? (
    <Carousel
      delay={4000}
      style={{width: '100%', height: widthPercentageToDP(186)}}
      autoplay
      bullets={true}
      bulletStyle={dotStyle}
      chosenBulletStyle={{...dotStyle, backgroundColor: colors.active}}
      bulletsContainerStyle={{
        position: 'absolute',
        height: widthPercentageToDP(10),
        bottom: 0,
      }}>
      {list.map((item, index) => {
        return (
          <FastImage
            key={index}
            resizeMode={FastImage.resizeMode.stretch}
            style={{
              width: widthPercentageToDP(375),
              height: widthPercentageToDP(170),
            }}
            source={{uri: item.noticeImg}}
          />
        );
      })}
    </Carousel>
  ) : (
    <View style={{width: '100%', height: widthPercentageToDP(186)}} />
  );
};

const dotStyle = {
  backgroundColor: colors.dotInActive,
  width: widthPercentageToDP(4),
  height: widthPercentageToDP(4),
  borderWidth: 0,
  borderRadius: widthPercentageToDP(2),
  marginLeft: widthPercentageToDP(3),
  marginRight: widthPercentageToDP(3),
};
