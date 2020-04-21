/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP, dayToString} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGText, NBGLText, NBGBText} from '../common/Text';
import {HpImg, RefreshImg} from './Image';
import {DivisionView, ReservationItem} from '../reservation/Modal';
import {ReservationBottomView} from '../reservation/View';
import {CancelBtn} from './Button';
import Communications from 'react-native-communications';
import {ReservationActions, CommonActions} from '../../store/actionCreator';

// "rows": [
//     {
//       "reservationIndex": 4,
//       "userIndex": 3,
//       "hpid": "A1100008",
//       "officeIndex": 16,
//       "treatmentIndex": 3,
//       "treatmentName": "호흡기질환",
//       "reservationDate": "2020-04-15",
//       "reservationTime": "11:30:00",
//       "comment": null,
//       "status": "ACCEPTED",
//       "createdAt": "2020-04-08T11:25:43.000Z",
//       "updatedAt": "2020-04-08T11:25:43.000Z",
//       "hospital": {
//         "dutyName": "(학)고려대학교의과대학부속병원(안암병원)"
//       },
//       "hospitalOffice": {
//         "officeName": "박철수 선생님 - 이비인후과"
//       },
//       "user": {
//         "userName": "이해찬",
//         "age": 21,
//         "tel": null,
//         "email": "haechan@sm.com"
//       }
//     }
//   ]

const Reservation = styled(StandardView)`
  margin-top: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-bottom: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-left: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  margin-right: ${({margin}) => (margin ? widthPercentageToDP(margin) : 0)};
  padding-top: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  padding-bottom: ${({padding}) =>
    padding ? widthPercentageToDP(padding) : 0};
  padding-left: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  padding-right: ${({padding}) => (padding ? widthPercentageToDP(padding) : 0)};
  border-radius: ${widthPercentageToDP(10)};
  background-color: white;
`;

const HeaderView = styled(Reservation)`
  flex-direction: row;
  justify-content: ${({justifyContent}) =>
    justifyContent ? justifyContent : 'flex-start'};
`;

const TitleView = styled(HeaderView)`
  align-items: ${({alignItems}) => (alignItems ? alignItems : 'flex-start')};
`;

const FooterView = styled(TitleView)``;

// 접수중(예약내역)
export const ReservationHistoryItem = ({item, navigation}) => {
  const ReservationState = status => {
    let currentStatus;

    switch (true) {
      case status === 'PENDING':
        currentStatus = '접수중';
        break;
      case status === 'CANCELED':
        currentStatus = '접수 취소';
        break;
      case status === 'ACCEPTED':
        currentStatus = '접수 완료';
        break;
      case status === 'REFUSED':
        currentStatus = '접수 거절';
        break;
      case status === 'TIMEOUT':
        currentStatus = '접수 만료';
        break;
    }

    return currentStatus;
  };

  return (
    <Reservation margin={10} padding={30}>
      {item.status === 'PENDING' ? (
        <HeaderView justifyContent={'space-between'}>
          <TitleView alignItems={'center'}>
            <HpImg width={24} height={24} />
            <NBGBText fontSize={15} marginLeft={10}>
              {item.user.userName}님 접수현황
            </NBGBText>
          </TitleView>
          <BTN
            onPress={async () => {
              await ReservationActions.loadReservation(item.reservationIndex);
            }}>
            <RefreshImg width={24} height={24} />
          </BTN>
        </HeaderView>
      ) : (
        <HeaderView justifyContent={'center'}>
          <TitleView alignItems={'center'}>
            <NBGBText fontSize={18}>{item.user.userName}님 진료내역</NBGBText>
          </TitleView>
        </HeaderView>
      )}
      <StandardView>
        <NBGBText marginTop={20} align={'center'} fontSize={30}>
          {ReservationState(item.status)}
        </NBGBText>
      </StandardView>
      <DivisionView marginBottom={-5} />
      <ReservationItem
        align={'left'}
        fontSize={13}
        itemTitle={'접수일'}
        reservationData={
          item.reservationDate +
          ' (' +
          dayToString(new Date(item.reservationDate).getDay()) +
          ') / ' +
          item.reservationTime
        }
      />
      <ReservationItem
        align={'left'}
        fontSize={13}
        itemTitle={'병원명'}
        reservationData={item.hospital.dutyName}
      />
      <ReservationItem
        align={'left'}
        fontSize={13}
        itemTitle={'진료실'}
        reservationData={item.hospitalOffice.officeName}
      />
      {item.status === 'PENDING' ? (
        <StandardView>
          <DivisionView />
          <FooterView justifyContent={'space-between'} alignItems={'center'}>
            <NBGText fontSize={13} color={'gray'}>
              병원 내원 전
            </NBGText>
            <CancelBtn
              title={'접수 취소'}
              onPress={async () => {
                await ReservationActions.cancelReservation(
                  item.reservationIndex,
                );
                await ReservationActions.getReservation();
                // 현재 의미없음. 예약 취소 시, 아예 삭제되어 진료내역에 데이터가 들어가지 않기 때문에
                await ReservationActions.getReservationLog();
              }}
            />
          </FooterView>
          <DivisionView />
          <NBGLText fontSize={12}>
            {
              '접수 신청이 증가하여 접수 가능 여부를 확인 중입니다.\n접수 상태 변경을 확인하시려면, 새로고침 버튼을 클릭하여 주세요!'
            }
          </NBGLText>
        </StandardView>
      ) : item.status !== 'ACCEPTED' ? (
        <StandardView>
          <DivisionView />
          <FooterView justifyContent={'flex-end'} alignItems={'center'}>
            <CancelBtn
              title={'진료내역 삭제'}
              onPress={async () => {
                await ReservationActions.deleteReservation(
                  item.reservationIndex,
                );
                // 현재 의미없음. 예약 취소 시, 아예 삭제되어 진료내역에 데이터가 들어가지 않기 때문에
                await ReservationActions.getReservationLog();
              }}
            />
          </FooterView>
          <DivisionView marginBottom={-15} />
          <ReservationBottomView
            positionValue={false}
            flexDirection={'row'}
            marginTop={30}
            backTitle={'전화'}
            confirmTitle={'재접수 하기'}
            backHandler={async () => {
              await Communications.phonecall(
                item.hospital.dutyTel.replace(/-/gi, ''),
                false,
              );
            }}
            reservationDisabled={false}
            reservationHandler={async () => {
              const detailData = await CommonActions.getHospital(item.hpid);

              await CommonActions.handleTimeInfo({
                hospitalName: detailData.dutyName,
                dutyTime1: detailData.dutyTime1,
                dutyTime2: detailData.dutyTime2,
                dutyTime3: detailData.dutyTime3,
                dutyTime4: detailData.dutyTime4,
                dutyTime5: detailData.dutyTime5,
                dutyTime6: detailData.dutyTime6,
                dutyTime7: detailData.dutyTime7,
                dutyTime8: detailData.dutyTime8,
                office: detailData.office,
              });

              navigation.navigate('Reservation');
            }}
          />
        </StandardView>
      ) : null}
    </Reservation>
  );
};
