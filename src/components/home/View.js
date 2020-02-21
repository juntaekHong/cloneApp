/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {BackImg} from '../common/Image';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {
  SelectImg,
  RatingPullImg,
  RatingHalfImg,
  RatingEmptyImg,
  CallImg,
} from './Image';
import Carousel from 'react-native-looped-carousel';
import FastImage from 'react-native-fast-image';
// import call from "react-native-communications";

const LocationView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: ${props => (props.justifyContent ? 'flex-start' : 'center')};
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(60)};
`;

// 내 위치 설정(카카오톡 API 사용)
export const TopView = ({settingLocation, height, navigation}) => {
  return (
    <LocationView height={height}>
      <BTN
        style={{marginRight: widthPercentageToDP(5)}}
        onPress={() => {
          navigation.navigate('MyLocationSetting');
        }}>
        <NBGBText fontSize={19}>{settingLocation}</NBGBText>
      </BTN>
      <SelectImg />
    </LocationView>
  );
};

export const CustomTopView = ({
  settingLocation,
  height,
  navigation,
  justifyContent,
}) => {
  return (
    <LocationView height={height} justifyContent={justifyContent}>
      <BTN
        onPress={() => {
          navigation.goBack(null);
        }}
        style={{
          marginLeft: widthPercentageToDP(10),
          marginRight: widthPercentageToDP(50),
        }}>
        <BackImg
          width={28}
          height={28}
          source={require('../../../assets/image/common/back.png')}
        />
      </BTN>

      <StandardView style={{flexDirection: 'row'}}>
        <BTN
          style={{marginRight: widthPercentageToDP(5)}}
          onPress={() => {
            navigation.navigate('MyLocationSetting');
          }}>
          <NBGBText fontSize={19}>{settingLocation}</NBGBText>
        </BTN>
        <SelectImg />
      </StandardView>
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

// 병원 상세페이지 카드형식 뷰 (임시 뷰)
const CardView = styled(StandardView)`
  align-items: center;
  height: ${widthPercentageToDP(250)};
  margin-horizontal: ${widthPercentageToDP(10)};
  padding-top: ${widthPercentageToDP(40)};
  border-radius: ${widthPercentageToDP(10)};
  background-color: red;
`;

const RatingView = styled(LocationView)`
  align-items: center;
  margin-vertical: ${widthPercentageToDP(5)};
`;

const BTNView = styled(StandardView)`
  width: 100%;
  height: 100%;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding-horizontal: ${widthPercentageToDP(15)};
`;

const CustomBTN = styled(BTN)`
  flex-direction: row;
  justify-content: center;
  padding-bottom: ${widthPercentageToDP(30)}
  width: ${widthPercentageToDP(355) / 3};
`;

export const Card = ({
  hospitalName,
  rating,
  reviewCount,
  phoneNumber,
  isScrap,
  shared,
}) => {
  const RatingImg = useCallback(() => {
    let ratingData = [];

    for (let i = 0; i < parseInt(rating); i++) {
      ratingData.push(<RatingPullImg />);
    }

    if (rating % 1 !== 0) {
      ratingData.push(<RatingHalfImg />);
    }

    for (let i = ratingData.length; i < 5; i++) {
      ratingData.push(<RatingEmptyImg />);
    }

    return (
      <StandardView
        style={{flexDirection: 'row', marginRight: widthPercentageToDP(10)}}>
        {ratingData}
      </StandardView>
    );
  }, [rating]);

  return (
    <CardView>
      <NBGBText fontSize={30}>{hospitalName}</NBGBText>
      <RatingView height={30}>
        <RatingImg />
        <NBGText fontSize={20}>{rating}</NBGText>
      </RatingView>
      <NBGText fontSize={15} color={'#dbdbdb'}>
        최근 리뷰 {reviewCount}
      </NBGText>
      <BTNView>
        <CustomBTN onPress={() => {}}>
          <CallImg />
          <Text>전화주문</Text>
        </CustomBTN>
        <CustomBTN>
          <Text>찜 {isScrap}</Text>
          {/* 찜 하기 */}
        </CustomBTN>
        <CustomBTN>
          <Text>공유</Text>
          {/* shared */}
        </CustomBTN>
      </BTNView>
    </CardView>
  );
};
