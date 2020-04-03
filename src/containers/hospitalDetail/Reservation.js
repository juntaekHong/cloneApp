/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {TopContainerView, TopView} from '../../components/common/View';

const Reservation = props => {
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
        sharedHandler={() => {}}
      />
    </TopContainerView>
  );
};

export default Reservation;
