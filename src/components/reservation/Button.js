/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText, NBGText} from '../common/Text';
import {UpArrowImg, DownArrowImg} from './Image';
import {SelectImg, UnSelectImg} from '../home/Image';

// 예약페이지 - 접수하기에서 항목들 선택 버튼
const Reservation = styled(BTN)`
  margin-bottom: ${widthPercentageToDP(20)};
  padding-left: ${({paddingHorizontal}) =>
    paddingHorizontal
      ? widthPercentageToDP(paddingHorizontal)
      : widthPercentageToDP(0)};
  padding-right: ${({paddingHorizontal}) =>
    paddingHorizontal
      ? widthPercentageToDP(paddingHorizontal)
      : widthPercentageToDP(0)};
  padding-bottom: ${({paddingBottom}) =>
    paddingBottom
      ? widthPercentageToDP(paddingBottom)
      : widthPercentageToDP(0)};
`;

// 예약하기 페이지 - 커스텀 버튼
export const ReservationBtn = ({
  paddingHorizontal,
  paddingBottom,
  noClick,
  activeOpacity,
  title,
  necessary,
  value,
  selected,
  onPress,
}) => {
  return (
    <Reservation
      disabled={noClick}
      paddingHorizontal={paddingHorizontal}
      paddingBottom={paddingBottom}
      activeOpacity={activeOpacity}
      onPress={() => {
        onPress();
      }}>
      {necessary ? (
        <StandardView style={{flexDirection: 'row'}}>
          <NBGLText fontSize={14} color={'gray'}>
            {title}
          </NBGLText>
          <NBGLText fontSize={14} color={'red'}>
            [필수]
          </NBGLText>
        </StandardView>
      ) : (
        <NBGLText fontSize={14} color={'gray'}>
          {title}
        </NBGLText>
      )}
      {!necessary ? (
        <NBGBText marginTop={15} fontSize={15}>
          {value}
        </NBGBText>
      ) : (
        <StandardView
          style={{flexDirection: 'row', justifyContent: 'space-between'}}>
          <NBGBText marginTop={15} fontSize={15}>
            {value === undefined ? title + ' 선택' : value}
          </NBGBText>
          {!selected ? (
            <UpArrowImg width={16} height={16} />
          ) : (
            <DownArrowImg width={16} height={16} />
          )}
        </StandardView>
      )}
    </Reservation>
  );
};

// 진료실 선택 버튼
const Offices = styled(BTN)`
  flex-direction: row;
  align-items: center;

  padding-top: ${widthPercentageToDP(15)};
  padding-left: ${widthPercentageToDP(15)};
  padding-bottom: ${widthPercentageToDP(15)};
  border-bottom-width: ${widthPercentageToDP(1)};
  border-bottom-color: #dbdbdb;
`;

export const OfficesBtn = ({data, selectedValue, onPress}) => {
  return (
    <Offices
      onPress={() => {
        onPress();
      }}>
      {data !== selectedValue ? (
        <UnSelectImg />
      ) : (
        <SelectImg marginLeft={1.8} />
      )}
      <NBGText marginLeft={10}>{data}</NBGText>
    </Offices>
  );
};

// 진료항목 선택 버튼
const Objects = styled(BTN)`
  width: ${widthPercentageToDP(300) / 3};
  justify-content: center;
  border-width: ${widthPercentageToDP(1)};
  border-color: #dbdbdb;
  border-radius: ${widthPercentageToDP(15)};
  margin-left: ${widthPercentageToDP(5)};
  margin-right: ${widthPercentageToDP(5)};
  margin-top: ${widthPercentageToDP(5)};
  margin-bottom: ${widthPercentageToDP(5)};
  padding-top: ${widthPercentageToDP(10)};
  padding-bottom: ${widthPercentageToDP(10)};
  padding-right: ${widthPercentageToDP(10)};
  background-color: ${({selectedValue, data}) =>
    selectedValue !== data ? 'white' : '#FCEE69'};
`;

export const ObjectsBtn = ({index, data, selectedValue, onPress}) => {
  return (
    <Objects
      index={index}
      data={data}
      selectedValue={selectedValue}
      onPress={() => {
        onPress();
      }}>
      <NBGText align={'center'} marginLeft={10}>
        {data}
      </NBGText>
    </Objects>
  );
};

// 날짜/시간 선택 버튼
const Dates = styled(Reservation)`
  height: ${({height}) =>
    height ? widthPercentageToDP(height) : widthPercentageToDP(100)};
  justify-content: center;
  margin-left: ${({marginHorizontal}) =>
    marginHorizontal ? widthPercentageToDP(marginHorizontal) : 0};
  margin-right: ${({marginHorizontal}) =>
    marginHorizontal ? widthPercentageToDP(marginHorizontal) : 0};
  border-radius: ${widthPercentageToDP(15)};
  background-color: ${({bgColor}) => (bgColor ? bgColor : 'white')};
`;

export const DateBTN = ({
  height,
  marginHorizontal,
  bgColor,
  disabled,
  onPress,
}) => {
  return (
    <Dates
      height={height}
      marginHorizontal={marginHorizontal}
      bgColor={bgColor}
      disabled={disabled}
      onPress={() => {
        onPress();
      }}>
      <NBGBText fontSize={17} align={'center'}>
        날짜/시간 선택
      </NBGBText>
    </Dates>
  );
};

// 예약하기 페이지 - 이전 버튼
const PRE = styled(Dates)`
  flex: ${({flex}) => (flex ? flex : 1)};
`;

export const PreBtn = ({
  flex,
  height,
  title,
  align,
  bgColor,
  textColor,
  onPress,
  disabled,
}) => {
  return (
    <PRE
      flex={flex}
      disabled={disabled}
      marginHorizontal={10}
      height={height}
      bgColor={bgColor}
      onPress={() => {
        onPress();
      }}>
      <NBGBText align={align} color={textColor}>
        {title}
      </NBGBText>
    </PRE>
  );
};

// 예약하기 페이지 - 예약하기 버튼
export const BottomReservationBtn = props => {
  return <PreBtn {...props} />;
};
