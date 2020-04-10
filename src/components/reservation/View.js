/* eslint-disable prettier/prettier */
/* eslint-disable no-fallthrough */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import styled from 'styled-components/native';
import {widthPercentageToDP} from '../../utils/util';
import {StandardView, BTN} from '../common/View';
import {NBGLText, NBGBText} from '../common/Text';
import {CommentTI} from './TextInput';
import {Calendar} from 'react-native-calendars';
import {LeftArrowImg, RightArrowImg} from './Image';
import {PreBtn, BottomReservationBtn} from './Button';
import {OfficeList, ObjectList} from './FlatList';

// 구분선
export const DivisionView = styled(StandardView)`
  border-bottom-width: ${widthPercentageToDP(10)}
  border-bottom-color: #F6F7F9;
  margin-bottom: ${widthPercentageToDP(20)};
`;

// 진료실 선택 리스트 뷰
const SelectList = styled(StandardView)`
  margin-bottom: ${widthPercentageToDP(20)};
`;

export const SelectOfficeListView = ({
  officeIndex,
  data,
  onPress,
  selectedValue,
}) => {
  return (
    <SelectList>
      <OfficeList
        officeIndex={index => {
          officeIndex(index);
        }}
        data={data}
        selectedValue={selectedValue}
        onPress={value => {
          onPress(value);
        }}
      />
    </SelectList>
  );
};

export const SelectObjectListView = ({data, onPress, selectedValue}) => {
  return (
    <SelectList>
      <ObjectList
        data={data}
        selectedValue={selectedValue}
        onPress={value => {
          onPress(value);
        }}
      />
    </SelectList>
  );
};

// 예약 시, 코멘트 뷰
const Comment = styled(StandardView)`
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

export const CommentView = ({paddingHorizontal, onChangeText, value}) => {
  return (
    <Comment paddingHorizontal={paddingHorizontal}>
      <StandardView marginBottom={20} style={{flexDirection: 'row'}}>
        <NBGLText fontSize={14}>원장님께 하고 싶은 말 </NBGLText>
        <NBGLText fontSize={14} color={'gray'}>
          [선택]
        </NBGLText>
      </StandardView>
      <CommentTI
        marginBottom={20}
        placeholder={'ex) 어제부터 열이 나요.'}
        onChangeText={text => {
          onChangeText(text);
        }}
        value={value}
      />
      <NBGLText marginLeft={5}>
        ※ 병원에 도착하시면 데스크에 도착여부를 알려주세요.
      </NBGLText>
      <NBGLText marginTop={5} marginLeft={5}>
        ※ 예약한 시간에 병원 방문 후 데스크에 방문하지 않으면 예약이 취소됩니다.
      </NBGLText>
      {/* <NBGLText marginLeft={5}>
        ※ 병원 사정으로 예약이 취소되는 경우 Push 메시지로 알려드립니다.
      </NBGLText> */}
    </Comment>
  );
};

// 달력 뷰
export const CalendarView = ({onDayPress, markedDate}) => {
  return (
    <StandardView>
      <Calendar
        style={{
          paddingBottom: widthPercentageToDP(10),
          borderBottomWidth: widthPercentageToDP(1),
          borderBottomColor: '#dbdbdb',
        }}
        // 선택 가능한 제일 오래된 날짜
        minDate={new Date()}
        // 최대 선택 가능한 날짜
        maxDate={'2020-05-30'}
        // 날짜 선택 시 이벤트
        onDayPress={day => {
          onDayPress(day);
        }}
        // 날짜 포맷
        monthFormat={'yyyy MM'}
        // 월(달)이 바뀌었을 때
        onMonthChange={month => {
          console.log('month changed', month);
        }}
        // 달력 넘기는 좌우 화살표 보이기 유무
        hideArrows={false}
        // 달력 좌우 이미지
        renderArrow={direction =>
          direction === 'left' ? (
            <LeftArrowImg width={16} height={16} />
          ) : (
            <RightArrowImg width={16} height={16} />
          )
        }
        // Do not show days of other months in month page. Default = false
        hideExtraDays={true}
        //
        disableMonthChange={false}
        // 요일 시작 기준 - 인덱스로 기입
        firstDay={0}
        // 요일 표시 보이기 유무
        hideDayNames={false}
        // 해당 년도의 몇주차인지 표시 보이기 유무
        showWeekNumbers={false}
        // 지난달 달력으로 이동
        onPressArrowLeft={substractMonth => substractMonth(-1)}
        // 다음 달 달력으로 이동
        onPressArrowRight={addMonth => addMonth(1)}
        // 보이기 유무
        disableArrowLeft={false}
        // 보이기 유무
        disableArrowRight={false}
        // 해당 날짜 선택 마크 표시
        markedDates={markedDate}
      />
      <NBGBText color={'red'} marginLeft={5} marginTop={10} fontSize={12}>
        * 시간을 선택하시면 하단에 예약가능 시간대가 노출됩니다.
      </NBGBText>
    </StandardView>
  );
};

// 예약 접수 선택 항목 뷰
const ReservationSelects = styled(StandardView)`
  margin-top: ${({marginTop}) =>
    marginTop ? widthPercentageToDP(marginTop) : 0};
  padding-left: ${({paddingVertical}) =>
    paddingVertical ? widthPercentageToDP(paddingVertical) : 0};
  padding-right: ${({paddingVertical}) =>
    paddingVertical ? widthPercentageToDP(paddingVertical) : 0};
  background-color: ${({backgroundColor}) =>
    backgroundColor ? backgroundColor : 'white'};
`;

export const ReservationSelectView = ({
  marginTop,
  backgroundColor,
  paddingVertical,
  textColor,
  userName,
  selecteObjects,
}) => {
  return (
    <ReservationSelects
      marginTop={marginTop}
      paddingVertical={paddingVertical}
      backgroundColor={backgroundColor}>
      <NBGBText color={textColor}>
        {userName} / {selecteObjects.date} ({selecteObjects.day}) /{' '}
        {selecteObjects.time}
      </NBGBText>
    </ReservationSelects>
  );
};

// 예약하기 페이지(달력있는 페이지) - 이전&예약하기 버튼 뷰
const ReservationBottom = styled(ReservationSelects)`
  flex-direction: ${({flexDirection}) =>
    flexDirection ? flexDirection : 'column'};
  width: 100%;
`;

export const ReservationBottomView = ({
  positionValue,
  flexDirection,
  marginTop,
  paddingVertical,
  backTitle,
  backHandler,
  confirmTitle,
  reservationDisabled,
  reservationHandler,
}) => {
  return (
    <ReservationBottom
      positionValue={positionValue}
      flexDirection={flexDirection}
      marginTop={marginTop}
      paddingVertical={paddingVertical}
      style={positionValue ? {position: 'absolute', bottom: 0} : {}}>
      <PreBtn
        flex={1}
        height={50}
        title={backTitle}
        align={'center'}
        bgColor={'#2D3742'}
        textColor={'white'}
        onPress={() => {
          backHandler();
        }}
      />
      <BottomReservationBtn
        disabled={reservationDisabled}
        flex={2}
        height={50}
        title={confirmTitle}
        align={'center'}
        bgColor={reservationDisabled ? '#dbdbdb' : '#FBEE68'}
        onPress={() => {
          reservationHandler();
        }}
      />
    </ReservationBottom>
  );
};
