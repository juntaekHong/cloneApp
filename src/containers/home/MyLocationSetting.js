/* eslint-disable react-native/no-inline-styles */
import React, {useEffect, useRef, useState} from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {TopContainerView, TopView} from '../../components/common/View';
import {widthPercentageToDP} from '../../utils/util';

const MyLocationSetting = props => {
  return (
    <TopContainerView>
      <TopView
        marginBottom={5}
        title={'위치 설정 페이지'}
        backHandler={() => {
          props.navigation.goBack(null);
        }}
        closeHandler={() => {
          props.navigation.goBack(null);
        }}
      />
      <Text>위치 설정 페이지</Text>
    </TopContainerView>
  );
};

export default MyLocationSetting;
