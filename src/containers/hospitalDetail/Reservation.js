/* eslint-disable prettier/prettier */
/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {widthPercentageToDP} from '../../utils/util';
import {TopContainerView, TopView, BTN} from '../../components/common/View';
import {NBGBText} from '../../components/common/Text';

const Reservation = (props) => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'예약 페이지'}
        backBtn={true}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeBtn={false}
        searchBtn={false}
        sharedBtn={false}
      />
      <BTN
        style={{
          marginLeft: widthPercentageToDP(20),
          width: widthPercentageToDP(120),
          padding: widthPercentageToDP(5),
          borderWidth: widthPercentageToDP(1),
          borderColor: '#dbdbdb',
          borderRadius: widthPercentageToDP(20),
        }}
        onPress={() => {
          props.navigation.navigate('Calendars');
        }}>
        <NBGBText align={'center'}>날짜/시간 선택</NBGBText>
      </BTN>
    </TopContainerView>
  );
};

export default Reservation;
