/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback, useState, useEffect} from 'react';
import {View, Text} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {BackImg, StarImg, MapImg} from '../common/Image';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {
  SelectImg,
  RatingPullImg,
  RatingHalfImg,
  RatingEmptyImg,
  CallImg,
  TaxiImg,
} from './Image';
import Carousel from 'react-native-looped-carousel';
import FastImage from 'react-native-fast-image';
import Communications from 'react-native-communications';

const LocationView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: ${props =>
    props.justifyContent ? props.justifyContent : 'flex-start'};
  width: 100%;
  height: ${props =>
    props.height ? widthPercentageToDP(props.height) : widthPercentageToDP(60)};
`;

// 내 위치 설정(카카오톡 API 사용)
export const TopView = ({
  settingLocation,
  height,
  justifyContent,
  navigation,
}) => {
  return (
    <LocationView height={height} justifyContent={justifyContent}>
      <BTN
        style={{
          marginRight: widthPercentageToDP(5),
        }}
        onPress={() => {
          navigation.navigate('MyLocationSetting');
        }}>
        <NBGBText
          numberOfLines={1}
          align={'center'}
          style={{width: widthPercentageToDP(200)}}
          fontSize={14}>
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

      <StandardView style={{flexDirection: 'row', alignItems: 'center'}}>
        <BTN
          style={{marginRight: widthPercentageToDP(5)}}
          onPress={() => {
            navigation.navigate('MyLocationSetting');
          }}>
          <NBGBText
            numberOfLines={1}
            align={'center'}
            style={{width: widthPercentageToDP(200)}}
            fontSize={14}>
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
  margin-horizontal: ${widthPercentageToDP(10)};
  padding-top: ${widthPercentageToDP(40)};
  margin-bottom: ${widthPercentageToDP(10)};
  border-color: #dbdbdb;
  border-width: ${widthPercentageToDP(2)};
  border-radius: ${widthPercentageToDP(10)};
`;

const RatingView = styled(LocationView)`
  align-items: center;
  margin-vertical: ${widthPercentageToDP(5)};
`;

const BTNView = styled(StandardView)`
  width: 100%;
  height: ${widthPercentageToDP(60)};
  flex-direction: row;
  padding-horizontal: ${widthPercentageToDP(7)};
`;

const CustomBTN = styled(BTN)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(355) / 2};
`;

export const Card = ({
  hospitalName,
  rating,
  reviewCount,
  dutyAddr,
  dutyMapimg,
  // phoneNumber,
  isScrap,
  shared,
  // naviModal,
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
      <NBGBText
        fontSize={20}
        numberOfLines={2}
        align={'center'}
        style={{width: widthPercentageToDP(250)}}>
        {hospitalName}
      </NBGBText>
      <RatingView height={30} justifyContent={'center'}>
        <RatingImg />
        <NBGText fontSize={20}>{rating}</NBGText>
      </RatingView>
      <NBGText fontSize={15} color={'gray'}>
        최근 리뷰 {reviewCount}
      </NBGText>
      <NBGText
        fontSize={13}
        marginTop={7}
        style={{width: widthPercentageToDP(340)}}
        color={'black'}>
        위치: {dutyAddr}
      </NBGText>
      <NBGText
        fontSize={13}
        marginTop={7}
        style={{width: widthPercentageToDP(340)}}
        color={'black'}>
        인근 위치: {dutyMapimg ? dutyMapimg : '정보없음'}
      </NBGText>
      <BTNView>
        {/* <CustomBTN
          onPress={() => {
            Communications.phonecall(phoneNumber.replace(/-/gi, ''), false);
          }}>
          <CallImg style={{justifyContent: 'center'}} />
          <Text style={{justifyContent: 'center'}}>전화예약</Text>
        </CustomBTN> */}
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
        {/* <CustomBTN
          onPress={() => {
            naviModal();
          }}>
          <Text>길찾기</Text>
        </CustomBTN> */}
      </BTNView>
    </CardView>
  );
};

// 하위 하단 고정 버튼 바 뷰
const Bottom = styled(StandardView)`
  flex-direction: row;
  position: absolute;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: transparent;
`;

const BottomBtnView = styled(StandardView)`
  width: ${widthPercentageToDP(375 / 3)};
  margin-bottom: ${widthPercentageToDP(20)};
  justify-content: center;
  align-items: center;
`;

const BottomBTN = styled(BTN)`
  width: ${widthPercentageToDP(60)};
  height: ${widthPercentageToDP(60)};
  justify-content: center;
  align-items: center;
  border-width: ${widthPercentageToDP(2)};
  border-color: #f8f8f8;
  border-radius: ${widthPercentageToDP(30)};
  background-color: white;
`;

export const BottomView = ({phoneNumber, naviModal}) => {
  return (
    <Bottom>
      <BottomBtnView>
        <BottomBTN
          onPress={() => {
            Communications.phonecall(phoneNumber.replace(/-/gi, ''), false);
          }}>
          <CallImg width={17} height={17} />
        </BottomBTN>
      </BottomBtnView>
      <BottomBtnView>
        <BottomBTN onPress={() => {}}>
          <TaxiImg
            width={24}
            height={24}
            source={require('../../../assets/image/home/taxi.png')}
          />
        </BottomBTN>
      </BottomBtnView>
      <BottomBtnView>
        <BottomBTN
          onPress={() => {
            naviModal();
          }}>
          <MapImg
            width={24}
            height={24}
            source={require('../../../assets/image/common/map.png')}
          />
        </BottomBTN>
      </BottomBtnView>
    </Bottom>
  );
};
