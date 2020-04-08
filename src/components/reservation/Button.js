/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText} from '../common/Text';
import {UpArrowImg, DownArrowImg} from './Image';

// 예약페이지 - 접수하기에서 선택하는 항목들 선택 버튼
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
            {value === undefined ? '진료실 선택' : value}
          </NBGBText>
          {selected ? (
            <UpArrowImg width={16} height={16} />
          ) : (
            <DownArrowImg width={16} height={16} />
          )}
        </StandardView>
      )}
    </Reservation>
  );
};
