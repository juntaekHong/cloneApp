/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {BackImg, StarImg} from '../common/Image';
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
import Communications from 'react-native-communications';

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
        style={{
          marginRight: widthPercentageToDP(5),
        }}
        onPress={() => {
          navigation.navigate('MyLocationSetting');
        }}>
        <NBGBText
          numberOfLines={1}
          style={{width: widthPercentageToDP(150)}}
          fontSize={19}>
          {settingLocation}
        </NBGBText>
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
          <NBGBText
            numberOfLines={1}
            style={{width: widthPercentageToDP(150)}}
            fontSize={19}>
            {settingLocation}
          </NBGBText>
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
  align-items:center;
  padding-bottom: ${widthPercentageToDP(30)}
  width: ${widthPercentageToDP(355) / 4};
`;

export const Card = ({
  hospitalName,
  rating,
  reviewCount,
  phoneNumber,
  isScrap,
  shared,
  naviModal,
}) => {
  const [myScrap, setMyScrap] = useState(isScrap);
  // 현재 찜(스크랩) 수에서 내 찜에 따라 수 변경
  const [myScrapCount, setMyScrapCount] = useState(myScrap ? 1 : 0);

  useEffect(() => {
    setMyScrapCount(myScrap ? 1 : 0);
  }, [myScrap]);

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
      <NBGText fontSize={15} color={'gray'}>
        최근 리뷰 {reviewCount}
      </NBGText>
      <BTNView>
        <CustomBTN
          onPress={() => {
            Communications.phonecall(phoneNumber.replace(/-/gi, ''), false);
          }}>
          <CallImg />
          <Text>전화주문</Text>
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            // 실제 서버 연동해야 함.
            myScrap ? setMyScrap(false) : setMyScrap(true);
          }}>
          {myScrap ? (
            <StarImg
              style={{marginRight: widthPercentageToDP(5)}}
              width={21}
              height={21}
              source={require('../../../assets/image/home/star-0.png')}
            />
          ) : (
            <RatingEmptyImg />
          )}
          {/* 찜 개수 임시 데이터 넣어둠(5) */}
          <Text>찜 {5 + myScrapCount}</Text>
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            shared();
          }}>
          <Text>공유</Text>
          {/* shared 기능 구현해야 됨*/}
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            naviModal();
          }}>
          <Text>길찾기</Text>
        </CustomBTN>
      </BTNView>
    </CardView>
  );
};
