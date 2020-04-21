/* eslint-disable react-native/no-inline-styles */
/* eslint-disable react/react-in-jsx-scope */
import React, {useCallback, useState, useEffect} from 'react';
import {View} from 'react-native';
import styled from 'styled-components/native';
import {StandardView, BTN} from '../common/View';
import {BackImg, StarImg, MapImg} from '../common/Image';
import {NBGBText, NBGText, NBGLText} from '../common/Text';
import {widthPercentageToDP, getData, showMessage} from '../../utils/util';
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
import {HospitalActions} from '../../store/actionCreator';
import Toast from 'react-native-root-toast';

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
  height: ${widthPercentageToDP(60)};
  flex-direction: row;
  padding-horizontal: ${widthPercentageToDP(7)};
`;

const CustomBTN = styled(BTN)`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: ${widthPercentageToDP(355) / 4};
`;

export const Card = ({
  hospitalName,
  rating,
  reviewCount,
  dutyAddr,
  dutyMapimg,
  phoneNumber,
  hospitalId,
  isScrap,
  loginInfo,
  autoLoginModal,
  naviModal,
  taxiModal,
}) => {
  const [myScrap, setMyScrap] = useState(isScrap);
  // 현재 찜(스크랩) 수에서 내 찜에 따라 수 변경

  useEffect(() => {
    setMyScrap(isScrap);
  }, [isScrap]);

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
        fontSize={18}
        numberOfLines={2}
        align={'center'}
        style={{
          width: widthPercentageToDP(250),
          height: widthPercentageToDP(46),
        }}>
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
        numberOfLines={2}
        marginTop={15}
        style={{
          width: widthPercentageToDP(340),
          height: widthPercentageToDP(33),
        }}
        color={'black'}>
        위치: {dutyAddr}
      </NBGText>
      <NBGText
        fontSize={13}
        numberOfLines={2}
        style={{
          width: widthPercentageToDP(340),
          height: widthPercentageToDP(33),
        }}
        color={'black'}>
        인근 위치: {dutyMapimg !== null ? dutyMapimg : '정보없음'}
      </NBGText>
      <BTNView>
        <CustomBTN
          onPress={async () => {
            if (loginInfo === null) {
              await autoLoginModal();
            } else {
              if (loginInfo.token) {
                myScrap ? setMyScrap(false) : setMyScrap(true);
                await HospitalActions.updateHospitalSubscriber(hospitalId);
                await HospitalActions.getAllHospitalSubscribers();
              } else {
                showMessage('이메일 인증 후, 사용할 수 있습니다.', {
                  position: Toast.positions.CENTER,
                });
              }
            }
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
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            Communications.phonecall(phoneNumber.replace(/-/gi, ''), false);
          }}>
          <CallImg width={17} height={17} style={{justifyContent: 'center'}} />
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            taxiModal();
          }}>
          <TaxiImg
            width={21}
            height={21}
            source={require('../../../assets/image/home/taxi.png')}
          />
        </CustomBTN>
        <CustomBTN
          onPress={() => {
            naviModal();
          }}>
          <MapImg
            width={21}
            height={21}
            source={require('../../../assets/image/common/map.png')}
          />
        </CustomBTN>
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
  background-color: transparent;
`;

const BottomBtnView = styled(StandardView)`
  margin-right: ${widthPercentageToDP(25)};
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
  border-color: yellow;
  border-radius: ${widthPercentageToDP(30)};
  background-color: yellow;
`;

export const BottomView = ({reservation}) => {
  return (
    <Bottom>
      <BottomBtnView>
        <BottomBTN
          onPress={() => {
            reservation();
          }}>
          <NBGBText>예약</NBGBText>
        </BottomBTN>
      </BottomBtnView>
    </Bottom>
  );
};
