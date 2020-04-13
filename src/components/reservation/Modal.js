/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import styled from 'styled-components/native';
import Modal from 'react-native-modal';
import {widthPercentageToDP} from '../../utils/util';
import colors from '../../configs/colors';
import {NBGText, NBGBText, NBGLText} from '../common/Text';
import FastImage from 'react-native-fast-image';
import {UIActivityIndicator} from 'react-native-indicators';
import {StandardView} from '../common/View';
import {SelectImg} from '../home/Image';
import {ReservationBottomView} from './View';
// import Dialog, {SlideAnimation} from 'react-native-popup-dialog';

export const DivisionView = styled.View`
  margin-top: ${widthPercentageToDP(15)};
  margin-bottom: ${widthPercentageToDP(20)};
  margin-left: ${widthPercentageToDP(20)};
  margin-right: ${widthPercentageToDP(20)};
  height: ${widthPercentageToDP(1)};
  background-color: #dbdbdb;
`;

const CustomModalView = styled.View`
  width: ${({width}) => (width ? widthPercentageToDP(width) : '100%')};
  height: ${({height}) => (height ? widthPercentageToDP(height) : '100%')};
  position: absolute;
  bottom: 0;
  border-radius: ${widthPercentageToDP(15)};
  background-color: ${colors.white};
  align-self: center;
`;

const HeaderView = styled.View`
  width: 100%
  padding-top: ${widthPercentageToDP(40)};
  padding-bottom: ${widthPercentageToDP(14)};
  padding-left: ${widthPercentageToDP(19)};
  padding-right: ${widthPercentageToDP(19)};
`;

const NameView = styled(HeaderView)`
  padding-top: 0;
`;

const ReservationView = styled(NameView)``;

const ReservationItemView = styled(StandardView)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  margin-top: ${widthPercentageToDP(10)};
`;

const ReservationItem = ({itemTitle, reservationData}) => {
  return (
    <ReservationItemView>
      <NBGText marginTop={10} fontSize={15} color={'gray'}>
        {itemTitle}
      </NBGText>
      <NBGBText
        marginTop={10}
        fontSize={15}
        numberOfLines={2}
        align={'right'}
        style={{width: widthPercentageToDP(250)}}>
        {reservationData}
      </NBGBText>
    </ReservationItemView>
  );
};

const FooterView = styled(NameView)``;

export const ReservationModal = ({
  animate = 'fade',
  visible = false,
  width,
  height,
  backHandler,
  reservationHandler,
  hospitalName,
  reservationData,
  userData,
}) => {
  const TodatDateFormat = () => {
    let now = new Date();
    let y = now.getFullYear();
    let m = now.getMonth() + 1;
    let d = now.getDate();
    return '' + y + (m < 10 ? '-0' : '-') + m + (d < 10 ? '-0' : '-') + d;
  };

  return (
    <Modal
      style={{
        margin: 0,
      }}
      animationType={animate}
      isVisible={visible}>
      <CustomModalView width={width} height={height}>
        <HeaderView>
          <NBGBText fontSize={17}>{hospitalName}</NBGBText>
          <StandardView
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginTop: widthPercentageToDP(10),
            }}>
            <NBGText marginRight={10} fontSize={16} marginTop={3}>
              병원 예약서
            </NBGText>
            <SelectImg />
          </StandardView>
          <NBGLText marginTop={10} fontSize={12} color={'gray'}>
            {TodatDateFormat()}
          </NBGLText>
        </HeaderView>
        <DivisionView />
        <NameView>
          <NBGBText marginTop={10} fontSize={15}>
            {userData.userName}
          </NBGBText>
        </NameView>
        <DivisionView />
        <ReservationView>
          <ReservationItem
            itemTitle={'진료실'}
            reservationData={reservationData.office.split('-')[0]}
          />
          <ReservationItem
            itemTitle={'진료항목'}
            reservationData={reservationData.treatmentName}
          />
          <ReservationItem
            itemTitle={'예약날짜'}
            reservationData={reservationData.reservationDate}
          />
          <ReservationItem
            itemTitle={'예약시간'}
            reservationData={reservationData.reservationTime}
          />
        </ReservationView>
        <DivisionView />
        <FooterView style={{flex: 1}}>
          <NBGText marginTop={10} fontSize={13}>
            {
              '*하단의 최종 예약하기 버튼을 누르시면 예약서의\n내용과 같이 예약이 확정됩니다.'
            }
          </NBGText>

          <ReservationBottomView
            positionValue={false}
            flexDirection={'row'}
            marginTop={15}
            paddingVertical={15}
            backTitle={'수정'}
            confirmTitle={'최종 예약하기'}
            backHandler={() => {
              backHandler();
            }}
            reservationDisabled={false}
            reservationHandler={() => {
              reservationHandler();
              backHandler();
            }}
          />
        </FooterView>
      </CustomModalView>
    </Modal>
  );
};
